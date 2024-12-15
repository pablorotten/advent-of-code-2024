import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "input.txt");
const input: string = fs.readFileSync(filePath, "utf8");
const equations = input
  .split("\n")
  .map((row) => row.replace(":", "").split(" "));
const operators = ["+", "*", "|"];

function generateCombinations<T>(elements: T[], n: number): T[][] {
  const result: T[][] = [];

  function helper(current: T[]) {
    // Base case: if the current combination's length matches n, add to results
    if (current.length === n) {
      result.push([...current]);
      return;
    }

    // Recursive case: append each element and recurse
    for (const element of elements) {
      current.push(element);
      helper(current);
      current.pop(); // Backtrack
    }
  }

  helper([]); // Start recursion with an empty array
  return result;
}

let totalCalibrationResult = 0;
equations.map((equation) => {
  // equation -> 3267: 81 40 27
  const [result, ...parameters] = equation.map((term) => Number(term));
  const numberOfOperators = parameters.length - 1;
  // possibleOperators -> [  [ '+', '+', '+' ],  [ '+', '+', '*' ],  [ '+', '*', '+' ], ... ]
  const possibleOperations = generateCombinations(operators, numberOfOperators);
  let currentTotalCalibration = 0;

  // take one operation from possibleOperators -> [  [ '+', '+', '+' ],  [ '+', '+', '*' ],  [ '+', '*', '+' ], ... ]
  for (const operation of possibleOperations) {
    // calculate the result
    const operationResult = operation.reduce((acc, operator, operatorIndex) => {
      switch (operator) {
        case "+":
          if (operatorIndex === 0) return parameters[0] + parameters[1];
          else return acc + parameters[operatorIndex + 1];
        case "*":
          if (operatorIndex === 0) return parameters[0] * parameters[1];
          else return acc * parameters[operatorIndex + 1];
        case "|":
          if (operatorIndex === 0) return Number(`${parameters[0]}${parameters[1]}`);
          else return Number(`${acc}${parameters[operatorIndex + 1]}`);;
      }
    }, 0);

    if (operationResult === result) {
      totalCalibrationResult += operationResult;
      break;
    }
  }
});

console.log(totalCalibrationResult);
