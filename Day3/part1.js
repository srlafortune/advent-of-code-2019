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
    let closestPoint;
    input.forEach(element => {
      const direction = element.substr(0, 1);
      const movement = element.substr(1);

      for (let index = 0; index < movement; index++) {
        if (direction === "U") currentPosition.y++;
        if (direction === "D") currentPosition.y--;
        if (direction === "L") currentPosition.x--;
        if (direction === "R") currentPosition.x++;

        const result = move(
          currentPosition,
          results,
          lineName,
          otherLineName,
          closestPoint
        );
        if (result && (!closestPoint || result < closestPoint)) {
          closestPoint = result;
        }
      }
    });
    resolve(closestPoint);
  });
}

function move(currentPosition, results, lineName, otherLineName) {
  // if x coordinate has been navigated to before
  if (results[currentPosition.x]) {
    // if y coordinate has been navigated to before
    if (results[currentPosition.x][currentPosition.y]) {
      results[currentPosition.x][currentPosition.y][lineName] = true;
      // if other line has been here before
      if (
        results[currentPosition.x][currentPosition.y][otherLineName] == true
      ) {
        return (
          Math.abs(0 - currentPosition.x) + Math.abs(0 - currentPosition.y)
        );
      }
    } else {
      results[currentPosition.x][currentPosition.y] = { [lineName]: true };
    }
  } else {
    results[currentPosition.x] = {};
    results[currentPosition.x][currentPosition.y] = { [lineName]: true };
  }
}
