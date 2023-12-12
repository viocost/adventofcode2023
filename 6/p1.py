from functools import reduce
import operator

def multiply_list(lst):
    return reduce(operator.mul, lst, 1)


#p1
time, records= map(lambda a: map(int, a.split(" ")), """44 80 65 72
208 1581 1050 1102""".split("\n"))

#p2
time, records= map(lambda a: map(int, a.split(" ")), """44806572
208158110501102""".split("\n"))

def get_win_count(race):
    t, record = race
    return reduce(lambda acc, i: acc + int(i * (t-i) > record), range(t), 0)

def get_win_count_pn(race):
    t, record = race
    delta = t ** 2 - 4 * record
    s1 = -t

races = list(zip(time, records))
results = list(map(get_win_count, races))

print(multiply_list(results))
