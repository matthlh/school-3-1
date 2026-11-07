"""Planner regression fixtures. No live Things3, calendar, ledger or plan-state access.

Run: python3 -B -m unittest discover -s tests -p 'test_planner.py' -v
"""
import datetime as dt
import importlib.util
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


SCRIPT = Path(__file__).resolve().parents[1] / ".claude/skills/morning-check/scripts/things_plan.py"
# The private habit file is loaded at import time: point the import at an empty fixture workspace.
with tempfile.TemporaryDirectory() as fixture_root, patch.dict(os.environ, {"SCHOOL_ROOT": fixture_root}):
    spec = importlib.util.spec_from_file_location("planner_fixture", SCRIPT)
    planner = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(planner)


DAY = dt.date(2026, 11, 6)


def todo(name, area="UBC", estimate="1h", priority="P1", due=None, when=DAY, project=""):
    return planner.Todo(name, name, project, area, when.isoformat() if when else "",
                        due.isoformat() if due else "", f"{estimate}, {priority}", "Anytime")


class PlannerTests(unittest.TestCase):
    def setUp(self):
        for mock in (patch.object(planner, "osa", side_effect=AssertionError("No live Things3 calls")),
                     patch.object(planner.things_add, "add_todo", side_effect=AssertionError("No live to-do creation")),
                     patch.object(planner.term, "key_dates", return_value=[])):
            mock.start()
            self.addCleanup(mock.stop)

    def test_school_uses_full_six_hours_before_career(self):
        school = [todo("School A", estimate="3h"), todo("School B", estimate="3h")]
        career = todo("Career deadline", area="Career", due=DAY)
        selected, rolled, warnings, _ = planner.plan(DAY, 6, [career, *school], {})
        self.assertEqual(selected, school)
        self.assertIn(career, rolled)
        self.assertTrue(any("Career deadline" in warning for warning in warnings))
        self.assertEqual(planner.budget_for(DAY, {}), 6)

    def test_area_order_overrides_priority_and_deadline(self):
        items = [todo("Other", area="Other", due=DAY), todo("Personal", area="Personal", due=DAY),
                 todo("Career", area="Career", due=DAY), todo("School", priority="P2")]
        selected, *_ = planner.plan(DAY, 4, items, {})
        self.assertEqual([t.name for t in selected], ["School", "Career", "Personal", "Other"])
        rows = planner.plan_rows(selected, DAY, 540)
        self.assertEqual([row[0].name for row in rows], ["School", "Career", "Personal", "Other"])

    def test_course_project_counts_as_school_without_area(self):
        t = todo("Course task", area="", project="STAT 251")
        self.assertEqual(planner.area_rank(t), 0)

    def test_fixed_event_kept_and_future_work_date_respected(self):
        event = todo("Booked interview", area="Career", estimate="event")
        future = todo("Future task", due=DAY + dt.timedelta(days=7), when=DAY + dt.timedelta(days=3))
        school = todo("School", estimate="3h")
        selected, *_ = planner.plan(DAY, 3, [event, future, school], {})
        self.assertIn(event, selected)
        self.assertIn(school, selected)
        self.assertNotIn(future, selected)

    def test_personal_habit_does_not_displace_school(self):
        habit = todo(planner.HABITS[0][0] + " (Nov 6)", area="Personal", estimate="15m")
        school = todo("School", estimate="3h")
        selected, rolled, *_ = planner.plan(DAY, 3, [habit, school], {})
        self.assertEqual(selected, [school])
        self.assertNotIn(habit, rolled)

    def test_paused_habits_not_created_and_existing_one_cancelled(self):
        paused = todo(planner.HABITS[0][0] + " (Nov 6)", estimate="15m")
        auto = planner.Auto(DAY, [paused], True, {})
        planner.habit_todos(auto)
        self.assertEqual(auto.todos, [])
        self.assertTrue(any("habit is paused" in line for line in auto.lines))

    def test_week_and_daily_share_full_capacity_and_area_order(self):
        day = DAY + dt.timedelta(days=1)
        school = [todo("School A", estimate="3h", when=None, due=day),
                  todo("School B", estimate="3h", when=None, due=day)]
        career = todo("Career", area="Career", when=None, due=day)
        with patch.object(planner, "week_window", return_value=(day, day)):
            _, caps, _, on_day, _, warnings = planner.plan_week(DAY, [career, *school], {})
        self.assertEqual(caps[day], 6)
        self.assertEqual(on_day[day][:2], school)
        self.assertTrue(any("Career" in warning for warning in warnings))
        daily, *_ = planner.plan(day, caps[day], on_day[day], {})
        self.assertEqual(daily, school)

    def test_stuck_task_without_capacity_is_flagged_not_moved(self):
        t = todo("Two hour task", estimate="2h", priority="P2")
        with patch.object(planner, "budget_for", return_value=1):
            moves, flags = planner.stuck(DAY, [t], [t], {"rolled": {t.id: 5}})
        self.assertEqual(moves, [])
        self.assertEqual(len(flags), 1)
        self.assertIn("no future day has room", flags[0][2])

    def test_stuck_moves_consume_capacity_before_next_move(self):
        a = todo("First task", estimate="2h", priority="P2")
        b = todo("Second task", estimate="2h", priority="P2")
        state = {"rolled": {a.id: 5, b.id: 5}}
        with patch.object(planner, "budget_for", return_value=2):
            moves, flags = planner.stuck(DAY, [a, b], [a, b], state)
        self.assertEqual(len(moves), 2)
        self.assertNotEqual(moves[0][1], moves[1][1])
        self.assertEqual(flags, [])

    def test_missed_sparse_prep_step_recovers_only_latest(self):
        due = DAY + dt.timedelta(days=7)
        item = planner.term.KeyDate(due, "CPSC310", "Deliverable", "deliverable", "Deliverable", "", "")
        auto = planner.Auto(DAY, [], True, {})
        with patch.object(planner.term, "key_dates", return_value=[item]), \
                patch.object(auto, "create", wraps=auto.create) as create:
            planner.ladder_todos(auto)
        self.assertEqual(len(auto.todos), 1)
        self.assertTrue(auto.todos[0].name.startswith("T-8 "))
        self.assertIn("Recovery after a missed planner run", create.call_args.kwargs["notes"])
        self.assertIn("T-10", create.call_args.kwargs["notes"])

    def test_recovery_does_not_recreate_closed_step_or_past_exam(self):
        due = DAY + dt.timedelta(days=7)
        item = planner.term.KeyDate(due, "CPSC310", "Deliverable", "deliverable", "Deliverable", "", "")
        title = "T-8 CPSC 310 Deliverable · read the spec once, write the done-checklist"
        auto = planner.Auto(DAY, [], True, {"auto": {title: "closed-fixture-id"}})
        with patch.object(planner.term, "key_dates", return_value=[item]):
            planner.ladder_todos(auto)
        self.assertEqual(auto.todos, [])
        past = item._replace(date=DAY, kind="exam")
        with patch.object(planner.term, "key_dates", return_value=[past]):
            planner.ladder_todos(auto)
        self.assertEqual(auto.todos, [])


if __name__ == "__main__":
    unittest.main()
