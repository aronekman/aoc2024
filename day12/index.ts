import { inputToListAsync, isInBoundsOfMatrix, logExecutionTime } from '../helpers';

const input = await inputToListAsync(12);
const startTime = performance.now();
const plots = input.map((row) => row.split(''));
const width = plots[0].length;
const visited1 = new Set<string>();

const calculate = (x: number, y: number): number => {
  const key = `${x},${y}`;
  if (visited1.has(key)) return 0;
  visited1.add(key);
  let res = 0;
  if (isInBoundsOfMatrix(x + 1, y, plots) && plots[y][x + 1] === plots[y][x]) {
    res += calculate(x + 1, y);
  } else {
    res += 1;
  }
  if (isInBoundsOfMatrix(x, y + 1, plots) && plots[y + 1][x] === plots[y][x]) {
    res += calculate(x, y + 1);
  } else {
    res += 1;
  }
  if (isInBoundsOfMatrix(x - 1, y, plots) && plots[y][x - 1] === plots[y][x]) {
    res += calculate(x - 1, y);
  } else {
    res += 1;
  }
  if (isInBoundsOfMatrix(x, y - 1, plots) && plots[y - 1][x] === plots[y][x]) {
    res += calculate(x, y - 1);
  } else {
    res += 1;
  }
  return res;
};

let part1 = 0;
plots.forEach((row, y) =>
  row.forEach((plot, x) => {
    const sizeBefore = visited1.size;
    const borders = calculate(x, y);
    const area = visited1.size - sizeBefore;
    if (area === 0) return;
    part1 += area * borders;
  })
);

console.log('Part 1:', part1);

const getAreaSet = (x: number, y: number, visited: Set<string>): Set<string> => {
  const key = `${x},${y}`;
  if (visited.has(key)) return visited;
  visited.add(key);
  if (isInBoundsOfMatrix(x - 1, y, plots) && plots[y][x - 1] === plots[y][x]) {
    visited = getAreaSet(x - 1, y, visited);
  }
  if (isInBoundsOfMatrix(x, y - 1, plots) && plots[y - 1][x] === plots[y][x]) {
    visited = getAreaSet(x, y - 1, visited);
  }
  if (isInBoundsOfMatrix(x + 1, y, plots) && plots[y][x + 1] === plots[y][x]) {
    visited = getAreaSet(x + 1, y, visited);
  }
  if (isInBoundsOfMatrix(x, y + 1, plots) && plots[y + 1][x] === plots[y][x]) {
    visited = getAreaSet(x, y + 1, visited);
  }
  return visited;
};

const globalVisited = new Set<string>();

type Side = {
  x: number;
  y: number;
  dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
};

const getIndex = (x: number, y: number) => y * width + x;
const getIndexInverted = (x: number, y: number) => x * width + y;

let part2 = 0;

plots.forEach((row, y) =>
  row.forEach((plot, x) => {
    if (globalVisited.has(`${x},${y}`)) return;
    const localVisited = getAreaSet(x, y, new Set<string>());
    if (localVisited.size === 0) return;
    localVisited.forEach((key) => globalVisited.add(key));
    const horizontalSides: Side[] = [];
    const verticalSides: Side[] = [];

    localVisited.forEach((key) => {
      const [x, y] = key.split(',').map((x) => parseInt(x));
      if (!localVisited.has(`${x},${y - 1}`)) horizontalSides.push({ x, y, dir: 'UP' });
      if (!localVisited.has(`${x},${y + 1}`)) horizontalSides.push({ x, y: y + 1, dir: 'DOWN' });
      if (!localVisited.has(`${x - 1},${y}`)) verticalSides.push({ x, y, dir: 'LEFT' });
      if (!localVisited.has(`${x + 1},${y}`)) verticalSides.push({ x: x + 1, y, dir: 'RIGHT' });
    });
    horizontalSides.sort((a, b) => getIndex(a.x, a.y) - getIndex(b.x, b.y));
    verticalSides.sort((a, b) => getIndexInverted(a.x, a.y) - getIndexInverted(b.x, b.y));

    const { sum: horizontalSum } = horizontalSides.reduce<Side & { sum: number }>(
      (prev, curr) => {
        let newSum = prev.sum;
        if (prev.y !== curr.y || prev.x + 1 !== curr.x || prev.dir !== curr.dir) newSum++;
        return { sum: newSum, x: curr.x, y: curr.y, dir: curr.dir };
      },
      { sum: 0, x: NaN, y: NaN, dir: 'UP' }
    );
    const { sum: verticalSum } = verticalSides.reduce<Side & { sum: number }>(
      (prev, curr) => {
        let newSum = prev.sum;
        if (prev.x !== curr.x || prev.y + 1 !== curr.y || prev.dir !== curr.dir) newSum++;
        return { sum: newSum, x: curr.x, y: curr.y, dir: curr.dir };
      },
      { sum: 0, x: NaN, y: NaN, dir: 'LEFT' }
    );
    part2 += localVisited.size * (horizontalSum + verticalSum);
  })
);

console.log('Part 2:', part2);

logExecutionTime(startTime);
