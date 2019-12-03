var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
var textByLine = text.split(",").map(x => parseInt(x));

textByLine[1] = 12;
textByLine[2] = 2;

for (let index = 0; index < textByLine.length; index++) {
  const element = textByLine[index];
  if (element === 1 || element === 2) {
    const position1 = textByLine[textByLine[index + 1]];
    const position2 = textByLine[textByLine[index + 2]];
    let result;
    if (element === 1) {
      result = position1 + position2;
    }
    if (element === 2) {
      result = position1 * position2;
    }
    textByLine[textByLine[index + 3]] = result;
    index += 3;
  }
  if (element === 99) {
    break;
  }
}

console.log(textByLine[0]);
