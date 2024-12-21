import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");

const parseInput = (input: string): (number | undefined)[][] => {
  return input.trim().split("\n").map(line =>
      line.split("").map(char => (char === "." ? undefined : parseInt(char)))
  );
};

const topographicMap: number[][] = parseInput(input);

const getSafeValue = (
  matrix: (number | undefined)[][],
  row: number,
  col: number
): number | undefined => {
  if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
    return undefined; // Return undefined for out-of-bounds
  }
  return matrix[row][col];
};
 
function copyMap(map: number [][]) {
  return map.map(row => row.slice());
}

let trialLevel: number = 0;

function findTrail(map: number [][], lastHeight: number, lastPosition: number[]) {
  if(lastHeight === 9) {
    // map[lastPosition[0]][lastPosition[1]] = undefined;
    trialLevel++
    return;
  }

  const lastRow = lastPosition[0];
  const lastColumn = lastPosition[1];

  const up = getSafeValue(map, lastRow - 1, lastColumn);
  const right = getSafeValue(map, lastRow, lastColumn + 1);
  const down = getSafeValue(map, lastRow + 1, lastColumn);
  const left = getSafeValue(map, lastRow, lastColumn - 1);

  if (up == lastHeight + 1) {
    findTrail(map, up, [lastRow - 1, lastColumn]);
  }
  if (right == lastHeight + 1) {
    findTrail(map, right, [lastRow, lastColumn + 1]);
  }
  if (down == lastHeight + 1) {
    findTrail(map, down, [lastRow + 1, lastColumn]);
  }
  if (left == lastHeight + 1) {
    findTrail(map, left, [lastRow, lastColumn - 1]);
  }
  return;

} 

topographicMap.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    if (cell === 0) {
      findTrail(copyMap(topographicMap), 0, [rowIndex, cellIndex]);
    }
  })
})

console.log("trialLevel", trialLevel);