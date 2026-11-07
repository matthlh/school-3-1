"""Scheduling and identity regressions. Fixtures never write Matt's review state."""
import datetime as dt
import pathlib
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.claude/skills/quiz-me/scripts'))
import quizlib as L


class ScheduleTests(unittest.TestCase):
    def test_same_day_successes_advance_once(self):
        entries = [['2026-11-06', 'O', {'conf': 3}]] * 3
        self.assertEqual(L.card_state(entries, None, {}), (1, 7, dt.date(2026, 11, 13)))

    def test_same_day_miss_requires_next_day_recall(self):
        entries = [['2026-11-06', 'X'], ['2026-11-06', 'O', {'conf': 3}]]
        self.assertEqual(L.card_state(entries, None, {}), (0, 1, dt.date(2026, 11, 7)))

    def test_later_day_success_advances_and_input_order_does_not_matter(self):
        entries = [['2026-11-13', 'O'], ['2026-11-06', 'O']]
        self.assertEqual(L.card_state(entries, None, {}), (2, 16, dt.date(2026, 11, 29)))

    def test_uncertain_success_holds_rung(self):
        entries = [['2026-11-06', 'O'], ['2026-11-13', 'O', {'conf': 2}]]
        self.assertEqual(L.card_state(entries, None, {}), (1, 7, dt.date(2026, 11, 20)))

    def test_exam_cap_remains_in_force(self):
        with patch.object(L, 'exam_cap', return_value=(dt.date(2026, 11, 10), 'Exam')):
            self.assertEqual(L.card_state([['2026-11-06', 'O']], {}, {})[2], dt.date(2026, 11, 10))

    def test_unasked_sibling_waits_only_the_topic_ladder(self):
        # An O on one card no longer holds a graded topic due because a sibling is unasked: the sibling is due on the
        # topic's own ladder date, here +7, and a promoted sibling's later dates never push it further out.
        row = dict(idx=1, course='STAT251', lec='1', next='2026-11-13', next_date=dt.date(2026, 11, 13), last='2026-11-06')
        qs = [dict(id='asked'), dict(id='new')]
        state = {'questions': {'asked': {'history': [['2026-11-06', 'O']]}}}
        with patch.object(L, 'bank_by_topic', return_value=({1: qs}, [])):
            self.assertEqual(L.sync_card_dues([row], qs, state, {}), [])
        self.assertEqual(row['next'], '2026-11-13')
        state['questions']['asked']['history'] += [['2026-11-13', 'O'], ['2026-11-29', 'O']]
        row.update(next='2026-12-30', next_date=dt.date(2026, 12, 30))
        self.assertEqual(L.row_due(row, qs, state, {}), dt.date(2027, 1, 3))
        state['questions']['asked']['history'].append(['2026-12-01', 'X'])
        self.assertEqual(L.row_due(row, qs, state, {}), dt.date(2026, 12, 2))

    def test_topic_summary_grade_is_the_latest_day(self):
        # A card last missed in September no longer drags today's all-O topic down to X; the streak is the topic's.
        row = dict(idx=1, course='STAT251', lec='1', next='2026-09-02', next_date=dt.date(2026, 9, 2), last='2026-09-01')
        qs = [dict(id='old'), dict(id='today')]
        state = {'questions': {'old': {'history': [['2026-09-01', 'X']]},
                               'today': {'history': [['2026-11-06', 'O', {'conf': 3}]]}}}
        s = L.topic_summary(row, qs, state, {})
        self.assertEqual((s['grade'], s['streak'], s['last']), ('O', 1, dt.date(2026, 11, 6)))
        self.assertEqual(s['next'], dt.date(2026, 9, 2))       # the September miss is still due on its own date

    def test_all_reviewed_cards_can_wait(self):
        row = dict(idx=1, course='STAT251', lec='1', next='2026-11-13', next_date=dt.date(2026, 11, 13), last='2026-11-06')
        qs = [dict(id='asked')]
        state = {'questions': {'asked': {'history': [['2026-11-06', 'O']]}}}
        with patch.object(L, 'bank_by_topic', return_value=({1: qs}, [])):
            self.assertEqual(L.sync_card_dues([row], qs, state, {}), [])
        self.assertEqual(row['next'], '2026-11-13')

    def test_future_activation_and_not_studied_remain_inactive(self):
        fresh = dict(idx=1, last='—', next='2026-11-07', next_date=dt.date(2026, 11, 7))
        self.assertEqual(L.row_due(fresh, [dict(id='new')], {'questions': {}}, {}), dt.date(2026, 11, 7))
        row = dict(idx=1, last='2026-11-06', next=L.NOT_STUDIED, next_date=None)
        self.assertIsNone(L.row_due(row, [dict(id='new')], {'questions': {}}, {}))
        with patch.object(L, 'bank_by_topic', return_value=({1: [dict(id='new')]}, [])):
            self.assertEqual(L.sync_card_dues([row], [], {'questions': {}}, {}), [])
        self.assertEqual(row['next'], L.NOT_STUDIED)


class IdentityTests(unittest.TestCase):
    BANK = '# Questions\n\n## Lecture 1\n\n### Q: A question?\n**Topic:** Topic  **Lec:** 1  **Type:** recall  **Id:** deadbeef\n\n**A:** Key:\n1. The answer.\n'

    def test_scoped_load_rejects_ids_reused_in_another_course(self):
        with tempfile.TemporaryDirectory() as tmp:
            for code in ('STAT251', 'CPSC310'):
                p = pathlib.Path(tmp) / 'courses' / code / '02-questions.md'
                p.parent.mkdir(parents=True)
                p.write_text(self.BANK)
            with patch.object(L, 'ROOT', tmp), self.assertRaisesRegex(SystemExit, 'Duplicate question id'):
                L.load_questions(['STAT251'])

    def test_stamping_rejects_global_duplicates_before_writing(self):
        with tempfile.TemporaryDirectory() as tmp:
            paths = []
            for code in ('STAT251', 'CPSC310'):
                p = pathlib.Path(tmp) / 'courses' / code / '02-questions.md'
                p.parent.mkdir(parents=True)
                p.write_text(self.BANK)
                paths.append(p)
            with patch.object(L, 'ROOT', tmp), self.assertRaisesRegex(SystemExit, 'Duplicate question id'):
                L.stamp_ids()
            self.assertTrue(all(p.read_text() == self.BANK for p in paths))

    def test_history_cannot_be_attached_to_another_course(self):
        state = {'questions': {'deadbeef': {'course': 'PHIL385', 'history': [['2026-11-06', 'O']]}}}
        with self.assertRaisesRegex(SystemExit, 'saved history belongs to PHIL385'):
            L.history(state, dict(id='deadbeef', course='STAT251'))


if __name__ == '__main__':
    unittest.main()
