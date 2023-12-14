const fs = require("fs");

const unfold = (str, sep) => {
  return Array(5).fill(str).join(sep);
};

const lines = fs
  .readFileSync("input", "utf-8")
  .trim()
  .split("\n")
  .map((lineRaw) => {
    const [springs, sequence] = lineRaw.trim().split(" ");
    return [unfold(springs, "?"), unfold(sequence, ",").split(",").map(Number)];
  });

function canConsumeSequence(springs, i, brokenCount) {
  const pattern = new RegExp(`^[#\\?]{${brokenCount}}([\\.\\?]{1}|$)`);
  return pattern.test(springs.substring(i, i + brokenCount + 1));
}

class Cache {
  _cache = {};

  _hashArgs(args) {
    return args
      .map((arg) => (Array.isArray(arg) ? arg.join(",") : arg))
      .join("");
  }

  set(...args) {
    const value = args.at(-1);
    const keys = args.slice(0, -1);
    const data = this._hashArgs(keys);
    this._cache[data] = value;
  }

  get(...keys) {
    return this._cache[this._hashArgs(keys)];
  }

  has(...keys) {
    return this._cache[this._hashArgs(keys)] !== undefined;
  }
}

function cachedGetNumberOfCombinations(...args) {

  _cache = {};

  function _hashArgs(args) {
    return args
      .map((arg) => (Array.isArray(arg) ? arg.join(",") : arg))
      .join("");
  }

}

function getNumberOfCombinations(springs, i, sequence) {
  const lengthSprings = springs.length;

  if (i >= lengthSprings) {
    return Number(sequence.length == 0);
  }


  if (springs[i] === ".") {
    return getNumberOfCombinations(springs, i + 1, sequence)
  }

  if (springs[i] === "#") {
    if (canConsumeSequence(springs, i, sequence[0])) {
      return getNumberOfCombinations(springs, newI, sequence.slice(1));
    }
    return 0;
  }

  if (springs[i] === "?") {
    if (canConsumeSequence(springs, i, sequence[0])) {
      const newI = i + sequence[0] + 1;
      return (
        getNumberOfCombinations(springs, newI, sequence.slice(1)) +
        getNumberOfCombinations(springs, i + 1, sequence)
      );
    }
    return getNumberOfCombinations(springs, i + 1, sequence);
  }
}

console.log(
  lines.reduce(
    (acc, line) =>
      acc + getNumberOfCombinations(line[0], 0, line[1]),
    0
  )
);
