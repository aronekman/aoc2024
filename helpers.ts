import chalk from 'chalk';

export const inputToListAsync = async (day: number, filename: string = 'input.txt'): Promise<string[]> => {
  const file = Bun.file(`./day${day > 9 ? day : `0${day}`}/${filename}`);
  const text = await file.text();
  return text.split(/\r?\n/);
};

export const readInputFile = async (day: number, filename: string = 'input.txt'): Promise<string> => {
  const file = Bun.file(`./day${day > 9 ? day : `0${day}`}/${filename}`);
  const text = await file.text();
  return text.trim();
};

export const removeElementAtIndex = <T>(arr: T[], index: number): T[] => arr.filter((_, i) => i !== index);

export const swapElements = <T>(arr: T[], index1: number, index2: number): T[] => {
  const newArray = [...arr];

  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

  return newArray;
};

export const copyGrid = <T>(grid: T[][]): T[][] => [...grid.map((row) => [...row])];

export const isInBoundsOfMatrix = <T>(x: number, y: number, matrix: T[][]) =>
  x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length;

export const isInBoundsOfArea = <T>(x: number, y: number, width: number, height: number) =>
  x >= 0 && y >= 0 && x < width && y < height;

export const logExecutionTime = (startTime: number) => {
  const timeDiffInSeconds = (performance.now() - startTime) / 1000;
  console.log(chalk.yellow.bold(`🔥 Execution Time: ${timeDiffInSeconds.toFixed(2)} seconds`));
};
