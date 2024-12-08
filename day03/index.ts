import { readInputFile } from "../helpers";

type Instruction =
  | {
      type: "do";
    }
  | { type: "dont" }
  | {
      type: "multiply";
      left: number;
      right: number;
    };

const mapToInstruction = (match: RegExpExecArray): Instruction => {
  if (match[0] === "do()") return { type: "do" };
  if (match[0] === "don't()") return { type: "dont" };
  return {
    type: "multiply",
    left: parseInt(match[1]),
    right: parseInt(match[2]),
  };
};

const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
const input = await readInputFile(3);
const instructions: Instruction[] = [...input.matchAll(regex)].map(
  mapToInstruction
);
const part1 = instructions.reduce(
  (prev, mul) => prev + (mul.type === "multiply" ? mul.left * mul.right : 0),
  0
);
console.log("Part 1:", part1);
let enabled = true;
let part2 = 0;
for (const instruction of instructions) {
  if (instruction.type === "do") {
    enabled = true;
    continue;
  }
  if (instruction.type === "dont") {
    enabled = false;
    continue;
  }
  if (enabled) {
    part2 += instruction.left * instruction.right;
  }
}

console.log("Part 2:", part2);
