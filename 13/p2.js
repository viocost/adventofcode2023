const fs = require("fs");

function zip(strings) {
  const minLength = Math.min(...strings.map((str) => str.length));
  return Array.from({ length: minLength }, (_, i) =>
    strings.map((str) => str[i]).join("")
  );
}

function* reflectionPoints(pattern) {
  for (let i = 0; i < pattern.length - 1; i++) {
    if (
      pattern[i] === pattern[i + 1] ||
      hasSmudge(pattern[i], pattern[i + 1])
    ) {
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

function hasSmudge(l1, l2) {
  return l1.split("").filter((char, i) => l2[i] !== char).length === 1;
}

function getReflectionLength(pattern) {
  reflectionPoint: for (const point of reflectionPoints(pattern)) {
    let smudge = false;
    for (const [l1, l2] of reflections(point, pattern)) {
      if (l1 !== l2) {
        if (hasSmudge(l1, l2) && !smudge) {
          smudge = true;
        } else {
          continue reflectionPoint;
        }
      }
    }

    if (!smudge) continue;

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
