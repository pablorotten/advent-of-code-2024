import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");

const words = input.split("\n").map((line) => line.split(""));

function findRight(x: number, y: number): string {
  return [words?.[y]?.[x + 1], words?.[y]?.[x + 2], words?.[y]?.[x + 3]].join(
    ""
  );
}

function findDown(x: number, y: number): string {
  return [words?.[y + 1]?.[x], words?.[y + 2]?.[x], words?.[y + 3]?.[x]].join(
    ""
  );
}

function findLeft(x: number, y: number): string {
  return [words?.[y]?.[x - 1], words?.[y]?.[x - 2], words?.[y]?.[x - 3]].join(
    ""
  );
}

function findUp(x: number, y: number): string {
  return [words?.[y - 1]?.[x], words?.[y - 2]?.[x], words?.[y - 3]?.[x]].join(
    ""
  );
}

function findRightDown(x: number, y: number): string {
  return [
    words?.[y + 1]?.[x + 1],
    words?.[y + 2]?.[x + 2],
    words?.[y + 3]?.[x + 3],
  ].join("");
}

function findLeftUp(x: number, y: number): string {
  return [
    words?.[y - 1]?.[x - 1],
    words?.[y - 2]?.[x - 2],
    words?.[y - 3]?.[x - 3],
  ].join("");
}

function findRightUp(x: number, y: number): string {
  return [
    words?.[y - 1]?.[x + 1],
    words?.[y - 2]?.[x + 2],
    words?.[y - 3]?.[x + 3],
  ].join("");
}

function findLeftDown(x: number, y: number): string {
  return [
    words?.[y + 1]?.[x - 1],
    words?.[y + 2]?.[x - 2],
    words?.[y + 3]?.[x - 3],
  ].join("");
}

let XMAS = 0;

words.map((line, y) => {
  line.map((word, x) => {
    if (word === "X") {
      if (findRight(x, y) === "MAS") XMAS++;
      if (findDown(x, y) === "MAS") XMAS++;
      if (findLeft(x, y) === "MAS") XMAS++;
      if (findUp(x, y) === "MAS") XMAS++;
      if (findRightDown(x, y) === "MAS") XMAS++;
      if (findLeftUp(x, y) === "MAS") XMAS++;
      if (findRightUp(x, y) === "MAS") XMAS++;
      if (findLeftDown(x, y) === "MAS") XMAS++;
    }
  });
});

console.log(XMAS);
