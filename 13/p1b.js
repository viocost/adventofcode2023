const fs = require("fs");

function zip(strings) {
  const minLength = Math.min(...strings.map((str) => str.length));
  return Array.from({ length: minLength }, (_, i) =>
    strings.map((str) => str[i]).join("")
  );
}

function* reflectionPoints(pattern) {
  for (let i = 0; i < pattern.length - 1; i++) {
    if (pattern[i] === pattern[i + 1]) {
      yield i;
    }
  }
}

function* reflections(reflectionPoint, pattern) {
  for (let i = reflectionPoint; i >= 0; i--) {
    yield [
      pattern[i],
      pattern[reflectionPoint + reflectionPoint - i + 1] || pattern[i],
    ];
  }
}

function getReflectionLength(pattern) {
  reflectionPoint: for (const point of reflectionPoints(pattern)) {
    for (const [l1, l2] of reflections(point, pattern)) {
      if (l1 !== l2) continue reflectionPoint;
    }
    return point + 1;
  }
  return 0;
}

const patterns = fs
  .readFileSync("input", "utf-8")
  .trim()
  .split("\n\n")
  .map((pattern) => pattern.trim().split("\n"));

const result = patterns.reduce(
  (acc, pattern) =>
    acc +
    getReflectionLength(pattern) * 100 +
    getReflectionLength(zip(pattern)),

  0
);

console.log(result);
