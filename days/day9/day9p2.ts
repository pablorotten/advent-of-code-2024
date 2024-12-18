import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const disk = [...input];

const diskRepresentation = disk.flatMap((block, index) => {
  switch (index % 2) {
    case 0:
      return Array<string>(Number(block)).fill((index / 2).toString());
    case 1:
      return Array<string>(Number(block)).fill(".");
  }
});

function nextEmpty(list: string[], start: number): number {
  for (let i = start; i < list.length; i++) {
    if (list[i] === ".") {
      return i;
    }
  }
  return -1;
}

function firstEmptyWithSize(
  list: string[],
  start: number,
  size: number
): number {
  for (let next = nextEmpty(list, start); next < list.length; ) {
    if (list.slice(next, next + size).every((data) => data === ".")) {
      return next;
    } else next = nextEmpty(list, next + size);
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

function previousFile(list: string[], start: number): [number, number] {
  const fileEnd = previousData(list, start);
  if (fileEnd === -1) return [-1, -1]; // Return sentinel value when no file is found
  const fileName = list[fileEnd];

  for (let fileStart = fileEnd; fileStart >= 0; fileStart--) {
    if (list[fileStart] !== fileName) {
      return [fileStart + 1, fileEnd];
    }
  }
  return [0, fileEnd]; // Return from start of the list if file starts at index 0
}


for (
  var fileToMoveEnd = diskRepresentation.length - 1,fileToMoveStart = diskRepresentation.length - 2;
  fileToMoveEnd >= 0;
  [fileToMoveStart, fileToMoveEnd] = previousFile(diskRepresentation,fileToMoveEnd)
  
) {
  // we have a file, let's find a place to move it, if so moving it, and go to next file
  const fileSize = fileToMoveEnd + 1 - fileToMoveStart;
  const emptySpaceForFile = firstEmptyWithSize(diskRepresentation, 0, fileSize);
  // console.log(fileToMoveStart, fileToMoveEnd, fileSize, emptySpaceForFile);
  if (emptySpaceForFile != -1 && emptySpaceForFile < fileToMoveStart) {
    diskRepresentation.splice(
      emptySpaceForFile,
      fileSize,
      ...diskRepresentation.slice(fileToMoveStart, fileToMoveEnd + 1)
    );
    diskRepresentation.splice(
      fileToMoveStart,
      fileSize,
      ...Array(fileSize).fill(".")
    );
  }
  fileToMoveEnd = fileToMoveStart - 1;
}

const checkSum = diskRepresentation.reduce((acc, block, index) => {
  if (block === ".") {
    return acc;
  }
  return acc + (index * Number(block));
}, 0);

console.log(checkSum);