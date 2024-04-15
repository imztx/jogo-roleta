from unittest import TestCase
from roleta import Bet
from itertools import chain

def all_2_horizontal():
    for l in range(3):
        yield from zip(range(1 + l, 32 + l, 3), range(4 + l, 35 + l, 3))
        
def all_2_vertical():
    for c in range(0, 35, 3):
        yield c + 1, c + 2
        yield c + 2, c + 3
        
def all_2():
    return chain(all_2_horizontal(), all_2_vertical())

class RoletaTest(TestCase):

    def test_run_test(self):
        self.assertTrue(True)

    def test_black(self):
        bet = Bet.create_black(value=100.)
        self.assertIsInstance(bet, Bet)
        self.assertEqual(bet.value, 100.)
        black = {
            2, 4, 6, 8, 10, 11, 13, 15,
            17, 20, 22, 24, 26, 28, 29, 31, 33, 35
        }
        self.assertSetEqual(bet.numbers, black)

    def test_red(self):
        bet = Bet.create_red(value=100.)
        self.assertIsInstance(bet, Bet)
        self.assertEqual(bet.value, 100.)
        red = {
            1, 3, 5, 7, 9, 12,
            14, 16, 18, 19,
            21, 23, 25, 27,
            30, 32, 34, 36
        }
        self.assertSetEqual(bet.numbers, red)

    def test_odd(self):
        bet = Bet.create_odd(value=100.)
        self.assertIsInstance(bet, Bet)
        self.assertEqual(bet.value, 100.)
        self.assertEqual(len(bet.numbers), 18)
        self.assertEqual(len(list(filter(lambda it: it % 2 == 0, bet.numbers))), 0)

    def test_even(self):
        bet = Bet.create_even(value=100.)
        self.assertIsInstance(bet, Bet)
        self.assertEqual(bet.value, 100.)
        self.assertEqual(len(bet.numbers), 18)
        self.assertEqual(len(list(filter(lambda it: it % 2 == 1, bet.numbers))), 0)
        
    def test_interval_1_to_18(self):
        bet = Bet.create_interval(value=100, begin=1, end=18)
        self.assertEqual(bet.value, 100.)
        self.assertEqual(len(bet.numbers), 18)
        self.assertEqual(list(filter(lambda it: it < 19, bet.numbers)), list(it for it in range(1, 19)))
        
    def test_interval_13_to_24(self):
        bet = Bet.create_interval(value=100, begin=13, end=24)
        self.assertEqual(bet.value, 100)
        self.assertEqual(len(bet.numbers), 12)
        self.assertEqual(list(filter(lambda it: 12 < it < 25, bet.numbers)), list(it for it in range(13, 25)))
        
    def test_quad(self):
        bet = Bet.create_quad(value=100, begin=14)
        self.assertEqual(bet.value, 100)
        self.assertEqual(len(bet.numbers), 4)
        self.assertEqual((bet.numbers), {14,15,17,18})
        
    def test_duo_correct(self):
        with self.assertRaises(Exception): 
            Bet.create_duo(value=100, duo='6,7')
        dataset = dict((','.join(map(str, numbers)), set(numbers)) for numbers in all_2())
        for input, expected in dataset.items():
            with self.subTest(f"Convert {input} to {expected}"):
                bet = Bet.create_duo(100, input)
                self.assertIsInstance(bet, Bet)
                self.assertEqual(bet.numbers, expected)