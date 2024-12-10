import { inputToListAsync, isInBoundsOfArea, isInBoundsOfMatrix, logExecutionTime } from '../helpers';

const input = await inputToListAsync(10);
const startTime = performance.now();
const heights = input.map((row) => row.split('').map((h) => (h === '.' ? null : parseInt(h))));

const findTops = (x: number, y: number, prev: number): Set<string> | null => {
  if (!isInBoundsOfMatrix(x, y, heights)) return null;
  const current = heights[y][x];
  if (current === null || current !== prev + 1) return null;
  if (current === 9) return new Set([`${x},${y}`]);
  const set = new Set<string>();

  findTops(x, y - 1, current)?.forEach((v) => set.add(v));
  findTops(x, y + 1, current)?.forEach((v) => set.add(v));
  findTops(x - 1, y, current)?.forEach((v) => set.add(v));
  findTops(x + 1, y, current)?.forEach((v) => set.add(v));

  return set;
};

let part1 = 0;
heights.forEach((row, y) =>
  row.forEach((height, x) => {
    if (height === 0) {
      part1 += findTops(x, y, -1)?.size || 0;
    }
  })
);

console.log('Part 1:', part1);

const findTops2 = (x: number, y: number, prev: number): number => {
  if (!isInBoundsOfMatrix(x, y, heights)) return 0;
  const current = heights[y][x];
  if (current === null || current !== prev + 1) return 0;
  if (current === 9) return 1;

  return (
    findTops2(x, y - 1, current) +
    findTops2(x, y + 1, current) +
    findTops2(x - 1, y, current) +
    findTops2(x + 1, y, current)
  );
};
let part2 = 0;
heights.forEach((row, y) =>
  row.forEach((height, x) => {
    if (height === 0) {
      part2 += findTops2(x, y, -1);
    }
  })
);
console.log('Part 2:', part2);
logExecutionTime(startTime);
