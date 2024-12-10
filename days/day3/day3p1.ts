import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const fileContent: string = fs.readFileSync(filePath, "utf8");

// split by 'mul('
const split1: string[] = fileContent.trim().split("mul(");

console.log("split1 ---");
console.log(JSON.stringify(split1));
console.log(JSON.stringify(split1.length));

// split by ',' and take the first two elements. For the second element, get rid of everything after ')'
const factors: number[][] = split1
  .map((line) => line.split(","))
  .filter((line) => line.length >= 2)
  .map((line) => {
    const num1 = Number(line[0]);
    const num2 = Number(line[1].split(")")[0]);
    return [num1, num2];
  })
  .filter(([num1, num2]) => !isNaN(num1) && !isNaN(num2)); // Filter out NaN values

console.log("factors ---");
console.log(JSON.stringify(factors));


console.log("products 1 ---");
const products = factors.map((factor) => {
  console.log(factor[0], factor[1], factor[0] * factor[1]);
  return factor[0] * factor[1];
});


console.log("products 2 ---");
console.log(JSON.stringify(products));
const sum = products.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of products:", sum);