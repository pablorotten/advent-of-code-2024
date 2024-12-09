import * as fs from 'fs';
import * as path from 'path';

// Construct the correct path to input.txt
const filePath = path.join(__dirname, 'input.txt');

// Read the input.txt file
const fileContent: string = fs.readFileSync(filePath, 'utf8');

// Process the file content
const dataArray: number[][] = fileContent
  .trim()
  .split('\n')
  .map(line => line.split(/\s+/).map(Number));

console.log(dataArray);