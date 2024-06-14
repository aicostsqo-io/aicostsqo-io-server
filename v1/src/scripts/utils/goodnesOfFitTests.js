const { sum: summ } = require('mathjs');

const ALPHA = 0.05;
const CHI_SQUARE_TABLE_0_05 = [
  [1, 3.841],
  [2, 5.991],
  [3, 7.815],
  [4, 9.488],
  [5, 11.07],
  [6, 12.592],
  [7, 14.067],
  [8, 15.507],
  [9, 16.919],
  [10, 18.307],
  [11, 19.675],
  [12, 21.026],
  [13, 22.362],
  [14, 23.685],
  [15, 24.996],
  [16, 26.296],
  [17, 27.587],
  [18, 28.869],
  [19, 30.144],
  [20, 31.41],
  [21, 32.671],
  [22, 33.924],
  [23, 35.172],
  [24, 36.415],
  [25, 37.652],
  [26, 38.885],
  [27, 40.113],
  [28, 41.337],
  [29, 42.557],
  [30, 43.773],
  [40, 55.758],
  [50, 67.505],
  [60, 79.082],
  [70, 90.531],
  [80, 101.879],
  [81, 103.01],
];

// if return false then the null hypothesis is accepted
// if return true then the null hypothesis is rejected
const chiSquareTest = (observed, expected, degressOfFreedom) => {
  // for (let index = 0; index < observed.length; index++) {
  //   const element = observed[index];
  //   expected[index] = { x: element.x, y: element.y * expected[index].y };
  // }
  // let totalExpected = summ(expected.map((p) => p.y));
  expected = expected.map((p) => ({
    x: p.x,
    y: minMaxNormalization(p.y, expected),
  }));
  let sum = 0;
  for (let i = 0; i < observed.length; i++) {
    const expectedValue = expected[i].y;
    // const expectedValue = totalExpected;
    const observedValue = observed[i].y;
    if (expectedValue > 0)
      sum += Math.pow(observedValue - expectedValue, 2) / expectedValue;
  }
  const chiSquareValue = CHI_SQUARE_TABLE_0_05.find(
    (value) => value[0] === degressOfFreedom
  )[1];
  return { result: sum > chiSquareValue, sum, chiSquareValue, expected };
};

const minMaxNormalization = (element, source, newMin = 0, newMax = 1) => {
  const min = Math.min(...source.map((p) => p.y));
  const max = Math.max(...source.map((p) => p.y));
  const res = ((element - min) / (max - min)) * (newMax - newMin) + newMin;
  return res;
};

module.exports = {
  chiSquareTest,
  minMaxNormalization,
};
