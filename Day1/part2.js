var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
var textByLine = text.split("\n");

var sum = 0;
textByLine.forEach(x => {
  while (x > 0) {
    const result = Math.floor(x / 3) - 2;
    if (result > 0) {
      sum += result;
    }
    x = result;
  }
});

console.log(sum);
