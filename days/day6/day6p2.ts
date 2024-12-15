import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const originalMatrix: string[][] = input
  .split("\n")
  .map((row) => row.split(""));

function copyMatrix(matrix: string[][]): string[][] {
  return matrix.map((row) => row.slice());
}

function indexOf(element: string, matrix: string[][]): [number, number][] {
  let tuples: [number, number][] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === element) {
        tuples.push([i, j]);
      }
    }
  }

  return tuples;
}

function nextMove(
  position: [number, number],
  direction: string,
  matrix: string[][]
): [number, number, string] {
  const [y, x] = position;
  switch (direction) {
    case "^":
      if (y < 0) return [-1, -1, "💀"];
      else
        switch (matrix[y - 1][x]) {
          case ".":
            matrix[y - 1][x] = "X";
            return [y - 1, x, direction];
          case "X":
            return [y - 1, x, direction];
          case "#":
            return [y, x, ">"];
        }

    case ">":
      if (x === 129) return [-1, -1, "💀"];
      else
        switch (matrix[y][x + 1]) {
          case ".":
            matrix[y][x + 1] = "X";
            return [y, x + 1, direction];
          case "X":
            return [y, x + 1, direction];
          case "#":
            return [y, x, "v"];
        }

    case "v":
      if (y === 130) return [-1, -1, "💀"];
      else
        switch (matrix[y + 1][x]) {
          case ".":
            matrix[y + 1][x] = "X";
            return [y + 1, x, direction];
          case "X":
            return [y + 1, x, direction];
          case "#":
            return [y, x, "<"];
        }

    case "<":
      if (x < 0) return [-1, -1, "💀"];
      else
        switch (matrix[y][x - 1]) {
          case ".":
            matrix[y][x - 1] = "X";
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

const possibleDirections = ["^", "v", "<", ">"];
const initialDirection = "^";
const initialPosition = indexOf(initialDirection, originalMatrix)[0];
let loops = 0;

originalMatrix.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === ".") {
      const newMatrix = copyMatrix(originalMatrix);
      newMatrix[y][x] = "#";
      let currentDirection = initialDirection;
      let currentPosition = initialPosition;
      newMatrix[currentPosition[0]][currentPosition[1]] = "X";
      for (
        let iterations = 0;
        currentDirection !== "💀" && iterations <= 130 * 130 + 1;
        iterations++
      ) {
        try {
          // console.log(newMatrix.map((row) => row.join("")).join("\n"));
          const [y, x, direction] = nextMove(
            currentPosition,
            currentDirection,
            newMatrix
          );
          currentPosition = [y, x];
          currentDirection = direction;
          if (iterations === 130 * 130) {
            loops++;
            console.log("🔁 Total loops:" + loops);
            break;
          }
        } catch (e) {
          console.log("🚪 Patrol finished!!!!");
          break;
        }
      }
    }
  });
});

console.log(loops);
