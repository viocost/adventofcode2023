import { zip } from "https://deno.land/std@0.208.0/collections/zip.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";

// Thanks chat gpt :)
function reconstructGrid(
  walls: [number, number, number][],
  width: number,
  height: number
): string[][] {
  // Create a grid filled with empty spaces
  let grid = Array.from({ length: height }, () => Array(width).fill("."));

  // Place walls and rocks in the grid
  for (let [i, j, rocks] of walls) {
    // Place the wall
    grid[i][j] = "#";

    // Place the rocks below the wall
    for (let k = 1; k <= rocks; k++) {
      if (i + k < height) {
        // Check if the position is within the grid
        grid[i + k][j] = "O";
      }
    }
  }

  return grid;
}

function rotate(grid, times = 1) {
  return [...range(times)].reduce(
    (acc, _) => zip(...acc).map((row) => [...row].reverse()),
    grid
  );
}

function pad(initialGrid) {
  const getEdge = (data) => Array(data[0].length + 2).fill("#");
  return [
    getEdge(initialGrid),

    ...initialGrid.map((row) => ["#", ...row, "#"]),
    getEdge(initialGrid),
  ];
}

const data = pad(
  (await Deno.readTextFile("input"))
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""))
);

const getComb = (grid) => Array(grid[0].length).fill(0);

function calculateNorthWeight(grid) {
  let weight = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "O") {
        weight += grid.length - i - 1;
      }
    }
  }
  return weight;
}

function tilt(grid) {
  const walls = [] as any;
  const comb = getComb(grid);

  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "O") {
        comb[j] += 1;
      } else if (grid[i][j] == "#") {
        walls.push([i, j, comb[j]]);
        comb[j] = 0;
      }
    }
  }

  return reconstructGrid(walls, grid.length, grid[0].length);
}

const cycle = (grid) => {
  let currentGrid = grid;
  for (let i = 0; i < 4; i++) {
    currentGrid = rotate(tilt(currentGrid));
  }
  return currentGrid;
};

let grid = data;

let vals = [] as any;
for (let i = 0; i < 1000; i++) {
  grid = cycle(grid);
  let w = calculateNorthWeight(grid);
  if ((i - 23) % 34 == 0) {
    vals.push(w);
  }
}

console.log(vals.at(-1));
