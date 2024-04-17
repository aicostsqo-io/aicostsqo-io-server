const {
  normal,
  logNormal,
  exponential,
  rayleigh,
} = require('../scripts/utils/distributionFormulas');
const {
  chiSquareTest,
  minMaxNormalization,
} = require('../scripts/utils/goodnesOfFitTests');
const { bulkInsert } = require('./outputVolume.service');

const _context = {
  outputPolyhedrons: require('../models/outputPolyhedron.model'),
  outputMaxQs: require('../models/outputMaxQ.model'),
  outputVolumes: require('../models/outputVolume.model'),
};

const { std, mean } = require('mathjs');

const Sources = {
  VolumeTheoric: 'volumeTheoric',
  VolumeQuarry: 'volumeQuarry',
  TotalVolumeOfMaxQs: 'totalVolumeOfMaxQs',
};

const Charts = {
  Histogram: 'histogram',
  Cdf: 'cdf',
  Pdf: 'pdf',
};

const preprocessData = async (rpId) => {
  const outputPolyhedrons = await _context.outputPolyhedrons
    .find({
      rpId: rpId,
      volumeTheoric: { $gte: 1 },
      volumeQuarry: { $gte: 1 },
    })
    .exec();

  const result = outputPolyhedrons.map(async (polyhedron) => {
    const maxQs = await _context.outputMaxQs.find({
      rpId: rpId,
      polyhedronId: polyhedron.polyhedronId,
      // volumeOfMaxQ: { $gte: 1 }, // TODO: check if this is correct
    });
    const outputVolume = {
      rpId,
      polyhedronId: polyhedron.polyhedronId,
      volumeTheoric: polyhedron.volumeTheoric,
      volumeQuarry: polyhedron.volumeQuarry,
      totalVolumeOfMaxQs: maxQs.reduce(
        (acc, curr) => acc + curr.volumeOfMaxQ,
        0
      ),
    };
    if (outputVolume.totalVolumeOfMaxQs < 1) return null;
    return outputVolume;
  });

  return await Promise.all(result);
};

const createOutputVolumes = async (rpId) => {
  const preprocessedData = (await preprocessData(rpId)).filter((p) => p);
  const insertResult = await bulkInsert(preprocessedData);
  return insertResult;
};

const calculateDistributionCurves = async (
  rpOutputVolumes,
  sourceList,
  chartList
) => {
  const result = {};
  for (let i = 0; i < sourceList.length; i++) {
    const source = sourceList[i];
    Sources[source] = {};
    for (let j = 0; j < chartList.length; j++) {
      const chart = chartList[j];
      Sources[source][chart] = calculateByChart(
        rpOutputVolumes.map((p) => p[source]),
        chart
      );
      if (chart === Charts.Pdf) {
        const normalizedObserved = Sources[source][chart].map((p) => ({
          x: p.x,
          y: minMaxNormalization(p.y, Sources[source][chart]),
        }));
        Sources[source][chart] = {};
        const normal = normalDistribution(normalizedObserved);
        const logNormal = logNormalDistribution(normalizedObserved);
        const exponential = exponentialDistribution(normalizedObserved);
        const rayleigh = rayleighDistribution(normalizedObserved);
        const sortRes = [normal, logNormal, exponential, rayleigh].sort(
          (a, b) => a.chiSquareTestResult.sum - b.chiSquareTestResult.sum
        );
        Sources[source][chart].observed = normalizedObserved;
        Sources[source][chart].expected =
          sortRes[0].chiSquareTestResult.expected;
      }
    }
    result[source] = Sources[source];
  }
  return result;
};

const calculateByChart = (source, chart) => {
  switch (chart) {
    case Charts.Histogram:
      return calculateHistogram(source).map((p) => ({
        x: p.mean,
        y: p.frequency,
        y1: p.cumulativeFrequency,
      }));
    case Charts.Cdf:
      return calculateCdf(source);
    case Charts.Pdf:
      return calculatePdf(source);
  }
};

const normalDistribution = (source) => {
  if (source.length < 1) return { result: [], chiSquareTestResult: { sum: 0 } };
  const stdDev = std(source.map((p) => p.x));
  const meanValue = mean(source.map((p) => p.x));
  const result = source.map((data) => ({
    x: data.x,
    y: normal(data.x, meanValue, stdDev),
  }));
  const chiSquareTestResult = chiSquareTest(source, result, source.length - 1);
  return { result, chiSquareTestResult };
};

const logNormalDistribution = (source) => {
  if (source.length < 1) return { result: [], chiSquareTestResult: { sum: 0 } };
  const stdDev = std(source.map((p) => p.x));
  const meanValue = mean(source.map((p) => p.x));
  const result = source.map((data) => ({
    x: data.x,
    y: logNormal(data.x, meanValue, stdDev),
  }));
  const chiSquareTestResult = chiSquareTest(source, result, source.length - 1);
  return { result, chiSquareTestResult };
};

const exponentialDistribution = (source) => {
  if (source.length < 1) return { result: [], chiSquareTestResult: { sum: 0 } };
  const meanValue = mean(source.map((p) => p.x));
  const result = source.map((data) => ({
    x: data.x,
    y: exponential(data.x, meanValue),
  }));
  const chiSquareTestResult = chiSquareTest(source, result, source.length - 1);
  return { result, chiSquareTestResult };
};

const rayleighDistribution = (source) => {
  if (source.length < 1) return { result: [], chiSquareTestResult: { sum: 0 } };
  const stdDev = std(source.map((p) => p.x));
  const result = source.map((data) => ({
    x: data.x,
    y: rayleigh(data.x, stdDev),
  }));
  const chiSquareTestResult = chiSquareTest(source, result, source.length - 1);
  return { result, chiSquareTestResult };
};

const calculateHistogram = (source) => {
  source = source.sort((a, b) => a - b);
  let numberOfClasses = parseFloat(
      (1 + 3.3 * Math.log10(source.length)).toFixed(3)
    ),
    distributionWidth = parseFloat(source.at(source.length - 1) - source.at(0)),
    classRange = parseFloat(
      ((distributionWidth + 1) / numberOfClasses).toFixed(3)
    );

  const classes = [];
  let min = source[0];
  for (let i = 0; i < numberOfClasses; i++) {
    const limits = {
      lowerBound: min,
      upperBound: min + classRange,
    };
    limits.frequency = source.filter(
      (value) => value >= limits.lowerBound && value < limits.upperBound
    ).length;
    limits.cumulativeFrequency =
      i === 0
        ? limits.frequency
        : classes[i - 1].cumulativeFrequency + limits.frequency;
    limits.mean = (limits.lowerBound + limits.upperBound) / 2;
    classes.push(limits);
    min = limits.upperBound;
  }
  return classes;
};

const calculateCdf = (source) => {
  const histogram = calculateHistogram(source);
  const result = histogram.map((p) => ({
    y: p.cumulativeFrequency,
    x: p.mean,
  }));
  return result;
};

const calculatePdf = (source) => {
  const histogram = calculateHistogram(source);
  const result = histogram.map((p) => ({
    y: p.frequency,
    x: p.mean,
  }));
  return result;
};

module.exports = {
  createOutputVolumes,
  calculateDistributionCurves,
  Sources,
  Charts,
};
