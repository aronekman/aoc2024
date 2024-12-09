import { inputToListAsync, logExecutionTime } from '../helpers';

type Equation = {
  testValue: number;
  numbers: number[];
};
const ALL_OPERATORS_Part_1 = ['ADD', 'MULTIPLY'] as const;
const ALL_OPERATORS_Part_2 = [...ALL_OPERATORS_Part_1, 'CONCATENATION'] as const;
type Operator1 = (typeof ALL_OPERATORS_Part_2)[number];

type Operator = (typeof ALL_OPERATORS_Part_2)[number];
const input = await inputToListAsync(7);
const startTime = performance.now();
const equations: Equation[] = input.map((row) => {
  const [testValue, numbers] = row.split(': ');
  return {
    testValue: parseInt(testValue),
    numbers: numbers.split(' ').map((n) => parseInt(n))
  };
});

const generatePossibleOperatorLists = <T>(length: number, operators: readonly T[]): T[][] => {
  if (length === 1) return operators.map((o) => [o]);
  const combos = generatePossibleOperatorLists(length - 1, operators);
  const newCombos: T[][] = [];
  for (const combo of combos) {
    operators.forEach((operator) => newCombos.push([...combo, operator]));
  }

  return newCombos;
};
const calculate = (x: number, y: number, operator: Operator): number => {
  switch (operator) {
    case 'ADD':
      return x + y;
    case 'MULTIPLY':
      return x * y;
    case 'CONCATENATION':
      return parseInt(`${x}${y}`);
  }
};
const evaluate = <T extends Operator>(
  { numbers, testValue }: Equation,
  operatorList: readonly T[]
): { correct: true; sum: number } | { correct: false } => {
  const operatorCombinations = generatePossibleOperatorLists(numbers.length - 1, operatorList);
  for (const operations of generatePossibleOperatorLists(numbers.length - 1, operatorList)) {
    const sum = operations.reduce((prev, operator, index) => calculate(prev, numbers[index + 1], operator), numbers[0]);
    if (sum === testValue) return { correct: true, sum };
  }
  return { correct: false };
};

const part1 = equations
  .map((v) => evaluate(v, ALL_OPERATORS_Part_1))
  .filter((x) => x.correct)
  .reduce((prev, curr) => prev + curr.sum, 0);
console.log('Part 1:', part1);

const part2 = equations
  .map((v) => evaluate(v, ALL_OPERATORS_Part_2))
  .filter((x) => x.correct)
  .reduce((prev, curr) => prev + curr.sum, 0);
console.log('Part 2:', part2);

logExecutionTime(startTime);
