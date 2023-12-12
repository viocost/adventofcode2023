import re
from functools import reduce

def process_line(line: str):
    winning, actual = map(lambda chunk: set(chunk.split(" ")), re.sub(r"\s+", " ", re.sub(r"Card\s+\d+:\s+", "", line)).strip().split(" | "))
    return  len(winning.intersection(actual))

def get_total_cards(lines ):
    def reducer(acc, line):
        total, copies = acc
        score = process_line(line)

        for i in range(score):
            copies[i+1] += (1 * copies[0])

        return (1 +  total +  score * copies[0], copies[1:])

    return  reduce(reducer, lines, (0, [1]* len(lines)))[0]


if __name__ == "__main__":
    with open("input.txt", "r") as fp:
        lines = fp.readlines()
        print(get_total_cards(lines))
