import * as fs from 'fs';
import * as path from 'path';

// Construct the correct path to input.txt
const filePath = path.join(__dirname, 'input.txt');

// Read the input.txt file
const fileContent: string = fs.readFileSync(filePath, 'utf8');

// Process the file content
const locations: number[][] = fileContent
  .trim()
  .split('\n')
  .map(line => line.split(/\s+/).map(Number));

let locations1: number[] = [];
let locations2: number[] = [];

locations.map(location => {
  locations1.push(location[0]);
  locations2.push(location[1]);
});

locations1.sort();
locations2.sort();

const locationsDiff = locations1.map((location, index) => {
  return Math.abs(locations1[index] - locations2[index]);
});

const totalLocationsDiff = locationsDiff.reduce((acc, curr) => acc + curr, 0);

console.log(totalLocationsDiff);