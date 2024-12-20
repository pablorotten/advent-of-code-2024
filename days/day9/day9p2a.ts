import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");

const data = fs
  .readFileSync(filePath, "utf8")
  .toString()
  .trim()
  .replace(/\r/g, "")
  .split("")
  .map(Number);

const unpackedDisk = [];

for (let i = 0; i < data.length; i++) {
  const file = [];
  for (let j = data[i]; j > 0; j--) {
    if (i % 2 === 0) {
      file.push(i / 2);
    } else {
      file.push(".");
    }
  }
  if (file.length) {
    unpackedDisk.push(file);
  }
}

// defrag
const movedIds = [];
outer: for (let i = unpackedDisk.length - 1; i >= 0; i--) {
  if (unpackedDisk[i][0] !== "." && !movedIds.includes(unpackedDisk[i][0])) {
    for (let j = 0; j <= i; j++) {
      if (
        unpackedDisk[j][0] === "." &&
        unpackedDisk[j].length >= unpackedDisk[i].length
      ) {
        if (unpackedDisk[j].length === unpackedDisk[i].length) {
          movedIds.push(unpackedDisk[i][0]);
          let temp = [...unpackedDisk[j]];
          unpackedDisk[j] = unpackedDisk[i];
          unpackedDisk[i] = temp;
          continue outer;
        } else {
          movedIds.push(unpackedDisk[i][0]);
          const temp = [...unpackedDisk[i]];
          unpackedDisk[i].fill(".");
          unpackedDisk.splice(
            j,
            1,
            temp,
            unpackedDisk[j].toSpliced(0, unpackedDisk[i].length)
          );
          i++;
          continue outer;
        }
      }
    }
  }
}

const defraggedDisk = unpackedDisk.flat();

let checksum = 0;

defraggedDisk.forEach((block, id) => {
  if (block !== ".") {
    checksum += block * id;
  }
});

console.log(checksum);
