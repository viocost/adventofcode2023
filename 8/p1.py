import re
with open('input', "r") as fp:
    instructions, data = fp.read().split("\n\n")
    nodes = { l[0]: [l[1], l[2]] for l in list(map(lambda line: re.sub("\s+", " ", re.sub("[=(),]+", "", line)).split(" "), data.strip().split('\n')))}
    target, current, count = "ZZZ", "AAA", 0
    while current != target:
        for i in instructions:
            count, current = count + 1, nodes[current][int(i=="R")]
    print(count)
