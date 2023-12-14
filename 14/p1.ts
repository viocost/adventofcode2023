const data = (await Deno.readTextFile("input"))
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

data.splice(0, 0, Array(data[0].length).fill("#"));

const comb = Array(data[0].length).fill(0);
let result = 0;

function calculateWeight(val, index) {
  let result = 0;
  for (let i = 1; i <= val; i++) {
    result += index - i;
  }
  return result;
}

for (let i = data.length - 1; i >= 0; i--) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] == "O") {
      comb[j] += 1;
    } else if (data[i][j] == "#") {
      const weight = calculateWeight(comb[j], data.length - i);
      result += weight;
      comb[j] = 0;
    }
  }
}

console.log(result);
