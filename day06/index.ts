import {
  inputToListAsync,
  isInBoundsOfMatrix,
  logExecutionTime,
} from "../helpers";

type Cord = { x: number; y: number };
const input = await inputToListAsync(6);

let startPos: Cord = { x: 0, y: 0 };
const startDir: Cord = { x: 0, y: -1 };
const grid = input.map((row, y) =>
  row.split("").map((char, x) => {
    if (char === "^") {
      startPos = { x, y };
    }
    return char;
  })
);

const nextDir = ({ x, y }: Cord): Cord => {
  if (Math.abs(x) > 0) {
    return { x: 0, y: x };
  }
  return { x: -y, y: 0 };
};

const simulate = (): {
  visited: Set<string>;
  loopDetected: boolean;
  exited: boolean;
} => {
  let pos = { ...startPos };
  let dir = { ...startDir };
  const visited = new Set<string>();
  const visitedWithDir = new Set<string>();
  visited.add(`${pos.x},${pos.y}`);
  while (true) {
    const nextX = pos.x + dir.x;
    const nextY = pos.y + dir.y;
    if (!isInBoundsOfMatrix(nextX, nextY, grid)) {
      return { visited, loopDetected: false, exited: true };
    }

    if (visitedWithDir.has(`${pos.x},${pos.y},${dir.x},${dir.y}`)) {
      return { visited, loopDetected: true, exited: false };
    }
    visitedWithDir.add(`${pos.x},${pos.y},${dir.x},${dir.y}`);

    if (grid[nextY][nextX] === "#") {
      dir = nextDir(dir);
    } else {
      pos.x = nextX;
      pos.y = nextY;
      visited.add(`${pos.x},${pos.y}`);
    }
  }
};

const startTime = performance.now();
const part1 = simulate().visited.size;

console.log("Part 1:", part1);

let part2 = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "#" || grid[y][x] === "^") continue;
    grid[y][x] = "#";

    if (simulate().loopDetected) {
      part2++;
    }
    grid[y][x] = ".";
  }
}

console.log("Part 2:", part2);
logExecutionTime(startTime);
