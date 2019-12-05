var fs = require("fs");
var text = fs.readFileSync("./input.csv", "utf-8");
var textByLine = text.split("\n").map(x => x.split(","));

(async () => {
  const results = {};
  const answer = await Promise.all([
    getMap(results, textByLine[0], "line1", "line2"),
    getMap(results, textByLine[1], "line2", "line1")
  ]);
  console.log(answer);
})();

function getMap(results, input, lineName, otherLineName) {
  return new Promise((resolve, reject) => {
    let currentPosition = { x: 0, y: 0 };
    let closestPointSteps;
    let steps = 0;
    input.forEach(element => {
      const direction = element.substr(0, 1);
      const movement = element.substr(1);

      for (let index = 0; index < movement; index++) {
        if (direction === "U") currentPosition.y++;
        if (direction === "D") currentPosition.y--;
        if (direction === "L") currentPosition.x--;
        if (direction === "R") currentPosition.x++;
        steps++;

        const result = move(
          currentPosition,
          results,
          lineName,
          otherLineName,
          steps
        );
        if (result && (!closestPointSteps || result < closestPointSteps)) {
          closestPointSteps = result;
        }
      }
    });
    resolve(closestPointSteps);
  });
}

function move(currentPosition, results, lineName, otherLineName, steps) {
  // if x coordinate has been navigated to before
  if (results[currentPosition.x]) {
    // if y coordinate has been navigated to before
    if (results[currentPosition.x][currentPosition.y]) {
      results[currentPosition.x][currentPosition.y][lineName] = steps;
      // if other line has been here before
      if (results[currentPosition.x][currentPosition.y][otherLineName]) {
        return (
          results[currentPosition.x][currentPosition.y][otherLineName] + steps
        );
      }
    } else {
      results[currentPosition.x][currentPosition.y] = { [lineName]: steps };
    }
  } else {
    results[currentPosition.x] = {};
    results[currentPosition.x][currentPosition.y] = { [lineName]: steps };
  }
}
