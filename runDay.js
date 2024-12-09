const path = require('path');

const day = process.argv[2];
if (!day) {
  console.error('Please specify a day to run (e.g., "node runDay.js 1")');
  process.exit(1);
}

try {
  const solve = require(path.join(__dirname, `days/day${day}/index.js`));
  console.log(solve());
} catch (err) {
  console.error(`Error running solution for Day ${day}:`, err.message);
}
