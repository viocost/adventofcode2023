from functools import reduce

with open('input-test', 'r') as fp:
    lines = list(map(lambda x: [c for c in x.strip()], fp.readlines()))

    def rotate(grid):
        return [list(reversed(col)) for col in zip(*grid)]

    def expander(acc, line):
        if len(set(line)) == 1 and line[0] == '.':
            return [*acc, line, line]
        return [*acc, line]

    def expand(grid):
        return reduce(expander, grid, [])

    grid = rotate(rotate(rotate(expand(rotate(expand(lines))))))

galaxies = []
diffs = []
for i in range(len(grid)):
    for j in range(len(grid[0])):
        if grid[i][j] == '#':
            galaxies.append((i, j))
for i in range(len(galaxies)):
    for j in range(i + 1, len(galaxies)):
        diffs.append( abs(galaxies[i][0] - galaxies[j][0]) + abs(galaxies[i][1] - galaxies[j][1]))
print(sum(diffs))
