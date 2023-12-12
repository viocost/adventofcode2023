import re
from math import floor

def process_line(line: str):
    winning, actual = map(lambda chunk: set(chunk.split(" ")), re.sub(r"\s+", " ", re.sub(r"Card\s+\d+:\s+", "", line)).strip().split(" | "))
    return  floor(2 ** (len(winning.intersection(actual)) - 1))

def get_total_score(lines):
    return sum(map(process_line, lines))


if __name__ == "__main__":
    with open("input.txt", "r") as fp:
        lines = fp.readlines()
        print(get_total_score(lines))
