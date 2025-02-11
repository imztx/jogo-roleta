from typing import Sequence
from dataclasses import dataclass
import math

DEFAULT_NUMBERS = (
    0,
    32,
    15,
    19,
    4,
    21,
    2,
    25,
    17,
    34,
    6,
    27,
    13,
    36,
    11,
    30,
    8,
    23,
    10,
    5,
    24,
    16,
    33,
    1,
    20,
    14,
    31,
    9,
    22,
    18,
    29,
    7,
    28,
    12,
    35,
    3,
    26,
)

DEFAULT_RED_NUMBERS = tuple(DEFAULT_NUMBERS[1::2])
DEFAULT_BLACK_NUMBERS = tuple(DEFAULT_NUMBERS[2::2])


@dataclass
class Bet:
    value: float
    numbers: Sequence[int]

    @classmethod
    def create_black(cls, value: float):
        return cls(value=value, numbers=set(DEFAULT_BLACK_NUMBERS))

    @classmethod
    def create_red(cls, value: float):
        return cls(value=value, numbers=set(DEFAULT_RED_NUMBERS))

    @classmethod
    def create_from_filter(cls, value: float, fn):
        return cls(
            value=value,
            numbers=set(filter(fn, DEFAULT_NUMBERS[1:]))
        )

    @classmethod
    def create_odd(cls, value: float):
        return cls.create_from_filter(value, lambda it: it % 2 == 1)

    @classmethod
    def create_even(cls, value: float):
        return cls.create_from_filter(value, lambda it: it % 2 == 0)
    
    @classmethod
    def create_interval(cls, value: float, begin: int, end: int):
        return cls.create_from_filter(value, lambda it: begin <= it <= end)
    
    @classmethod
    def create_quad(cls, value: float, begin: int):
        if begin % 3 != 0 and begin < 34:
            return cls(value,{ begin, begin + 1, begin +3, begin + 4 })
    
    @classmethod
    def create_duo(cls, value: float, duo: str):
        begin, end = int(duo.split(',')[0]), int(duo.split(',')[1])
        plus_3_begin = 0
        plus_3_end = 0
        if not begin % 3:
            plus_3_begin = 3
        if not end % 3:
            plus_3_end = 3
        if abs(math.ceil(begin/3) - math.ceil(end/3)) + abs((begin % 3 + plus_3_begin) - (end % 3 + plus_3_end)) < 2:
            return cls(value, {begin, end})
        raise Exception ('Aposta inválida')
    
    @classmethod
    def create_line(cls, value: float, begin: int):
        if 0 < begin < 4:
            return cls(value, {i for i in range(begin, 37, 3)})
        raise Exception ('Aposta inválida')


class Roleta:
    pass
#teste
