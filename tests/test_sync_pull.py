"""sync_pull.py: website review events into the quiz records, once each. Every path is a temporary school root."""
import contextlib
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest import mock

SCRIPTS = Path(__file__).resolve().parents[1] / ".claude/skills/quiz-me/scripts"
sys.dont_write_bytecode = True
sys.path.insert(0, str(SCRIPTS))
import quiz_grade as G
import quizlib as L
import sync_pull as S


class SyncPullTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="school-sync-test-")
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
        mock.patch.object(L, "today_local", return_value=__import__("datetime").date(2026, 11, 6)).start()
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
            for i in range(1, 4)
        ), encoding="utf-8")
        self.events = self.root / "progress"

    def event(self, eid, qid=1, grade="O", conf=3, day="2026-11-06", session="s1", **extra):
        e = dict(v=1, kind="review", id=eid, session=session, at=f"{day}T10:00:{len(eid):02d}Z", day=day, device="phone",
                 qid=f"{qid:08x}", course="STAT251", grade=grade, conf=conf, ticks=[grade == "O"], rubric="key",
                 qhash="q", khash="k", **extra)
        self.put(e)
        return e

    def undo(self, eid, target, day="2026-11-06"):
        self.put(dict(v=1, kind="undo", id=eid, at=f"{day}T11:00:00Z", day=day, device="laptop", target=target))

    def put(self, e):
        p = self.events / "events" / e["day"] / f"{e['id']}.json"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(e), encoding="utf-8")

    def run_pull(self, *args):
        out = io.StringIO()
        argv = ["sync_pull.py", "--date", "2026-11-06", "--from", str(self.events), *args]
        with mock.patch.object(sys, "argv", argv), contextlib.redirect_stdout(out):
            S.main()
        return out.getvalue()

    def state(self):
        p = Path(L.STATE)
        return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {"questions": {}, "sessions": []}

    def private(self):
        p = Path(L.PRIVATE)
        return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}

    def history(self, qid=1):
        return self.state()["questions"].get(f"{qid:08x}", {}).get("history", [])

    def row(self):
        return L.load_ledger()[1][0]

    def test_imports_once_under_the_site_event_id(self):
        self.event("aaaa1111", qid=1, grade="O")
        self.event("bbbb2222", qid=2, grade="X", conf=2, attempt="the wrong idea")
        self.run_pull()
        self.run_pull()
        self.assertEqual(len(self.history(1)), 1)
        self.assertEqual(self.history(1)[0][2]["event_id"], "aaaa1111")
        self.assertEqual(self.history(2)[0][:2], ["2026-11-06", "X"])
        self.assertEqual(self.row()["grade"], "X")
        web = [s for s in self.state()["sessions"] if s["id"] == "web-s1"]
        self.assertEqual(web[0]["n"], 2)
        self.assertEqual(L.load_ledger()[0].count("Review on the website"), 1)

    def test_attempt_text_stays_private(self):
        self.event("cccc3333", qid=1, grade="X", attempt="my private wrong answer")
        self.event("dddd4444", qid=2, grade="O", attempt="a right answer is not kept")
        self.run_pull()
        public = Path(L.STATE).read_text(encoding="utf-8") + Path(L.LEDGER).read_text(encoding="utf-8") \
            + Path(L.REVIEW_PLAN).read_text(encoding="utf-8")
        self.assertNotIn("my private wrong answer", public)
        self.assertEqual(self.private()["00000001"][0][1], {"said": "my private wrong answer", "event_id": "cccc3333"})
        self.assertNotIn("00000002", self.private())

    def test_undo_removes_a_filed_review_and_its_note(self):
        initial = (self.row()["grade"], self.row()["next"])
        self.event("eeee5555", qid=1, grade="X", attempt="oops")
        self.run_pull()
        self.assertEqual(self.row()["grade"], "X")
        self.undo("ffff6666", "eeee5555")
        self.run_pull()
        self.assertEqual(self.history(1), [])
        self.assertNotIn("00000001", self.private())
        self.assertEqual((self.row()["grade"], self.row()["next"]), initial)
        self.assertEqual([s for s in self.state()["sessions"] if s["id"] == "web-s1"], [])

    def test_undo_before_import_never_records(self):
        self.event("gggg7777", qid=1, grade="O")
        self.undo("hhhh8888", "gggg7777")
        self.run_pull()
        self.assertEqual(self.history(1), [])

    def test_flagged_and_unknown_are_reported_not_recorded(self):
        self.event("iiii9999", qid=1, grade=None)
        self.event("jjjj0000", qid=9, grade="O")
        out = self.run_pull()
        self.assertIn("Flagged", out)
        self.assertIn("Not imported", out)
        self.assertEqual(self.history(1), [])
        self.assertNotIn("00000009", self.state()["questions"])

    def test_dry_run_writes_nothing(self):
        self.event("kkkk1111", qid=1, grade="O")
        out = self.run_pull("--dry-run")
        self.assertIn("DRY RUN", out)
        self.assertFalse(Path(L.STATE).exists())

    def test_plan_lists_cards_and_due_queue(self):
        self.event("llll2222", qid=1, grade="O")
        self.run_pull()
        plan = json.loads(Path(L.REVIEW_PLAN).read_text(encoding="utf-8"))
        self.assertEqual(plan["as_of"], "2026-11-06")
        self.assertEqual(plan["cards"]["00000001"], "STAT251|Alpha concepts")
        self.assertNotIn("00000001", plan["queue"])        # answered O today: next in a week
        self.assertIn("00000002", plan["queue"])            # never asked, topic studied

    def test_two_sessions_in_one_import_keep_rows_in_place(self):
        before = Path(L.LEDGER).read_text(encoding="utf-8").count("| STAT 251 | Alpha concepts |")
        self.event("mmmm1111", qid=1, grade="O", session="s1")
        self.event("nnnn2222", qid=2, grade="~", session="s2", day="2026-11-05")
        self.run_pull()
        text = Path(L.LEDGER).read_text(encoding="utf-8")
        self.assertEqual(text.count("| STAT 251 | Alpha concepts |"), before)
        self.assertEqual(text.count("Review on the website"), 2)
        self.assertEqual(L.load_ledger()[1][0]["grade"], "O")      # the latest day's answer
        self.event("oooo3333", qid=3, grade="X", session="s1")
        self.run_pull()
        text = Path(L.LEDGER).read_text(encoding="utf-8")
        self.assertEqual(text.count("Review on the website"), 2)  # s1's line replaced, not added
        self.assertIn("2 q · 1 O / 0 ~ / 1 X", text)

    def test_legacy_sessions_without_an_id_do_not_stop_the_import(self):
        Path(L.STATE).parent.mkdir(parents=True, exist_ok=True)
        Path(L.STATE).write_text(json.dumps(dict(questions={}, sessions=[dict(date="2026-09-20", mode="quiz", n=0, results=[])])))
        self.event("pppp1111", qid=1, grade="O")
        self.run_pull()
        self.assertEqual(len(self.history(1)), 1)
        self.assertEqual(len(self.state()["sessions"]), 2)

    def test_a_not_studied_topic_keeps_its_state(self):
        ledger = Path(L.LEDGER)
        ledger.write_text(ledger.read_text().replace("| 0 | 2026-11-06 |", "| 0 | not studied |"))
        self.event("qqqq1111", qid=1, grade="O")
        self.run_pull()
        row = self.row()
        self.assertEqual((row["grade"], row["next"]), ("O", L.NOT_STUDIED))

    def test_a_flag_is_listed_once(self):
        self.event("rrrr1111", qid=1, grade=None)
        self.assertIn("Flagged", self.run_pull())
        self.assertNotIn("Flagged", self.run_pull())


if __name__ == "__main__":
    unittest.main()
