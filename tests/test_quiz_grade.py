"""Filesystem regression tests. Every writable path is an isolated temporary school root."""
import contextlib
import copy
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

SCRIPTS = Path(__file__).resolve().parents[1] / ".claude/skills/quiz-me/scripts"
sys.dont_write_bytecode = True
sys.path.insert(0, str(SCRIPTS))
import quiz_grade as G
import quizlib as L


class GradeFilesystemTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="school-grade-test-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        paths = {
            "ROOT": self.root,
            "LEDGER": self.root / "ledger.md",
            "STATE": self.root / "routines/quiz-state.json",
            "PRIVATE": self.root / "routines/quiz-private.json",
            "SESSION": self.root / "routines/quiz-session.json",
            "TRANSIT_SESSION": self.root / "routines/transit-session.json",
            "QUIZ_DIR": self.root / "routines/quiz",
            "SESSIONS_DIR": self.root / "routines/quiz/sessions",
            "RUNS_DIR": self.root / "routines/runs",
            "REVIEW_PLAN": self.root / "routines/review-plan.json",
        }
        self.addCleanup(mock.patch.stopall)
        for key, path in paths.items():
            mock.patch.object(L, key, str(path)).start()
        mock.patch.object(L, "load_calendar", return_value={}).start()
        Path(L.LEDGER).write_text(
            "# Test ledger\n\n## Due now\n\n## All topics\n\n"
            "| Course | Topic | Lec | Last | Grade | Streak | Next |\n"
            "|---|---|---|---|---|---|---|\n"
            "| STAT 251 | Alpha concepts | 1 | — | — | 0 | 2026-11-06 |\n\n"
            "## Session log\n\n| Date | Session |\n|---|---|\n",
            encoding="utf-8",
        )
        bank = self.root / "courses/STAT251/02-questions.md"
        bank.parent.mkdir(parents=True)
        bank.write_text("# Test questions\n\n## Lec 1\n\n" + "\n".join(
            f"### Q: Test concept {i}?\n"
            f"**Topic:** Alpha concepts  **Lec:** 1  **Type:** recall  **Id:** {i:08x}\n"
            f"**A:** Key:\n1. Answer {i}.\n\nExplanation.\n"
            for i in range(1, 5)
        ), encoding="utf-8")
        self.questions = L.load_questions()

    def session(self, sid, question_numbers=(1,), mode="quiz", pending=False):
        items = []
        for n, number in enumerate(question_numbers, 1):
            q = copy.deepcopy(self.questions[number - 1])
            items.append({**q, "n": n, "label": "STAT 251", "topic_tag": q["topic"], "parts": 1})
        data = dict(id=sid, date="2026-11-06", mode=mode, created="2026-11-06T09:00:00-08:00",
                    items=items, before={})
        path = Path(L.TRANSIT_SESSION if mode == "transit" else L.SESSION) if pending else self.root / f"{sid}.json"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data), encoding="utf-8")
        return path

    def call(self, *args):
        out = io.StringIO()
        with mock.patch.object(sys, "argv", ["quiz_grade.py", "--date", "2026-11-06", *map(str, args)]), contextlib.redirect_stdout(out):
            G.main()
        return out.getvalue()

    def state(self):
        return json.loads(Path(L.STATE).read_text(encoding="utf-8"))

    def history(self, number=1):
        return self.state()["questions"].get(f"{number:08x}", {}).get("history", [])

    def row(self):
        return L.load_ledger()[1][0]

    def test_incremental_save_and_identical_replay(self):
        session = self.session("incremental", (1, 2))
        self.call("--session", session, "1:O3")
        self.call("--session", session, "1:O3")
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(self.state()["sessions"][0]["n"], 1)
        self.call("--session", session, "2:X2/c")
        self.assertEqual(len(self.history(2)), 1)
        self.assertEqual(self.row()["grade"], "X")
        self.assertTrue((Path(L.SESSIONS_DIR) / "incremental.json").exists())
        self.call("--session", session, "1:O3 2:X2/c")
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(len(self.history(2)), 1)

    def test_interrupted_save_recovers_before_session_marker_without_duplicates(self):
        session = self.session("crash", (1, 2))
        original = G.atomic_text
        def interrupted(path, content):
            if str(path) == str(session):
                raise OSError("simulated process interruption before session marker")
            original(path, content)
        with mock.patch.object(G, "atomic_text", side_effect=interrupted):
            with self.assertRaises(OSError):
                self.call("--session", session, "1:O3")
        self.assertEqual(len(self.history()), 1)
        self.assertFalse(json.loads(session.read_text())["items"][0].get("done"))
        self.assertTrue(Path(G.journal_path()).exists())
        output = self.call("--session", session, "1:O3")
        self.assertIn("recovered", output)
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(self.state()["sessions"][0]["n"], 1)
        self.assertTrue(json.loads(session.read_text())["items"][0]["done"])
        self.assertFalse(Path(G.journal_path()).exists())
        log = Path(L.QUIZ_DIR) / "2026-11-06.md"
        self.assertEqual(log.read_text().count("1 recorded"), 1)

    def test_finished_pending_session_recovers_archive_and_delete(self):
        session = self.session("finish-crash", pending=True)
        archive = Path(L.SESSIONS_DIR) / "finish-crash.json"
        original = G.atomic_text
        def interrupted(path, content):
            original(path, content)
            if str(path) == str(archive):
                raise OSError("simulated interruption after archive")
        with mock.patch.object(G, "atomic_text", side_effect=interrupted):
            with self.assertRaises(OSError):
                self.call("1:O3")
        self.assertTrue(session.exists())
        self.call("1:O3")
        self.assertFalse(session.exists())
        self.assertTrue(archive.exists())
        self.assertEqual(len(self.history()), 1)

    def test_migration_cli_recovers_interrupted_grade_before_reading_state(self):
        session = self.session("migration-recovery", (1, 2))
        original = G.atomic_text
        def interrupted(path, content):
            if str(path) == str(session):
                raise OSError("interrupted before completion marker")
            original(path, content)
        with mock.patch.object(G, "atomic_text", side_effect=interrupted):
            with self.assertRaises(OSError):
                self.call("--session", session, "1:O3")
        term_source = SCRIPTS.parents[1] / "morning-check/scripts/term.py"
        term_target = self.root / ".claude/skills/morning-check/scripts/term.py"
        term_target.parent.mkdir(parents=True)
        term_target.write_text(term_source.read_text(), encoding="utf-8")
        result = subprocess.run(
            [sys.executable, str(SCRIPTS / "quiz_ids.py")],
            env={**os.environ, "SCHOOL_ROOT": str(self.root), "PYTHONDONTWRITEBYTECODE": "1"},
            capture_output=True, text=True, check=True,
        )
        self.assertIn("recovered", result.stdout)
        self.assertFalse(Path(G.journal_path()).exists())
        self.assertTrue(json.loads(session.read_text())["items"][0]["done"])
        self.assertEqual(len(self.history()), 1)
        self.call("--session", session, "2:X3/c")
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(len(self.history(2)), 1)

    def test_undo_identifies_first_of_identical_same_day_reviews(self):
        first = self.session("first")
        second = self.session("second")
        third = self.session("third")
        self.call("--session", first, "1:O3")
        self.call("--session", second, "1:X3/c")
        self.call("--session", third, "1:O3")
        before = self.history()
        self.assertEqual(len({e[2]["event_id"] for e in before}), 3)
        self.call("--session", first, "--undo", "1")
        after = self.history()
        self.assertEqual([e[1] for e in after], ["X", "O"])
        self.assertEqual([e[2]["event_id"] for e in after], [e[2]["event_id"] for e in before[1:]])

    def test_transit_overlap_and_undo_preserve_other_session(self):
        quiz = self.session("quiz", (1, 3))
        transit = self.session("transit", (2,), mode="transit", pending=True)
        self.call("--session", quiz, "1:O3")
        self.call("--transit", "2026-11-06", "1:X3/c")
        self.call("--session", quiz, "2:O3")
        self.assertEqual(self.row()["grade"], "X")
        self.call("--session", quiz, "--undo", "1")
        self.assertEqual(self.row()["grade"], "X")
        self.assertEqual(len(self.history(2)), 1)
        self.assertFalse(transit.exists())

    def test_undo_all_overlapping_sessions_restores_original_baseline(self):
        initial = G.snapshot(self.row())
        quiz = self.session("baseline-quiz")
        self.session("baseline-transit", (2,), mode="transit", pending=True)
        self.call("--session", quiz, "1:O3")
        self.call("--transit", "2026-11-06", "1:O3")
        self.call("--session", quiz, "--undo", "1")
        self.assertEqual(self.row()["grade"], "O")
        self.call("--transit", "2026-11-06", "--undo", "1")
        self.assertEqual(G.snapshot(self.row()), initial)

    def test_exclusion_closes_session_without_failed_review(self):
        session = self.session("excluded", (1, 2), pending=True)
        self.call("1:O3 2:-")
        self.assertFalse(session.exists())
        archive = json.loads((Path(L.SESSIONS_DIR) / "excluded.json").read_text())
        self.assertIsNone(archive["items"][1]["done"]["grade"])
        self.assertEqual(self.history(2), [])
        self.assertEqual(self.state()["sessions"][0]["n"], 1)

    def test_all_excluded_does_not_change_topic(self):
        self.session("all-excluded", (1, 2), pending=True)
        before = G.snapshot(self.row())
        self.call("1:- 2:-")
        self.assertEqual(G.snapshot(self.row()), before)
        self.assertEqual(self.state()["questions"], {})

    def test_undo_archived_exclusion_reopens_card_without_removing_history(self):
        session = self.session("undo-exclusion", (1, 2))
        self.call("--session", session, "1:O3 2:-")
        state_before = copy.deepcopy(self.state())
        row_before = G.snapshot(self.row())
        self.call("--session", session, "--undo", "2")
        self.assertEqual(self.state()["questions"], state_before["questions"])
        self.assertEqual(G.snapshot(self.row()), row_before)
        pending = json.loads(Path(L.SESSION).read_text())
        self.assertNotIn("done", pending["items"][1])
        self.call("2:O3")
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(len(self.history(2)), 1)

    def test_archived_transit_exclusion_can_be_changed_to_a_grade(self):
        self.session("transit-exclusion", mode="transit", pending=True)
        self.call("--transit", "2026-11-06", "1:-")
        self.assertEqual(self.state()["questions"], {})
        self.call("--transit", "2026-11-06", "1:O3")
        self.assertEqual(len(self.history()), 1)
        self.assertEqual(self.history()[0][1], "O")

    def test_legacy_history_is_preserved_and_unambiguous_undo_works(self):
        session = self.session("legacy")
        data = json.loads(session.read_text())
        entry = ["2026-11-05", "O"]
        data["items"][0]["done"] = dict(grade="O", extra={}, at="2026-11-05 10:00", entry=entry, seq=1)
        data["before"] = {"STAT251|Alpha concepts": G.snapshot(self.row())}
        session.write_text(json.dumps(data))
        Path(L.STATE).parent.mkdir(parents=True, exist_ok=True)
        Path(L.STATE).write_text(json.dumps(dict(questions={"00000001": dict(course="STAT251", topic="Alpha concepts", history=[entry])},
                                                sessions=[dict(id="legacy", date="2026-11-05", results=[[1,"00000001","STAT251","O"]], n=1)])))
        self.call("--session", session, "--undo", "1")
        self.assertEqual(self.history(), [])

    def test_ambiguous_legacy_undo_stops_without_touching_files(self):
        session = self.session("legacy-ambiguous")
        data = json.loads(session.read_text())
        entry = ["2026-11-06", "O"]
        data["items"][0]["done"] = dict(grade="O", extra={}, at="2026-11-06 10:00", entry=entry, seq=1)
        data["before"] = {"STAT251|Alpha concepts": G.snapshot(self.row())}
        session.write_text(json.dumps(data))
        Path(L.STATE).parent.mkdir(parents=True, exist_ok=True)
        Path(L.STATE).write_text(json.dumps(dict(questions={"00000001": dict(course="STAT251", topic="Alpha concepts", history=[entry, entry])}, sessions=[])))
        before = {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()}
        with self.assertRaisesRegex(SystemExit, "uniquely"):
            self.call("--session", session, "--undo", "1")
        self.assertEqual({p:p.read_bytes() for p in before}, before)

    def test_relative_session_path_is_journalled_absolute(self):
        session = self.session("relative", (1, 2))
        cwd = os.getcwd()
        os.chdir(session.parent)
        try:
            self.call("--session", session.name, "1:O3")
        finally:
            os.chdir(cwd)
        self.assertFalse(Path(G.journal_path()).exists())
        self.assertTrue(json.loads(session.read_text())["items"][0]["done"])
        self.assertEqual(len(self.history()), 1)

    def test_id_less_pending_deck_is_removed_when_finished(self):
        deck = self.session("unused", (1, 2), mode="transit", pending=True)
        data = json.loads(deck.read_text())
        del data["id"]
        deck.write_text(json.dumps(data))
        self.call("--transit", "2026-11-06", "1 O3 2 X3/c")
        self.assertFalse(deck.exists())
        out = self.call("--transit", "2026-11-06", "1 O3 2 X3/c")
        self.assertIn("already recorded", out)
        self.assertEqual(len(self.history(2)), 1)

    def interrupt_after_journal(self, *args):
        """Run a grade that stops after its journal is written and before any output is installed."""
        journal = G.journal_path()
        original = G.atomic_text
        def stop(path, content):
            if os.path.abspath(path) != os.path.abspath(journal):
                raise OSError("simulated interruption after the journal")
            original(path, content)
        with mock.patch.object(G, "atomic_text", side_effect=stop):
            with self.assertRaises(OSError):
                self.call(*args)
        self.assertTrue(Path(journal).exists())

    def test_recovery_never_overwrites_a_file_edited_since(self):
        session = self.session("guarded", (1, 2))
        self.interrupt_after_journal("--session", session, "1:O3")
        ledger = Path(L.LEDGER)
        ledger.write_text(ledger.read_text() + "\nA hand edit made after the interruption.\n")
        with self.assertRaisesRegex(SystemExit, "changed after it stopped"):
            self.call("--session", session, "2:O3")
        self.assertIn("A hand edit", ledger.read_text())
        self.assertTrue(Path(G.journal_path()).exists())
        self.assertFalse(Path(L.STATE).exists())

    def test_recovered_finishing_call_prints_its_report(self):
        session = self.session("report", (1, 2))
        self.interrupt_after_journal("--session", session, "1:O3 2:X3/c")
        out = self.call("--session", session, "1:O3 2:X3/c")
        self.assertIn("recovered", out)
        self.assertIn("its report", out)
        self.assertIn("GRADED 2 of 2", out)
        self.assertEqual(len(self.history()), 1)

    def test_answer_to_a_question_retagged_mid_session_moves_its_pick_time_row(self):
        ledger = Path(L.LEDGER)
        ledger.write_text(ledger.read_text().replace(
            "| STAT 251 | Alpha concepts | 1 | — | — | 0 | 2026-11-06 |",
            "| STAT 251 | Alpha concepts | 1 | — | — | 0 | 2026-11-06 |\n| STAT 251 | Beta concepts | 1 | — | — | 0 | 2026-11-06 |"))
        session = self.session("retag", (1,))
        bank = self.root / "courses/STAT251/02-questions.md"
        bank.write_text(bank.read_text().replace("**Topic:** Alpha concepts  **Lec:** 1  **Type:** recall  **Id:** 00000001",
                                                 "**Topic:** Beta concepts  **Lec:** 1  **Type:** recall  **Id:** 00000001"))
        self.call("--session", session, "1:X3/c")
        alpha, beta = L.load_ledger()[1][:2]
        self.assertEqual((alpha["grade"], alpha["next"]), ("X", "2026-11-07"))
        self.assertEqual((beta["grade"], beta["next"]), ("X", "2026-11-07"))


if __name__ == "__main__":
    unittest.main()
