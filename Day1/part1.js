var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
var textByLine = text.split("\n");

var sum = 0;
textByLine.forEach(x => {
  sum += Math.floor(x / 3) - 2;
});

console.log(sum);
