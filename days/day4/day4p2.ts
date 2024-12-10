import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");

const words = input.split("\n").map((line) => line.split(""));

function findLeftUpRightDown(x: number, y: number): string {
  return [words?.[y - 1]?.[x - 1], words?.[y + 1]?.[x + 1]].join("");
}

function findLeftDownRightUp(x: number, y: number): string {
  return [words?.[y + 1]?.[x - 1], words?.[y - 1]?.[x + 1]].join("");
}

let XMAS = 0;

words.map((line, y) => {
  line.map((word, x) => {
    if (word === "A") {
      const lurd = findLeftUpRightDown(x, y);
      const ldru = findLeftDownRightUp(x, y);
      if (
        lurd.includes("M") &&
        lurd.includes("S") &&
        ldru.includes("M") &&
        ldru.includes("S")
      )
        XMAS++;
    }
  });
});

console.log(XMAS);
