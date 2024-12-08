import { inputToListAsync, removeElementAtIndex } from "../helpers";

const isSafe = (report: number[]): boolean => {
  const increasing = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (
      (increasing && (diff > 3 || diff < 1)) ||
      (!increasing && (diff < -3 || diff > -1))
    ) {
      return false;
    }
  }
  return true;
};

const input = await inputToListAsync(2);
const reports = input.map((line) => line.split(" ").map((x) => parseInt(x)));
const part1 = reports.reduce(
  (prev, report) => prev + (isSafe(report) ? 1 : 0),
  0
);
console.log("Part 1:", part1);

let part2 = 0;
for (const report of reports) {
  if (isSafe(report)) {
    part2++;
    continue;
  }
  for (let i = 0; i < report.length; i++) {
    if (isSafe(removeElementAtIndex(report, i))) {
      part2++;
      break;
    }
  }
}

console.log("Part 2:", part2);
