var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
var textByLine = text.split(",").map(x => parseInt(x));

(async () => {
  const combos = [];
  for (let index = 0; index <= 99; index++) {
    for (let index1 = 0; index1 <= 99; index1++) {
      combos.push({ input: textByLine.slice(), noun: index, verb: index1 });
    }
  }
  try {
    await Promise.all(combos.map(x => runComputer(x.input, x.noun, x.verb)));
  } catch (err) {
    console.log(100 * err.noun + err.verb);
  }
})();

function runComputer(input, noun, verb) {
  return new Promise((resolve, reject) => {
    input[1] = noun;
    input[2] = verb;
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      if (element === 1 || element === 2) {
        const position1 = input[input[index + 1]];
        const position2 = input[input[index + 2]];
        let result;
        if (element === 1) {
          result = position1 + position2;
        }
        if (element === 2) {
          result = position1 * position2;
        }
        input[input[index + 3]] = result;
        index += 3;
      }
      if (element === 99) {
        break;
      }
    }
    if (input[0] === 19690720) {
      reject({ noun, verb });
    } else {
      resolve();
    }
  });
}
