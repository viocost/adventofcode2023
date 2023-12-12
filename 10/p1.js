const fs = require("fs");

const map = fs
  .readFileSync("input", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

const connections = {
  south: [new Set(["|", "F", "7", "S"]), new Set(["L", "|", "J", "S"])],
  east: [new Set(["-", "L", "F", "S"]), new Set(["-", "J", "7", "S"])],
  west: [new Set(["7", "J", "-", "S"]), new Set(["-", "F", "L", "S"])],
  north: [new Set(["|", "J", "L", "S"]), new Set(["|", "F", "7", "S"])],
};

function resetVisited(map){
  return Array(map.length).fill(null).map(_=> Array(map[0].length).fill(0))
}

function canConnect(pSource, pDest, direction) {
  const connection = connections[direction];
  return connection[0].has(pSource) && connection[1].has(pDest)
}

const isValidPoint = (map, x, y) =>  x >= 0 && x < map.length && y >= 0 && y < map[0].length;
const isPipe = (map, x, y) => isValidPoint(map, x, y) && map[x][y] != '.';;
const deltas = [[1, 0, 'south', 'north'], [-1, 0, 'north', 'south'], [0, 1, 'east', 'west'], [0, -1, 'west', 'east']]

const isEnclosed = (map, visited, x, y) => {
  let intersects = 0
  let from = null
  for (let i = 0; i < x; i++) {

    const char = map[i][y]
    if(visited[i][y] !== "L" || char=== '|') continue

    if( ['F', 'L'].includes(char)) {
      from === 'E' && intersects++;
      from = from ? null : "W"
    } else if( ["J", "7"].includes(char) ){
      from === 'W' && intersects++;
      from = from ? null : "E"
    }else {
      intersects++
    }
  }

  return intersects % 2 === 1
}

function exploreLoop(map, startX, startY, visited) {
  const stack = [[startX, startY, 0]];

  while(stack.length > 0) {
    const [x, y, length, fromDirection ] = stack.pop();


    if(!isPipe (map, x, y)) continue;

    if(map[x][y] === "S" && visited[x][y]) {
      return length
    };

    visited[x][y] = "L";

    deltas
      .map(([dx, dy, direction, opposite]) => [x +dx, y+dy, direction, opposite])
      .filter(([nx, ny, direction, opposite]) => isPipe (map, nx, ny) && canConnect(map[x][y], map[nx][ny], direction) && fromDirection !== opposite)
      .forEach(([nx, ny, direction]) => {
          stack.push([nx, ny, length + 1, direction ])
    })
  }
}

function exploreRegion(map, startX, startY, visited, markSymbol) {
  const stack = [[startX, startY]];
  let length = 0;
  while(stack.length > 0) {
    const [x, y] = stack.pop();
    if (visited[x][y]) continue;
    visited[x][y] = markSymbol;

    length++;

    deltas
      .map(([dx, dy]) => [x +dx, y+dy])
      .filter(([nx, ny ]) => {
        return isValidPoint(map, nx, ny)  && !visited[nx][ny]
      })
      .forEach(([nx, ny]) => {
          stack.push([nx, ny])
    })
  }

  return isEnclosed(map, visited, startX, startY) ? length : 0;
}

const visited = resetVisited(map);
const startX = map.findIndex((row) => row.includes("S"));
const startY = map[startX].indexOf("S");

// p1
console.log(exploreLoop(map, startX, startY, visited)/2)

let lenEnclosed = 0

for(let i = 0; i < map.length; i++) {
  for(let j =0; j < map[0].length; j++) {
    if(!visited[i][j]) {
      lenEnclosed += exploreRegion(map, i, j, visited, 'r');
    }
  }
}


// p2
console.log(lenEnclosed)
