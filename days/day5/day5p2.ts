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

function goesAfter(after: number, before: number): boolean {
  if (conditionsMap.has(before) && conditionsMap.get(before).includes(after)) {
    return false;
  } else {
    return true;
  }
}

const invalidUpdates = updates
  .filter((line) => line.some((x, i) => !goesBefore(x, line[i + 1])));

invalidUpdates.map((line) => {
  for (let i = 0; i < line.length; i++) {
    if (!goesBefore(line[i], line[i + 1])) {
      const temp = line[i];
      line[i] = line[i + 1];
      line[i + 1] = temp;
      i = 0; // start over
    }
  }

  for (let i = 0; i < line.length; i++) {
    if (!goesAfter(line[i], line[i + 1])) {
      const temp = line[i];
      line[i] = line[i + 1];
      line[i + 1] = temp;
      i = 0; // start over
    }
  }
});

console.log(invalidUpdates);

const fixedUpdates = invalidUpdates
.map((line) => line[Math.trunc(line.length / 2)])
.reduce((acc, x) => acc + x, 0);

console.log(fixedUpdates);
