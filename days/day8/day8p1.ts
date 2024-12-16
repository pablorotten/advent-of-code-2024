import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const inputMap = input.split("\n").map((row) => row.split(""));
const antinodesMap = input.split("\n").map((row) => Array<string>(row.length).fill("."));
const mapYSize = inputMap.length;
const mapXSize = inputMap[0].length;

console.log(antinodesMap.length, antinodesMap[0].length);

function findAntennas(map: string[][]) {
  let antennasMap = new Map<string, [number,number][]>();

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== ".") {
        if (!antennasMap.has(cell)) {
          antennasMap.set(cell, [[y, x]]);
        }
        else {
          antennasMap.get(cell).push([y, x]);
        }
      }
    });
  });

  return antennasMap;
}

function calculateAntinodes(antenna1: [number, number], antenna2: [number, number]): number[][] {
  const vector = [antenna2[0] - antenna1[0], antenna2[1] - antenna1[1]];
  const antinodes: number[][] = [
    [antenna1[0] - vector[0], antenna1[1] - vector[1]],
    [antenna2[0] + vector[0], antenna2[1] + vector[1]]
  ];

  return antinodes;
}


function calculateFrecuencies<T>(antennas: T[], size: number): T[][] {
  const antinodes: T[][] = [];

  function helper(start: number, current: T[]) {
    // Base case: if the current combination's length matches n, add to results
    if (current.length === size) {
      antinodes.push([...current]);
      return;
    }

    // Recursive case: append each element and recurse
    for (let i = start; i < antennas.length; i++) {
      current.push(antennas[i]);
      helper(i + 1, current);
      current.pop(); // Backtrack
    }
  }

  helper(0, []); // Start recursion with an empty array
  return antinodes;
}

function countAntinodes(antinodes: string[][]): number {
  return antinodes.flatMap(row => row).filter(cell => cell === "#").length;
}
const antennasMap = findAntennas(inputMap);

antennasMap.forEach((antennas, key) => {
  const frecuencies = calculateFrecuencies(antennas, 2)
  const antinodes = frecuencies.map((frecuency) => calculateAntinodes(frecuency[0], frecuency[1]));
  antinodes.forEach((antinode) => {
    antinode.forEach((node) => {
      console.log(node);

      if(node[0] < 0 || node[1] < 0 || node[0] >= mapYSize || node[1] >= mapXSize ) return;
      else antinodesMap[node[0]][node[1]] = "#";
    });
  });
});

console.log(antinodesMap.map((row) => row.join("")).join("\n"));
console.log(countAntinodes(antinodesMap));