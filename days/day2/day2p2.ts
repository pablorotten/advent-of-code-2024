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

function evaluateReport(report: number[], previousLevel?: number, sign?: number): [boolean, number?] {
  // previousLevel = previousLevel || report[0];

  if (report.length === 0) {
    return [true, undefined];
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
        return [false, levels.length];
      }
    }
  }
}

const validReports = reports.filter(report => {
  const firstEvaluation = evaluateReport(report);
  if (firstEvaluation[0]) {
    return true;
  } else {
    const indexToRemove = report.length - (firstEvaluation[1] ?? 0);
    // arr.filter((_, i) => i !== indexToRemove);

    const newReport1 = report.filter((_, i) => i !== indexToRemove - 1);
    const newReport2 = report.filter((_, i) => i !== indexToRemove - 2);
    const newReport3 = report.filter((_, i) => i !== 0);
    const isValid = evaluateReport(newReport1)[0] || evaluateReport(newReport2)[0] || evaluateReport(newReport3)[0];

    if(!isValid) {
      console.log("--------------------");
      console.log(JSON.stringify(report));
      console.log(JSON.stringify(newReport1));
      console.log(JSON.stringify(newReport2));
      console.log(JSON.stringify(newReport3));
    }
    return isValid
  }
});

console.log(validReports.length);

