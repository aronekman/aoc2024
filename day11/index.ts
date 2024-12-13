import { logExecutionTime, readInputFile } from '../helpers';

const input = await readInputFile(11);
const startTime = performance.now();
const stones = input.split(' ').map((num) => parseInt(num));

let stoneCount = new Map<number, number>();
for (const stone of stones) {
  stoneCount.set(stone, (stoneCount.get(stone) || 0) + 1);
}
const blink = (prev: Map<number, number>): Map<number, number> => {
  const newStones = new Map<number, number>();
  for (const [stone, count] of prev.entries()) {
    if (stone === 0) {
      newStones.set(1, (newStones.get(1) || 0) + count);
      continue;
    }
    const stoneAsString = stone.toString();
    const stoneLength = stoneAsString.length;
    if (stoneLength % 2 === 0) {
      const left = parseInt(stoneAsString.slice(0, stoneLength / 2));
      const right = parseInt(stoneAsString.slice(stoneLength / 2));
      newStones.set(left, (newStones.get(left) || 0) + count);
      newStones.set(right, (newStones.get(right) || 0) + count);
      continue;
    }
    const newValue = stone * 2024;
    newStones.set(newValue, (newStones.get(newValue) || 0) + count);
  }

  return newStones;
};

let count = 0;
while (count < 25) {
  stoneCount = blink(stoneCount);
  count++;
}

const getCount = () => {
  return stoneCount.values().reduce((prev, curr) => prev + curr, 0);
};

console.log('Part 1:', getCount());

while (count < 75) {
  stoneCount = blink(stoneCount);
  count++;
}
console.log('Part 2', getCount());

logExecutionTime(startTime);
