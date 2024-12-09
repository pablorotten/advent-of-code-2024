const fs = require('fs');
const path = require('path');

function solve() {
  // const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Your solution logic here
  return `Solution for Day 1: ${input.length}`;
}

if (require.main === module) {
  console.log(solve());
}

module.exports = solve;
