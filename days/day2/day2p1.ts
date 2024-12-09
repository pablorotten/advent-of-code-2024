import * as fs from 'fs';
import * as path from 'path';

// Construct the correct path to input.txt
const filePath = path.join(__dirname, 'input.txt');

// Read the input.txt file
const fileContent: string = fs.readFileSync(filePath, 'utf8');

// Process the file content
const reports: number[][] = fileContent
  .trim()
  .split('\n')
  .map(line => line.split(/\s+/).map(Number));

function evaluateReport(report: number[], previousLevel?: number, sign?: number): boolean {
  // previousLevel = previousLevel || report[0];

  if (report.length === 0) {
    return true;
  } else {
    const [currentLevel, ...levels] = report;
    // previousLevel = previousLevel || level;
    if (previousLevel === undefined) {
      return evaluateReport(levels, currentLevel, undefined);
    } else {
      const evaluation = previousLevel - currentLevel
      sign = sign || Math.sign(evaluation);
      if (
        Math.sign(evaluation) === sign && 
        Math.abs(evaluation) <= 3 && 
        Math.abs(evaluation) > 0
      ) {
        return evaluateReport(levels, currentLevel, sign);
      } else {
        return false;
      }
    }
  }
}

const validReports = reports.filter(report => {
  return evaluateReport(report);
})

console.log(validReports.length);

