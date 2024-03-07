const { log, e } = require('mathjs');

const normal = (x, mean, stdDev) =>
  (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
  Math.pow(Math.E, -(Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))));

const logNormal = (x, mean, stdDev) =>
  x === 0
    ? 0
    : (1 / (x * stdDev * Math.sqrt(2 * Math.PI))) *
      Math.pow(
        Math.E,
        -(Math.pow(log(x, e) - mean, 2) / (2 * Math.pow(stdDev, 2)))
      );

const exponential = (x, mean) =>
  x < 0 ? 0 : (1 / mean) * Math.pow(Math.E, -(x / mean));

const gamma = (x, alpha, beta) =>
  (Math.pow(beta, alpha) / gamma(alpha)) *
  Math.pow(x, alpha - 1) *
  Math.pow(Math.E, -beta * x);

const uniform = (x, a, b) => (x < a || x > b ? 0 : 1 / (b - a));

const rayleigh = (x, stdDev) =>
  (x / Math.pow(stdDev, 2)) *
  Math.pow(Math.E, -Math.pow(x, 2) / (2 * Math.pow(stdDev, 2)));

module.exports = {
  normal,
  logNormal,
  exponential,
  gamma,
  uniform,
  rayleigh,
};
