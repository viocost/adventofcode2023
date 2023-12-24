type Ray = Readonly<[number, number, number]>;
const data = (await Deno.readTextFile("input"))
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

enum Direction {
  N = 0,
  W = 270,
  S = 180,
  E = 90,
}

const deltas = {
  [Direction.N]: [-1, 0],
  [Direction.S]: [1, 0],
  [Direction.E]: [0, 1],
  [Direction.W]: [0, -1],
};

const reflectors = {
  "/": (direction) =>
    [Direction.W, Direction.E].includes(direction)
      ? (direction + 360 - 90) % 360
      : (((direction + 90) % 360) as Direction),
  "\\": (direction) =>
    [Direction.S, Direction.N].includes(direction)
      ? (direction + 360 - 90) % 360
      : (((direction + 90) % 360) as Direction),
};

const splitters = {
  "|": (direction) =>
    [Direction.E, Direction.W].includes(direction)
      ? [Direction.S, Direction.N]
      : undefined,
  "-": (direction) =>
    [Direction.N, Direction.S].includes(direction)
      ? [Direction.E, Direction.W]
      : undefined,
};

function makeRay(x, y, direction): Ray {
  return [x, y, direction];
}

function move(x, y, direction): Ray {
  return [x + deltas[direction][0], y + deltas[direction][1], direction];
}

function inBounds(x, y) {
  return x >= 0 && x < data.length && y >= 0 && y < data[0].length;
}

class Queue {
  _queue: Ray[] = [];
  enqueue(ray: Ray): Queue {
    // @ts-ignore
    if (!inBounds(...ray)) return;
    this._queue.push(ray);
    return this;
  }

  dequeue() {
    return this._queue.shift();
  }

  isEmpty() {
    return this._queue.length === 0;
  }
}

function printEnergized(energized: any) {
  console.log("\n");
  for (let row of energized) {
    console.log(row.map((x) => (x ? "#" : ".")).join(""));
  }

  console.log("\n");
}

function fireBeam(ray: Ray) {
  const rayCache = {};

  function seenRay(x, y, fromDirection) {
    return rayCache[x * 1000 + y]!.has(fromDirection);
  }

  function setSeenRay(x, y, fromDirection) {
    rayCache[x * 1000 + y]!.add(fromDirection);
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] !== ".") {
        rayCache[i * 1000 + j] = new Set();
      }
    }
  }
  const energized = Array(data.length)
    .fill(null)
    .map((_) => Array(data[0].length).fill(false));

  const queue = new Queue().enqueue(ray);
  while (!queue.isEmpty()) {
    let [x, y, direction] = queue.dequeue()!;

    while (true) {
      if (!inBounds(x, y)) break;
      energized[x][y] = true;

      if (data[x][y] in reflectors) {
        if (seenRay(x, y, direction)) break;
        setSeenRay(x, y, direction);
        const newDirection = reflectors[data[x][y]]!(direction);
        [x, y, direction] = [...move(x, y, newDirection)];
      } else if (data[x][y] in splitters) {
        if (seenRay(x, y, direction)) break;
        setSeenRay(x, y, direction);
        const newDirections = splitters[data[x][y]]!(direction);
        if (!newDirections) {
          [x, y, direction] = [...move(x, y, direction)];
        } else {
          queue.enqueue(move(...makeRay(x, y, newDirections[0])));

          [x, y, direction] = [...move(x, y, newDirections[1])];
        }
      } else {
        [x, y, direction] = [...move(x, y, direction)];
      }
    }
  }

  let result = 0;
  for (let i = 0; i < energized.length; i++) {
    for (let j = 0; j < energized[i].length; j++) {
      if (energized[i][j]) result++;
    }
  }
  return result;
}

let result = 0;
for (let i = 0; i < data.length; i++) {
  let r1 = fireBeam(makeRay(i, 0, Direction.E));
  let r2 = fireBeam(makeRay(i, data[0].length - 1, Direction.W));
  result = Math.max(result, r1, r2);
}

for (let j = 0; j < data[0].length; j++) {
  let r1 = fireBeam(makeRay(0, j, Direction.S));
  let r2 = fireBeam(makeRay(data.length - 1, j, Direction.N));
  result = Math.max(result, r1, r2);
}

console.log(`Result of P1 is ${fireBeam(makeRay(0, 0, Direction.E))}`);
console.log(`Result of P2 is ${result}`);
