const input1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const input2 = [4, 2, 0, 3, 2, 5];

function calcWater(input) {
  let i = 0;
  let j = input.length - 1;
  let highestLeft = input[i];
  let highestRight = input[j];

  let totalWater = 0;

  while (j > i) {
    const heightLeft = input[i];
    const heightRight = input[j];

    const waterUnits =
      Math.min(highestLeft, highestRight) -
      Math.min(highestLeft, highestRight, heightLeft, heightRight);
    totalWater += waterUnits;

    highestLeft = Math.max(highestLeft, heightLeft);
    highestRight = Math.max(highestRight, heightRight);
    if (heightLeft <= heightRight) {
      i++;
    } else {
      j--;
    }
  }

  return totalWater;
}

console.log(calcWater(input1));
