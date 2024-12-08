import { inputToListAsync, swapElements } from "../helpers";

const pageOrderingRules = new Map<number, number[]>();
const updatePageNumbers: number[][] = [];
for (const row of await inputToListAsync(5)) {
  const match = row.match(/(\d+)\|(\d+)/);
  if (match) {
    const left = parseInt(match[1]);
    const right = parseInt(match[2]);

    pageOrderingRules.set(left, [
      ...(pageOrderingRules.get(left) || []),
      right,
    ]);
    continue;
  }
  if (row.trim() === "") continue;
  updatePageNumbers.push(row.split(",").map((x) => parseInt(x)));
}
let part1 = 0;
const incorrectUpdates: number[][] = [];
for (const update of updatePageNumbers) {
  let correct = true;
  for (let i = 1; i < update.length; i++) {
    const rules = pageOrderingRules.get(update[i]);
    if (!rules) continue;
    for (const rule of rules) {
      if (update.slice(0, i).includes(rule)) {
        correct = false;
      }
    }
  }
  if (!correct) incorrectUpdates.push(update);
  if (correct) part1 += update[Math.floor(update.length / 2)];
}
console.log("Part 1:", part1);

let part2 = 0;
for (let update of incorrectUpdates) {
  let i = 0;
  while (i < update.length) {
    const rules = pageOrderingRules.get(update[i]);
    if (!rules) {
      i++;
      continue;
    }
    for (const rule of rules) {
      const index = update.slice(0, i).indexOf(rule);
      if (index < 0) continue;
      update = swapElements(update, index, i);
      i = index;
    }
    i++;
  }
  part2 += update[Math.floor(update.length / 2)];
}
console.log("Part 2:", part2);
