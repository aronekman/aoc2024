import { logExecutionTime, readInputFile } from '../helpers';

type Block = {
  count: number;
} & (
  | {
      type: 'FreeSpace';
    }
  | {
      type: 'File';
      index: number;
    }
);

const print = (blocks: Block[]) => {
  console.log(
    blocks.reduce(
      (prev, block) =>
        prev + (block.type === 'FreeSpace' ? '.'.repeat(block.count) : `${block.index}`.repeat(block.count)),
      ''
    )
  );
};

const input = await readInputFile(9);

let startTime = performance.now();
let disk: Block[] = input.split('').map((char, index) => {
  const digit = parseInt(char);
  if (index % 2 === 1) return { count: digit, type: 'FreeSpace' };
  return { count: digit, type: 'File', index: index / 2 };
}, '');

const disk1 = disk.map((block) => ({ ...block }));
const disk2 = disk.map((block) => ({ ...block }));

while (true) {
  const fileIndex = disk1.findLastIndex(({ type }) => type === 'File');
  const file = disk1[fileIndex];
  const spaceIndex = disk1.findIndex(({ type, count }) => type === 'FreeSpace' && count > 0);
  if (spaceIndex > fileIndex) break;
  const space = disk1[spaceIndex];
  const prevFile = disk1[spaceIndex - 1];
  if (file.type !== 'File' || prevFile.type !== 'File' || space.type !== 'FreeSpace') break;
  space.count--;
  file.count--;
  if (file.count === 0) disk1.splice(fileIndex, 1);
  if (space.count === 0) disk1.splice(spaceIndex, 1);
  if (prevFile.index === file.index) {
    prevFile.count++;
  } else {
    disk1.splice(spaceIndex, 0, { count: 1, type: 'File', index: file.index });
  }

  if (disk1.at(-1)?.type === 'FreeSpace') {
    disk1.at(-1)!.count++;
  } else {
    disk1.splice(disk1.length, 0, { type: 'FreeSpace', count: 1 });
  }
  //print(disk1); Debug
}

const checksum = (blocks: Block[]): number => {
  let sum = 0;
  let index = 0;
  for (const block of blocks) {
    if (block.type === 'FreeSpace') {
      index += block.count;
      continue;
    }
    for (let i = 0; i < block.count; i++) {
      sum += (index + i) * block.index;
    }
    index += block.count;
  }
  return sum;
};
const part1 = checksum(disk1);
console.log('Part 1:', part1);

let index = disk2.length;
while (index > 0 && disk2.slice(0, index).find(({ type }) => type === 'FreeSpace')) {
  index--;
  const file = { ...disk2[index] };
  if (file.type === 'FreeSpace') continue;

  const spaceIndex = disk2.findIndex((block) => block.type === 'FreeSpace' && block.count >= file.count);
  if (spaceIndex < 0 || spaceIndex > index) continue;
  const space = disk2[spaceIndex];
  disk2.splice(index, 1, { type: 'FreeSpace', count: file.count });

  if (space.count > file.count) {
    space.count -= file.count;
  } else {
    disk2.splice(spaceIndex, 1);
  }
  disk2.splice(spaceIndex, 0, file);
}
const part2 = checksum(disk2);
console.log('Part 2:', part2);

logExecutionTime(startTime);
