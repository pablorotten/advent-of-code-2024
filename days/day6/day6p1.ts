import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const inputMatrix: string[][] = input.split("\n").map((row) => row.split(""));
// const indicesMap = inputMatrix.map((row, i) => row.map((cell, j) => [i, j]));
// console.log(indicesMap.map((row) => JSON.stringify(row)).join("\n"));
const possibleDirections = ["^", "v", "<", ">"];
const initialDirection = "^";

function indexOf(element: string): [number, number][] {
  let tuples: [number, number][] = [];

  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
      if (inputMatrix[i][j] === element) {
        tuples.push([i, j]);
      }
    }
  }

  return tuples;
}

const initialPosition = indexOf(initialDirection)[0];


function nextMove(
  currentPosition: [number, number],
  direction: string
): [number, number, string] {
  const [y, x] = currentPosition;
  switch (direction) {
    case "^":
      if (y < 0) return [-1, -1, "💀"];
      else
        switch (inputMatrix[y - 1][x]) {
          case ".":
            inputMatrix[y - 1][x] = "X";
            return [y - 1, x, direction];
          case "X":
            return [y - 1, x, direction];
          case "#":
            return [y, x, ">"];
        }

    case ">":
      if (x === 129) return [-1, -1, "💀"];
      else
        switch (inputMatrix[y][x + 1]) {
          case ".":
            inputMatrix[y][x + 1] = "X";
            return [y, x + 1, direction];
          case "X":
            return [y, x + 1, direction];
          case "#":
            return [y, x, "v"];
        }

    case "v":
      if (y === 130) return [-1, -1, "💀"];
      else
        switch (inputMatrix[y + 1][x]) {
          case ".":
            inputMatrix[y + 1][x] = "X";
            return [y + 1, x, direction];
          case "X":
            return [y + 1, x, direction];
          case "#":
            return [y, x, "<"];
        }

    case "<":
      if (x < 0) return [-1, -1, "💀"];
      else
        switch (inputMatrix[y][x - 1]) {
          case ".":
            inputMatrix[y][x - 1] = "X";
            return [y, x - 1, direction];
          case "X":
            return [y, x - 1, direction];
          case "#":
            return [y, x, "^"];
        }
  }
}

function countCharacter(matrix: string[][], character: string): number {
  return matrix.reduce(
    (acc, row) => acc + row.filter((cell) => cell === character).length,
    0
  );
}

let currentIndex = initialPosition;
let currentDirection = inputMatrix[currentIndex[0]][currentIndex[1]];
inputMatrix[currentIndex[0]][currentIndex[1]] = "X";


console.log(countCharacter(inputMatrix, "X"));
console.log(countCharacter(inputMatrix, "#"));
console.log("---");

try {
  for (currentDirection; currentDirection !== "💀"; ) {
    const [y, x, direction] = nextMove(currentIndex, currentDirection);
    currentIndex = [y, x];
    currentDirection = direction;
    // console.log(currentIndex, currentDirection);
    // console.log(inputMatrix.map((row) => row.join("")).join("\n"));
    console.log(countCharacter(inputMatrix, "X"));
    // console.log(countCharacter(inputMatrix, "#"));
    console.log("---");
  }
} catch (e) {
  console.log(e);
}
