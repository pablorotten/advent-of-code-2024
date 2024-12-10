import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input2.txt");
const fileContent: string = fs.readFileSync(filePath, "utf8");

const regex = /mul\((\d+),\s*(\d+)\)/g;

let match;
const factors: number[][] = [];

while ((match = regex.exec(fileContent)) !== null) {
  const num1 = Number(match[1]);
  const num2 = Number(match[2]);
  factors.push([num1, num2]);
}

console.log("Valid factors:", factors);

// Calculate the products and sum them
const products = factors.map(([num1, num2]) => num1 * num2);
const sum = products.reduce((acc, curr) => acc + curr, 0);

console.log("Sum of products:", sum);
