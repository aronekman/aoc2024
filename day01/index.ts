import { inputToListAsync } from "../helpers";

const input = await inputToListAsync(1);
const left = [];
const right = [];
for (const line of input) {
  const lineSplitted = line.split(/\s+/);
  left.push(parseInt(lineSplitted[0]));
  right.push(parseInt(lineSplitted[1]));
}
left.sort();
right.sort();
let part1 = 0;
for (let i = 0; i < left.length && i < right.length; i++) {
  part1 += Math.abs(left[i] - right[i]);
}
console.log("Part 1:", part1);

const rightMap = new Map<number, number>();
for (const item of right) {
  rightMap.set(item, (rightMap.get(item) || 0) + 1);
}
let part2 = 0;
for (const leftNumber of left) {
  part2 += leftNumber * (rightMap.get(leftNumber) || 0);
}
console.log("Part 2:", part2);
