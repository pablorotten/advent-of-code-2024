import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");

const conditions: number[][] = input
  .trim()
  .split("\n")
  .map((line) => line.split("|").map(Number))
  .filter((x) => x.length === 2);

const conditionsMap = new Map<number, number[]>();
conditions.forEach(([a, b]) => {
  if (!conditionsMap.has(a)) {
    conditionsMap.set(a, []);
  }
  conditionsMap.get(a).push(b);
});

const updates = input
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number))
  .filter((x) => x.length > 2);

function goesBefore(before: number, after: number): boolean {
  if (conditionsMap.has(after) && conditionsMap.get(after).includes(before)) {
    return false;
  } else {
    return true;
  }
}

const validUpdates = updates
  .filter((line) => line.every((x, i) => goesBefore(x, line[i + 1])))
  .map((line) => line[Math.trunc(line.length / 2)])
  .reduce((acc, x) => acc + x, 0);

console.log(validUpdates);
