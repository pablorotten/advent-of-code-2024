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

const locations1 = new Map<number, number>();
const locations2 = new Map<number, number>();

locations.map(location => {
  locations1.set(location[0], (locations1.get(location[0]) ?? 0) + 1);
  locations2.set(location[1], (locations2.get(location[1]) ?? 0) + 1);
});

const score = Array.from( locations1 ).reduce((acc, [location, occurrences]) => {
  return acc + location * occurrences * (locations2.get(location) ?? 0);
}, 0);

console.log(score);