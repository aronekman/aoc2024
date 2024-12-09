import { inputToListAsync, isInBoundsOfArea, isInBoundsOfMatrix, logExecutionTime } from '../helpers';

type Cord = {
  x: number;
  y: number;
  char: string;
};

const startTime = performance.now();
const input = await inputToListAsync(8);
const width = input[0].length;
const height = input.length;

const antennas: Cord[] = [];
input.forEach((row, y) =>
  row.split('').forEach((char, x) => {
    if (char !== '.') antennas.push({ x, y, char });
  })
);
const antiNodes = new Set<string>();
for (const antenna of antennas) {
  const otherAntennas = antennas.filter(
    ({ char, x, y }) => char === antenna.char && x !== antenna.x && y !== antenna.y
  );
  for (const other of otherAntennas) {
    const antiNodeX = 2 * antenna.x - other.x;
    const antiNodeY = 2 * antenna.y - other.y;
    if (isInBoundsOfArea(antiNodeX, antiNodeY, width, height)) {
      antiNodes.add(`${antiNodeX},${antiNodeY}`);
    }
  }
}

console.log('Part 1:', antiNodes.size);
logExecutionTime(startTime);

const antiNodes2 = new Set<string>();
for (const antenna of antennas) {
  const otherAntennas = antennas.filter(
    ({ char, x, y }) => char === antenna.char && x !== antenna.x && y !== antenna.y
  );
  if (otherAntennas.length > 0) antiNodes2.add(`${antenna.x},${antenna.y}`);

  for (const other of otherAntennas) {
    const diffX = other.x - antenna.x;
    const diffY = other.y - antenna.y;
    let antiNodeX = antenna.x - diffX;
    let antiNodeY = antenna.y - diffY;
    while (isInBoundsOfArea(antiNodeX, antiNodeY, width, height)) {
      antiNodes2.add(`${antiNodeX},${antiNodeY}`);
      antiNodeX -= diffX;
      antiNodeY -= diffY;
    }
  }
}

console.log('Part 2:', antiNodes2.size);
