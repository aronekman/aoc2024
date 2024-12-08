import { inputToListAsync } from "../helpers";

const input = await inputToListAsync(4);
const puzzle = input.map((row) => row.split(""));

type Cord = {
  x: number;
  y: number;
};

const getRight = ({ x, y }: Cord) =>
  puzzle[y][x] + puzzle[y][x + 1] + puzzle[y][x + 2] + puzzle[y][x + 3];
const getLeft = ({ x, y }: Cord) =>
  puzzle[y][x] + puzzle[y][x - 1] + puzzle[y][x - 2] + puzzle[y][x - 3];
const getDown = ({ x, y }: Cord) =>
  puzzle.length > y + 3 &&
  puzzle[y][x] + puzzle[y + 1][x] + puzzle[y + 2][x] + puzzle[y + 3][x];
const getUp = ({ x, y }: Cord) =>
  y > 2 &&
  puzzle[y][x] + puzzle[y - 1][x] + puzzle[y - 2][x] + puzzle[y - 3][x];
const getUpLeft = ({ x, y }: Cord) =>
  y > 2 &&
  puzzle[y][x] +
    puzzle[y - 1][x - 1] +
    puzzle[y - 2][x - 2] +
    puzzle[y - 3][x - 3];
const getUpRight = ({ x, y }: Cord) =>
  y > 2 &&
  puzzle[y][x] +
    puzzle[y - 1][x + 1] +
    puzzle[y - 2][x + 2] +
    puzzle[y - 3][x + 3];
const getDownLeft = ({ x, y }: Cord) =>
  puzzle.length > y + 3 &&
  puzzle[y][x] +
    puzzle[y + 1][x - 1] +
    puzzle[y + 2][x - 2] +
    puzzle[y + 3][x - 3];
const getDownRight = ({ x, y }: Cord) =>
  puzzle.length > y + 3 &&
  puzzle[y][x] +
    puzzle[y + 1][x + 1] +
    puzzle[y + 2][x + 2] +
    puzzle[y + 3][x + 3];
let part1 = 0;
for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < puzzle[0].length; x++) {
    if (puzzle[y][x] !== "X") continue;
    if (getRight({ x, y }) === "XMAS") part1++;
    if (getLeft({ x, y }) === "XMAS") part1++;
    if (getDown({ x, y }) === "XMAS") part1++;
    if (getUp({ x, y }) === "XMAS") part1++;
    if (getUpLeft({ x, y }) === "XMAS") part1++;
    if (getUpRight({ x, y }) === "XMAS") part1++;
    if (getDownLeft({ x, y }) === "XMAS") part1++;
    if (getDownRight({ x, y }) === "XMAS") part1++;
  }
}

console.log("Part 1:", part1);
let part2 = 0;
for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < puzzle[0].length; x++) {
    if (puzzle[y][x] !== "A") continue;
    if (y < 1 || y >= puzzle.length - 1 || x < 1 || x >= puzzle[y].length - 1)
      continue;
    const upLeft = puzzle[y - 1][x - 1];
    const upRight = puzzle[y - 1][x + 1];
    const downLeft = puzzle[y + 1][x - 1];
    const downRight = puzzle[y + 1][x + 1];
    if (
      ((upLeft === "M" && downRight === "S") ||
        (upLeft === "S" && downRight === "M")) &&
      ((upRight === "M" && downLeft === "S") ||
        (upRight === "S" && downLeft === "M"))
    ) {
      part2++;
    }
  }
}
console.log("Part 2:", part2);
