connections = {
    'south': (['|', 'F', '7', 'S'], ['L', '|', 'J', 'S']),
    'east':  (['-', 'L', 'F', 'S'], ['-', 'J', '7', 'S']),
    'west':  (['7', 'J', '-', 'S'], ['-', 'F', 'L', 'S']),
    'north': (['|', 'J', 'L', 'S'], ['|', 'F', '7', 'S'])
}

def is_connectable(grid, start, end, direction):
    conn = connections[direction]
    return grid[start[0]][start[1]] in conn[0] and grid[end[0]][end[1]] in conn[1]

def find_loop_length(grid, start):

    rows, cols = len(grid), len(grid[0])
    visited = {}

    def dfs(x, y, length):
        if (x, y) in visited:
            return length

        visited[(x, y)] = length

        print(x, y)
        print(visited)

        # Check all four possible directions
        for dx, dy, direction in [(1, 0, "south"), (-1, 0, "north"), (0, 1, "east"), (0, -1, "west")]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < rows and 0 <= ny < cols and is_connectable(grid, (x, y), (nx, ny), direction):
                print("next", nx, ny)
                result = length + dfs(nx, ny, length + 1)
                print("result", result)
                if result:
                    return result
        return 0

    return dfs(start[0], start[1], 0)

with open('input') as fp:
    lines = fp.read().splitlines()
    start = (0, 4)

    print(find_loop_length(lines, start))
