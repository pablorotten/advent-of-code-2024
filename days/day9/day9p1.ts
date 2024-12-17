import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const disk = [...input];
// console.log(input);

const diskRepresentation = disk.flatMap((block, index) => {
  switch (index % 2) {
    case 0:
      return Array<string>(Number(block)).fill((index / 2).toString());
    case 1:
      return Array<string>(Number(block)).fill(".");
  }
});

console.log(diskRepresentation.join(""));

function nextEmpty(list: string[], start: number): number {
  for (let i = start; i < list.length; i++) {
    if (list[i] === ".") {
      return i;
    }
  }
  return -1;
}

function previousData(list: string[], start: number): number {
  for (let i = start; i >= 0; i--) {
    if (list[i] !== ".") {
      return i;
    }
  }
  return -1;
}

for (
  let start = 0, end = diskRepresentation.length - 1;
  start < end;
  start = nextEmpty(diskRepresentation, start),
    end = previousData(diskRepresentation, end)
) {
  if (diskRepresentation[start] === "." && diskRepresentation[end] !== ".") {
    diskRepresentation[start] = diskRepresentation[end];
    diskRepresentation[end] = ".";
  }
}

// console.log(diskRepresentation.join(""));

const checkSum = diskRepresentation.reduce((acc, block, index) => {
  if (block === ".") {
    return acc;
  }
  return acc + (index * Number(block));
}, 0);

console.log(checkSum);
