from functools import reduce

with open('input', 'r') as fp:
    lines = list(map(lambda x: [c for c in x.strip()], fp.readlines()))

    def rotate(grid):
        return [list(reversed(col)) for col in zip(*grid)]

    def expander(acc, line):
        if len(set(line)) <=2  and set(line).issubset(set(['.', '%'])):
            return [*acc , ["%" for _ in range(len(line))]]
        return [*acc, line]

    def expand(grid):
        return reduce(expander, grid, [])

    grid = rotate(rotate(rotate(expand(rotate(expand(lines))))))
    for l in grid:
        print("".join(l))
# p1
# empty_size = 2

# p2
empty_size = 1000000

galaxies = []
diffs = []
for i in range(len(grid)):
    for j in range(len(grid[0])):
        if grid[i][j] == '#':
            ey = reduce(lambda acc, x: acc + 1 if grid[i][x] == '%' else acc, range(0, j+1), 0)
            ex = reduce(lambda acc, x: acc + 1 if grid[x][j] == '%' else acc, range(0, i+1), 0)
            galaxies.append((i - ex + ex * empty_size, j - ey + ey * empty_size))

for i in range(len(galaxies)):
    for j in range(i + 1, len(galaxies)):
        diffs.append( abs(galaxies[i][0] - galaxies[j][0]) + abs(galaxies[i][1] - galaxies[j][1]))
print(sum(diffs))
