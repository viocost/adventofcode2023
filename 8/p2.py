import re, math

def count_steps_to_target(nodes, start, instructions, target="Z") :
    count = 0
    node = start
    while node[2] != target:
        direction  = int(instructions[count%len(instructions)] == "R")
        node = nodes[node][direction]
        count += 1
    return count

with open('input', "r") as fp:
    instructions, data = fp.read().split("\n\n")
    nodes = { l[0]: [l[1], l[2]] for l in list(map(lambda line: re.sub("\s+", " ", re.sub("[=(),]+", "", line)).split(" "), data.strip().split('\n')))}
    starting_nodes =list(filter(lambda key: key[2] =="A", nodes.keys()))
    steps_to_z = list(map(lambda key: count_steps_to_target(nodes, key, instructions),  starting_nodes))
    print(math.lcm(*steps_to_z))
