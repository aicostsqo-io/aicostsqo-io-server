const { chi2inv } = require('./chi-square-dist');

const ALPHA = 0.05;

// if return false then the null hypothesis is accepted
// if return true then the null hypothesis is rejected
const chiSquareTest = (observed, expected, degressOfFreedom) => {
  expected = expected.map((p) => ({
    x: p.x,
    y: minMaxNormalization(p.y, expected),
  }));
  let sum = 0;
  for (let i = 0; i < observed.length; i++) {
    const expectedValue = expected[i].y;
    const observedValue = observed[i].y;
    if (expectedValue > 0)
      sum += Math.pow(observedValue - expectedValue, 2) / expectedValue;
  }
  const chiSquareValue = chi2inv(ALPHA, degressOfFreedom);
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
