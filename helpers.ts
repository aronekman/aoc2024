export const inputToListAsync = async (
  day: number,
  filename: string = "input.txt"
): Promise<string[]> => {
  const file = Bun.file(`./day${day > 9 ? day : `0${day}`}/${filename}`);
  const text = await file.text();
  return text.split(/\r?\n/);
};
