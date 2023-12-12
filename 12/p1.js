const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').trim().split('\n')
  .map(lineRaw=>{
    const [springs, sequence] = lineRaw.trim().split(' ')
    return [springs, sequence.split(',').map(Number)]
  })

function canConsumeSequence(springs, i, brokenCount){
  return new RegExp(`^[#\\?]{${brokenCount}}([\\.\\?]{1}|$)`).test(springs.substring(i, i+brokenCount + 1))
}

function getNumberOfCombinations(springs, sequence){
  const stack = [[0, sequence]]
  const lengthSprings = springs.length
  let result = 0;

  while(1){
    const point = stack.pop()

    if(!point){
      return result
    }


    const [i, seq] = point

    if(i>= lengthSprings){
      result += Number(seq.length == 0)
      continue
    }

    if (springs[i] === '.'){
      stack.push([i + 1, seq])
      continue
    }

    if(springs[i] === '#'){
      if(canConsumeSequence(springs, i, seq[0])) {
        const newI = i+seq[0] + 1
        stack.push([newI, seq.slice(1)])
      }

      continue
    }

    if(springs[i] === '?'){
      if(canConsumeSequence(springs, i, seq[0])) {

        const newI = i+seq[0] + 1
        stack.push([newI, seq.slice(1)])
      }

      stack.push([i + 1, seq])
    }

  }
}

console.log(lines.reduce((acc, line)=> acc + getNumberOfCombinations(...line), 0))


