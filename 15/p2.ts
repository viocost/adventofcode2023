const data = (await Deno.readTextFile("input")).trim().split(",");
import { hash } from "./p1.ts";

function calculateFocusingPower(operations) {
  let boxes = Array(256)
    .fill(null)
    .map(() => []);

  operations.forEach((operation) => {
    let [label, op, value] = operation.split(/(-|=)/).filter(Boolean);
    let boxIndex = hash(label);

    if (op === "=") {
      let lensIndex = boxes[boxIndex].findIndex((lens) => lens.label === label);
      if (lensIndex >= 0) {
        boxes[boxIndex][lensIndex] = { label, focalLength: parseInt(value) };
      } else {
        boxes[boxIndex].push({ label, focalLength: parseInt(value) });
      }
    } else if (op === "-") {
      boxes[boxIndex] = boxes[boxIndex].filter((lens) => lens.label !== label);
    }
  });

  let totalFocusingPower = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      let lens = boxes[i][j];
      totalFocusingPower += (i + 1) * (j + 1) * lens.focalLength;
    }
  }

  return totalFocusingPower;
}

console.log(calculateFocusingPower(data));
