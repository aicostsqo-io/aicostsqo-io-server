const { bulkInsert } = require('./outputVolume.service');

const _context = {
  outputPolyhedrons: require('../models/outputPolyhedron.model'),
  outputMaxQs: require('../models/outputMaxQ.model'),
  outputVolumes: require('../models/outputVolume.model'),
};

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
      volumeOfMaxQ: { $gte: 1 }, // TODO: check if this is correct
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

// const Mongoose = require('mongoose');
// const rpIdObject = new Mongoose.Types.ObjectId(rpId);
// await _context.outputVolumes.insertMany(
//   silifke.map((p) => ({ ...p, rpId: rpIdObject }))
// );

const silifke = [
  {
    polyhedronId: '1',
    volumeTheoric: '10.04618638',
    volumeQuarry: '1.004618638',
    totalVolumeOfMaxQs: '5.023093192',
  },
  {
    polyhedronId: '2',
    volumeTheoric: '10.2221423',
    volumeQuarry: '1.02221423',
    totalVolumeOfMaxQs: '5.111071152',
  },
  {
    polyhedronId: '3',
    volumeTheoric: '10.24211815',
    volumeQuarry: '1.024211815',
    totalVolumeOfMaxQs: '5.121059074',
  },
  {
    polyhedronId: '4',
    volumeTheoric: '10.31883513',
    volumeQuarry: '1.031883513',
    totalVolumeOfMaxQs: '5.159417567',
  },
  {
    polyhedronId: '5',
    volumeTheoric: '10.32102069',
    volumeQuarry: '1.032102069',
    totalVolumeOfMaxQs: '5.160510345',
  },
  {
    polyhedronId: '6',
    volumeTheoric: '10.36001138',
    volumeQuarry: '1.036001138',
    totalVolumeOfMaxQs: '5.18000569',
  },
  {
    polyhedronId: '7',
    volumeTheoric: '10.36001138',
    volumeQuarry: '1.036001138',
    totalVolumeOfMaxQs: '5.18000569',
  },
  {
    polyhedronId: '8',
    volumeTheoric: '10.65228958',
    volumeQuarry: '1.065228958',
    totalVolumeOfMaxQs: '5.32614479',
  },
  {
    polyhedronId: '9',
    volumeTheoric: '10.71039783',
    volumeQuarry: '1.071039783',
    totalVolumeOfMaxQs: '5.355198917',
  },
  {
    polyhedronId: '10',
    volumeTheoric: '10.77783086',
    volumeQuarry: '1.077783086',
    totalVolumeOfMaxQs: '5.388915428',
  },
  {
    polyhedronId: '11',
    volumeTheoric: '10.82147352',
    volumeQuarry: '1.082147352',
    totalVolumeOfMaxQs: '5.410736758',
  },
  {
    polyhedronId: '12',
    volumeTheoric: '10.82231763',
    volumeQuarry: '1.082231763',
    totalVolumeOfMaxQs: '5.411158813',
  },
  {
    polyhedronId: '13',
    volumeTheoric: '10.82231763',
    volumeQuarry: '1.082231763',
    totalVolumeOfMaxQs: '5.411158813',
  },
  {
    polyhedronId: '14',
    volumeTheoric: '10.84202153',
    volumeQuarry: '1.084202153',
    totalVolumeOfMaxQs: '5.421010767',
  },
  {
    polyhedronId: '15',
    volumeTheoric: '10.98003973',
    volumeQuarry: '1.098003973',
    totalVolumeOfMaxQs: '5.490019863',
  },
  {
    polyhedronId: '16',
    volumeTheoric: '11.38503733',
    volumeQuarry: '1.138503733',
    totalVolumeOfMaxQs: '5.692518667',
  },
  {
    polyhedronId: '17',
    volumeTheoric: '11.86341349',
    volumeQuarry: '1.186341349',
    totalVolumeOfMaxQs: '5.931706746',
  },
  {
    polyhedronId: '18',
    volumeTheoric: '12.00999395',
    volumeQuarry: '1.200999395',
    totalVolumeOfMaxQs: '6.004996973',
  },
  {
    polyhedronId: '19',
    volumeTheoric: '12.39895679',
    volumeQuarry: '1.239895679',
    totalVolumeOfMaxQs: '6.199478393',
  },
  {
    polyhedronId: '20',
    volumeTheoric: '12.55418947',
    volumeQuarry: '1.255418947',
    totalVolumeOfMaxQs: '6.277094734',
  },
  {
    polyhedronId: '21',
    volumeTheoric: '12.55418947',
    volumeQuarry: '1.255418947',
    totalVolumeOfMaxQs: '6.277094734',
  },
  {
    polyhedronId: '22',
    volumeTheoric: '12.59749639',
    volumeQuarry: '1.259749639',
    totalVolumeOfMaxQs: '6.298748194',
  },
  {
    polyhedronId: '23',
    volumeTheoric: '12.59749639',
    volumeQuarry: '1.259749639',
    totalVolumeOfMaxQs: '6.298748194',
  },
  {
    polyhedronId: '24',
    volumeTheoric: '12.81262245',
    volumeQuarry: '1.281262245',
    totalVolumeOfMaxQs: '6.406311226',
  },
  {
    polyhedronId: '25',
    volumeTheoric: '12.90441729',
    volumeQuarry: '1.290441729',
    totalVolumeOfMaxQs: '6.452208645',
  },
  {
    polyhedronId: '26',
    volumeTheoric: '12.93427551',
    volumeQuarry: '1.293427551',
    totalVolumeOfMaxQs: '6.467137756',
  },
  {
    polyhedronId: '27',
    volumeTheoric: '13.13914973',
    volumeQuarry: '1.313914973',
    totalVolumeOfMaxQs: '6.569574863',
  },
  {
    polyhedronId: '28',
    volumeTheoric: '13.33022703',
    volumeQuarry: '1.333022703',
    totalVolumeOfMaxQs: '6.665113516',
  },
  {
    polyhedronId: '29',
    volumeTheoric: '13.35562044',
    volumeQuarry: '1.335562044',
    totalVolumeOfMaxQs: '6.677810219',
  },
  {
    polyhedronId: '30',
    volumeTheoric: '13.45585564',
    volumeQuarry: '1.345585564',
    totalVolumeOfMaxQs: '6.72792782',
  },
  {
    polyhedronId: '31',
    volumeTheoric: '13.45585564',
    volumeQuarry: '1.345585564',
    totalVolumeOfMaxQs: '6.72792782',
  },
  {
    polyhedronId: '32',
    volumeTheoric: '13.58137113',
    volumeQuarry: '1.358137113',
    totalVolumeOfMaxQs: '6.790685564',
  },
  {
    polyhedronId: '33',
    volumeTheoric: '13.70116797',
    volumeQuarry: '1.370116797',
    totalVolumeOfMaxQs: '6.850583984',
  },
  {
    polyhedronId: '34',
    volumeTheoric: '14.22231011',
    volumeQuarry: '1.422231011',
    totalVolumeOfMaxQs: '7.111155056',
  },
  {
    polyhedronId: '35',
    volumeTheoric: '14.52985413',
    volumeQuarry: '1.452985413',
    totalVolumeOfMaxQs: '7.264927066',
  },
  {
    polyhedronId: '36',
    volumeTheoric: '14.58382653',
    volumeQuarry: '1.458382653',
    totalVolumeOfMaxQs: '7.291913266',
  },
  {
    polyhedronId: '37',
    volumeTheoric: '14.5958529',
    volumeQuarry: '1.45958529',
    totalVolumeOfMaxQs: '7.297926449',
  },
  {
    polyhedronId: '38',
    volumeTheoric: '14.75733569',
    volumeQuarry: '1.475733569',
    totalVolumeOfMaxQs: '7.378667847',
  },
  {
    polyhedronId: '39',
    volumeTheoric: '14.85838326',
    volumeQuarry: '1.485838326',
    totalVolumeOfMaxQs: '7.429191631',
  },
  {
    polyhedronId: '40',
    volumeTheoric: '14.97440503',
    volumeQuarry: '1.497440503',
    totalVolumeOfMaxQs: '7.487202514',
  },
  {
    polyhedronId: '41',
    volumeTheoric: '15.38604305',
    volumeQuarry: '1.538604305',
    totalVolumeOfMaxQs: '7.693021525',
  },
  {
    polyhedronId: '42',
    volumeTheoric: '15.55293127',
    volumeQuarry: '1.555293127',
    totalVolumeOfMaxQs: '7.776465637',
  },
  {
    polyhedronId: '43',
    volumeTheoric: '15.56809652',
    volumeQuarry: '1.556809652',
    totalVolumeOfMaxQs: '7.784048259',
  },
  {
    polyhedronId: '44',
    volumeTheoric: '15.96468744',
    volumeQuarry: '1.596468744',
    totalVolumeOfMaxQs: '7.982343719',
  },
  {
    polyhedronId: '45',
    volumeTheoric: '16.28551749',
    volumeQuarry: '1.628551749',
    totalVolumeOfMaxQs: '8.142758744',
  },
  {
    polyhedronId: '46',
    volumeTheoric: '16.28551749',
    volumeQuarry: '1.628551749',
    totalVolumeOfMaxQs: '8.142758744',
  },
  {
    polyhedronId: '47',
    volumeTheoric: '16.87137514',
    volumeQuarry: '1.687137514',
    totalVolumeOfMaxQs: '8.435687569',
  },
  {
    polyhedronId: '48',
    volumeTheoric: '17.41727687',
    volumeQuarry: '1.741727687',
    totalVolumeOfMaxQs: '8.708638436',
  },
  {
    polyhedronId: '49',
    volumeTheoric: '17.55685091',
    volumeQuarry: '1.755685091',
    totalVolumeOfMaxQs: '8.778425454',
  },
  {
    polyhedronId: '50',
    volumeTheoric: '18.08264853',
    volumeQuarry: '1.808264853',
    totalVolumeOfMaxQs: '9.041324265',
  },
  {
    polyhedronId: '51',
    volumeTheoric: '18.2722511',
    volumeQuarry: '1.82722511',
    totalVolumeOfMaxQs: '9.136125548',
  },
  {
    polyhedronId: '52',
    volumeTheoric: '18.41135918',
    volumeQuarry: '1.841135918',
    totalVolumeOfMaxQs: '9.20567959',
  },
  {
    polyhedronId: '53',
    volumeTheoric: '19.13100011',
    volumeQuarry: '1.913100011',
    totalVolumeOfMaxQs: '9.565500054',
  },
  {
    polyhedronId: '54',
    volumeTheoric: '19.97856428',
    volumeQuarry: '1.997856428',
    totalVolumeOfMaxQs: '9.989282139',
  },
  {
    polyhedronId: '55',
    volumeTheoric: '20.02629203',
    volumeQuarry: '2.002629203',
    totalVolumeOfMaxQs: '10.01314601',
  },
  {
    polyhedronId: '56',
    volumeTheoric: '20.39345922',
    volumeQuarry: '2.039345922',
    totalVolumeOfMaxQs: '10.19672961',
  },
  {
    polyhedronId: '57',
    volumeTheoric: '20.63673303',
    volumeQuarry: '2.063673303',
    totalVolumeOfMaxQs: '10.31836651',
  },
  {
    polyhedronId: '58',
    volumeTheoric: '21.67293708',
    volumeQuarry: '2.167293708',
    totalVolumeOfMaxQs: '10.83646854',
  },
  {
    polyhedronId: '59',
    volumeTheoric: '21.98908792',
    volumeQuarry: '2.198908792',
    totalVolumeOfMaxQs: '10.99454396',
  },
  {
    polyhedronId: '60',
    volumeTheoric: '22.92104583',
    volumeQuarry: '2.292104583',
    totalVolumeOfMaxQs: '11.46052291',
  },
  {
    polyhedronId: '61',
    volumeTheoric: '22.96095595',
    volumeQuarry: '2.296095595',
    totalVolumeOfMaxQs: '11.48047797',
  },
  {
    polyhedronId: '62',
    volumeTheoric: '24.58631856',
    volumeQuarry: '2.458631856',
    totalVolumeOfMaxQs: '12.29315928',
  },
  {
    polyhedronId: '63',
    volumeTheoric: '24.58899629',
    volumeQuarry: '2.458899629',
    totalVolumeOfMaxQs: '12.29449815',
  },
  {
    polyhedronId: '64',
    volumeTheoric: '24.58899629',
    volumeQuarry: '2.458899629',
    totalVolumeOfMaxQs: '12.29449815',
  },
  {
    polyhedronId: '65',
    volumeTheoric: '24.72826712',
    volumeQuarry: '2.472826712',
    totalVolumeOfMaxQs: '12.36413356',
  },
  {
    polyhedronId: '66',
    volumeTheoric: '24.74123618',
    volumeQuarry: '2.474123618',
    totalVolumeOfMaxQs: '12.37061809',
  },
  {
    polyhedronId: '67',
    volumeTheoric: '25.63580094',
    volumeQuarry: '2.563580094',
    totalVolumeOfMaxQs: '12.81790047',
  },
  {
    polyhedronId: '68',
    volumeTheoric: '26.1025254',
    volumeQuarry: '2.61025254',
    totalVolumeOfMaxQs: '13.0512627',
  },
  {
    polyhedronId: '69',
    volumeTheoric: '26.1025254',
    volumeQuarry: '2.61025254',
    totalVolumeOfMaxQs: '13.0512627',
  },
  {
    polyhedronId: '70',
    volumeTheoric: '27.2540692',
    volumeQuarry: '2.72540692',
    totalVolumeOfMaxQs: '13.6270346',
  },
  {
    polyhedronId: '71',
    volumeTheoric: '27.2540692',
    volumeQuarry: '2.72540692',
    totalVolumeOfMaxQs: '13.6270346',
  },
  {
    polyhedronId: '72',
    volumeTheoric: '27.52165529',
    volumeQuarry: '2.752165529',
    totalVolumeOfMaxQs: '13.76082764',
  },
  {
    polyhedronId: '73',
    volumeTheoric: '27.8869401',
    volumeQuarry: '2.78869401',
    totalVolumeOfMaxQs: '13.94347005',
  },
  {
    polyhedronId: '74',
    volumeTheoric: '30.43957587',
    volumeQuarry: '3.043957587',
    totalVolumeOfMaxQs: '15.21978794',
  },
  {
    polyhedronId: '75',
    volumeTheoric: '31.17940777',
    volumeQuarry: '3.117940777',
    totalVolumeOfMaxQs: '15.58970389',
  },
  {
    polyhedronId: '76',
    volumeTheoric: '31.17940777',
    volumeQuarry: '3.117940777',
    totalVolumeOfMaxQs: '15.58970389',
  },
  {
    polyhedronId: '77',
    volumeTheoric: '31.23121612',
    volumeQuarry: '3.123121612',
    totalVolumeOfMaxQs: '15.61560806',
  },
  {
    polyhedronId: '78',
    volumeTheoric: '31.71046347',
    volumeQuarry: '3.171046347',
    totalVolumeOfMaxQs: '15.85523174',
  },
  {
    polyhedronId: '79',
    volumeTheoric: '32.11373324',
    volumeQuarry: '3.211373324',
    totalVolumeOfMaxQs: '16.05686662',
  },
  {
    polyhedronId: '80',
    volumeTheoric: '33.1540443',
    volumeQuarry: '3.31540443',
    totalVolumeOfMaxQs: '16.57702215',
  },
  {
    polyhedronId: '81',
    volumeTheoric: '33.79812475',
    volumeQuarry: '3.379812475',
    totalVolumeOfMaxQs: '16.89906237',
  },
  {
    polyhedronId: '82',
    volumeTheoric: '34.34667276',
    volumeQuarry: '3.434667276',
    totalVolumeOfMaxQs: '17.17333638',
  },
  {
    polyhedronId: '83',
    volumeTheoric: '34.34667276',
    volumeQuarry: '3.434667276',
    totalVolumeOfMaxQs: '17.17333638',
  },
  {
    polyhedronId: '84',
    volumeTheoric: '34.47896787',
    volumeQuarry: '3.447896787',
    totalVolumeOfMaxQs: '17.23948394',
  },
  {
    polyhedronId: '85',
    volumeTheoric: '35.45967795',
    volumeQuarry: '3.545967795',
    totalVolumeOfMaxQs: '17.72983898',
  },
  {
    polyhedronId: '86',
    volumeTheoric: '37.12350103',
    volumeQuarry: '3.712350103',
    totalVolumeOfMaxQs: '18.56175051',
  },
  {
    polyhedronId: '87',
    volumeTheoric: '37.38666919',
    volumeQuarry: '3.738666919',
    totalVolumeOfMaxQs: '18.69333459',
  },
  {
    polyhedronId: '88',
    volumeTheoric: '37.84786931',
    volumeQuarry: '3.784786931',
    totalVolumeOfMaxQs: '18.92393466',
  },
  {
    polyhedronId: '89',
    volumeTheoric: '37.99910083',
    volumeQuarry: '3.799910083',
    totalVolumeOfMaxQs: '18.99955041',
  },
  {
    polyhedronId: '90',
    volumeTheoric: '38.07551997',
    volumeQuarry: '3.807551997',
    totalVolumeOfMaxQs: '19.03775999',
  },
  {
    polyhedronId: '91',
    volumeTheoric: '38.55198339',
    volumeQuarry: '3.855198339',
    totalVolumeOfMaxQs: '19.27599169',
  },
  {
    polyhedronId: '92',
    volumeTheoric: '39.72141901',
    volumeQuarry: '3.972141901',
    totalVolumeOfMaxQs: '19.86070951',
  },
  {
    polyhedronId: '93',
    volumeTheoric: '39.72141901',
    volumeQuarry: '3.972141901',
    totalVolumeOfMaxQs: '19.86070951',
  },
  {
    polyhedronId: '94',
    volumeTheoric: '40.30207632',
    volumeQuarry: '4.030207632',
    totalVolumeOfMaxQs: '20.15103816',
  },
  {
    polyhedronId: '95',
    volumeTheoric: '41.48230179',
    volumeQuarry: '4.148230179',
    totalVolumeOfMaxQs: '20.7411509',
  },
  {
    polyhedronId: '96',
    volumeTheoric: '42.82755546',
    volumeQuarry: '4.282755546',
    totalVolumeOfMaxQs: '21.41377773',
  },
  {
    polyhedronId: '97',
    volumeTheoric: '42.95879847',
    volumeQuarry: '4.295879847',
    totalVolumeOfMaxQs: '21.47939923',
  },
  {
    polyhedronId: '98',
    volumeTheoric: '43.80126338',
    volumeQuarry: '4.380126338',
    totalVolumeOfMaxQs: '21.90063169',
  },
  {
    polyhedronId: '99',
    volumeTheoric: '43.882252',
    volumeQuarry: '4.3882252',
    totalVolumeOfMaxQs: '21.941126',
  },
  {
    polyhedronId: '100',
    volumeTheoric: '45.09412297',
    volumeQuarry: '4.509412297',
    totalVolumeOfMaxQs: '22.54706148',
  },
  {
    polyhedronId: '101',
    volumeTheoric: '45.58381941',
    volumeQuarry: '4.558381941',
    totalVolumeOfMaxQs: '22.79190971',
  },
  {
    polyhedronId: '102',
    volumeTheoric: '45.58381941',
    volumeQuarry: '4.558381941',
    totalVolumeOfMaxQs: '22.79190971',
  },
  {
    polyhedronId: '103',
    volumeTheoric: '46.41493326',
    volumeQuarry: '4.641493326',
    totalVolumeOfMaxQs: '23.20746663',
  },
  {
    polyhedronId: '104',
    volumeTheoric: '47.62360819',
    volumeQuarry: '4.762360819',
    totalVolumeOfMaxQs: '23.8118041',
  },
  {
    polyhedronId: '105',
    volumeTheoric: '47.62360819',
    volumeQuarry: '4.762360819',
    totalVolumeOfMaxQs: '23.8118041',
  },
  {
    polyhedronId: '106',
    volumeTheoric: '47.9704093',
    volumeQuarry: '4.79704093',
    totalVolumeOfMaxQs: '23.98520465',
  },
  {
    polyhedronId: '107',
    volumeTheoric: '48.09048429',
    volumeQuarry: '4.809048429',
    totalVolumeOfMaxQs: '24.04524214',
  },
  {
    polyhedronId: '108',
    volumeTheoric: '48.20671615',
    volumeQuarry: '4.820671615',
    totalVolumeOfMaxQs: '24.10335808',
  },
  {
    polyhedronId: '109',
    volumeTheoric: '48.20671615',
    volumeQuarry: '4.820671615',
    totalVolumeOfMaxQs: '24.10335808',
  },
  {
    polyhedronId: '110',
    volumeTheoric: '48.71425958',
    volumeQuarry: '4.871425958',
    totalVolumeOfMaxQs: '24.35712979',
  },
  {
    polyhedronId: '111',
    volumeTheoric: '50.06375526',
    volumeQuarry: '5.006375526',
    totalVolumeOfMaxQs: '25.03187763',
  },
  {
    polyhedronId: '112',
    volumeTheoric: '52.75530822',
    volumeQuarry: '5.275530822',
    totalVolumeOfMaxQs: '26.37765411',
  },
  {
    polyhedronId: '113',
    volumeTheoric: '52.78285381',
    volumeQuarry: '5.278285381',
    totalVolumeOfMaxQs: '26.39142691',
  },
  {
    polyhedronId: '114',
    volumeTheoric: '52.78285381',
    volumeQuarry: '5.278285381',
    totalVolumeOfMaxQs: '26.39142691',
  },
  {
    polyhedronId: '115',
    volumeTheoric: '54.13959661',
    volumeQuarry: '5.413959661',
    totalVolumeOfMaxQs: '27.06979831',
  },
  {
    polyhedronId: '116',
    volumeTheoric: '55.65493553',
    volumeQuarry: '5.565493553',
    totalVolumeOfMaxQs: '27.82746776',
  },
  {
    polyhedronId: '117',
    volumeTheoric: '63.98073298',
    volumeQuarry: '6.398073298',
    totalVolumeOfMaxQs: '31.99036649',
  },
  {
    polyhedronId: '118',
    volumeTheoric: '65.12941967',
    volumeQuarry: '6.512941967',
    totalVolumeOfMaxQs: '32.56470983',
  },
  {
    polyhedronId: '119',
    volumeTheoric: '65.85246197',
    volumeQuarry: '6.585246197',
    totalVolumeOfMaxQs: '32.92623098',
  },
  {
    polyhedronId: '120',
    volumeTheoric: '65.85246197',
    volumeQuarry: '6.585246197',
    totalVolumeOfMaxQs: '32.92623098',
  },
  {
    polyhedronId: '121',
    volumeTheoric: '65.91009314',
    volumeQuarry: '6.591009314',
    totalVolumeOfMaxQs: '32.95504657',
  },
  {
    polyhedronId: '122',
    volumeTheoric: '66.1684595',
    volumeQuarry: '6.61684595',
    totalVolumeOfMaxQs: '33.08422975',
  },
  {
    polyhedronId: '123',
    volumeTheoric: '66.27087712',
    volumeQuarry: '6.627087712',
    totalVolumeOfMaxQs: '33.13543856',
  },
  {
    polyhedronId: '124',
    volumeTheoric: '66.27087712',
    volumeQuarry: '6.627087712',
    totalVolumeOfMaxQs: '33.13543856',
  },
  {
    polyhedronId: '125',
    volumeTheoric: '66.29285325',
    volumeQuarry: '6.629285325',
    totalVolumeOfMaxQs: '33.14642662',
  },
  {
    polyhedronId: '126',
    volumeTheoric: '66.31811768',
    volumeQuarry: '6.631811768',
    totalVolumeOfMaxQs: '33.15905884',
  },
  {
    polyhedronId: '127',
    volumeTheoric: '69.41134342',
    volumeQuarry: '6.941134342',
    totalVolumeOfMaxQs: '34.70567171',
  },
  {
    polyhedronId: '128',
    volumeTheoric: '69.41134342',
    volumeQuarry: '6.941134342',
    totalVolumeOfMaxQs: '34.70567171',
  },
  {
    polyhedronId: '129',
    volumeTheoric: '73.16035826',
    volumeQuarry: '7.316035826',
    totalVolumeOfMaxQs: '36.58017913',
  },
  {
    polyhedronId: '130',
    volumeTheoric: '74.36735162',
    volumeQuarry: '7.436735162',
    totalVolumeOfMaxQs: '37.18367581',
  },
  {
    polyhedronId: '131',
    volumeTheoric: '75.49723521',
    volumeQuarry: '7.549723521',
    totalVolumeOfMaxQs: '37.7486176',
  },
  {
    polyhedronId: '132',
    volumeTheoric: '76.34305236',
    volumeQuarry: '7.634305236',
    totalVolumeOfMaxQs: '38.17152618',
  },
  {
    polyhedronId: '133',
    volumeTheoric: '76.47121531',
    volumeQuarry: '7.647121531',
    totalVolumeOfMaxQs: '38.23560766',
  },
  {
    polyhedronId: '134',
    volumeTheoric: '77.73282613',
    volumeQuarry: '7.773282613',
    totalVolumeOfMaxQs: '38.86641306',
  },
  {
    polyhedronId: '135',
    volumeTheoric: '78.721708',
    volumeQuarry: '7.8721708',
    totalVolumeOfMaxQs: '39.360854',
  },
  {
    polyhedronId: '136',
    volumeTheoric: '78.721708',
    volumeQuarry: '7.8721708',
    totalVolumeOfMaxQs: '39.360854',
  },
  {
    polyhedronId: '137',
    volumeTheoric: '78.89870283',
    volumeQuarry: '7.889870283',
    totalVolumeOfMaxQs: '39.44935141',
  },
  {
    polyhedronId: '138',
    volumeTheoric: '78.89870283',
    volumeQuarry: '7.889870283',
    totalVolumeOfMaxQs: '39.44935141',
  },
  {
    polyhedronId: '139',
    volumeTheoric: '78.92626722',
    volumeQuarry: '7.892626722',
    totalVolumeOfMaxQs: '39.46313361',
  },
  {
    polyhedronId: '140',
    volumeTheoric: '79.59924562',
    volumeQuarry: '7.959924562',
    totalVolumeOfMaxQs: '39.79962281',
  },
  {
    polyhedronId: '141',
    volumeTheoric: '79.80778845',
    volumeQuarry: '7.980778845',
    totalVolumeOfMaxQs: '39.90389423',
  },
  {
    polyhedronId: '142',
    volumeTheoric: '81.34470392',
    volumeQuarry: '8.134470392',
    totalVolumeOfMaxQs: '40.67235196',
  },
  {
    polyhedronId: '143',
    volumeTheoric: '82.34057688',
    volumeQuarry: '8.234057688',
    totalVolumeOfMaxQs: '41.17028844',
  },
  {
    polyhedronId: '144',
    volumeTheoric: '82.8201271',
    volumeQuarry: '8.28201271',
    totalVolumeOfMaxQs: '41.41006355',
  },
  {
    polyhedronId: '145',
    volumeTheoric: '82.8201271',
    volumeQuarry: '8.28201271',
    totalVolumeOfMaxQs: '41.41006355',
  },
  {
    polyhedronId: '146',
    volumeTheoric: '84.17661106',
    volumeQuarry: '8.417661106',
    totalVolumeOfMaxQs: '42.08830553',
  },
  {
    polyhedronId: '147',
    volumeTheoric: '84.17661106',
    volumeQuarry: '8.417661106',
    totalVolumeOfMaxQs: '42.08830553',
  },
  {
    polyhedronId: '148',
    volumeTheoric: '86.518271',
    volumeQuarry: '8.6518271',
    totalVolumeOfMaxQs: '43.2591355',
  },
  {
    polyhedronId: '149',
    volumeTheoric: '87.90795162',
    volumeQuarry: '8.790795162',
    totalVolumeOfMaxQs: '43.95397581',
  },
  {
    polyhedronId: '150',
    volumeTheoric: '91.05639443',
    volumeQuarry: '9.105639443',
    totalVolumeOfMaxQs: '45.52819721',
  },
  {
    polyhedronId: '151',
    volumeTheoric: '91.42022232',
    volumeQuarry: '9.142022232',
    totalVolumeOfMaxQs: '45.71011116',
  },
  {
    polyhedronId: '152',
    volumeTheoric: '96.27453227',
    volumeQuarry: '9.627453227',
    totalVolumeOfMaxQs: '48.13726613',
  },
  {
    polyhedronId: '153',
    volumeTheoric: '97.53130251',
    volumeQuarry: '9.753130251',
    totalVolumeOfMaxQs: '48.76565125',
  },
  {
    polyhedronId: '154',
    volumeTheoric: '98.11617406',
    volumeQuarry: '9.811617406',
    totalVolumeOfMaxQs: '49.05808703',
  },
  {
    polyhedronId: '155',
    volumeTheoric: '99.39648007',
    volumeQuarry: '9.939648007',
    totalVolumeOfMaxQs: '49.69824004',
  },
  {
    polyhedronId: '156',
    volumeTheoric: '100.1867251',
    volumeQuarry: '10.01867251',
    totalVolumeOfMaxQs: '50.09336253',
  },
  {
    polyhedronId: '157',
    volumeTheoric: '100.6384492',
    volumeQuarry: '10.06384492',
    totalVolumeOfMaxQs: '50.31922458',
  },
  {
    polyhedronId: '158',
    volumeTheoric: '108.1381079',
    volumeQuarry: '10.81381079',
    totalVolumeOfMaxQs: '54.06905397',
  },
  {
    polyhedronId: '159',
    volumeTheoric: '108.3459774',
    volumeQuarry: '10.83459774',
    totalVolumeOfMaxQs: '54.17298872',
  },
  {
    polyhedronId: '160',
    volumeTheoric: '109.2292376',
    volumeQuarry: '10.92292376',
    totalVolumeOfMaxQs: '54.61461879',
  },
  {
    polyhedronId: '161',
    volumeTheoric: '109.2721808',
    volumeQuarry: '10.92721808',
    totalVolumeOfMaxQs: '54.63609039',
  },
  {
    polyhedronId: '162',
    volumeTheoric: '110.621238',
    volumeQuarry: '11.0621238',
    totalVolumeOfMaxQs: '55.310619',
  },
  {
    polyhedronId: '163',
    volumeTheoric: '111.083248',
    volumeQuarry: '11.1083248',
    totalVolumeOfMaxQs: '55.541624',
  },
  {
    polyhedronId: '164',
    volumeTheoric: '115.4812411',
    volumeQuarry: '11.54812411',
    totalVolumeOfMaxQs: '57.74062055',
  },
  {
    polyhedronId: '165',
    volumeTheoric: '115.5684011',
    volumeQuarry: '11.55684011',
    totalVolumeOfMaxQs: '57.78420053',
  },
  {
    polyhedronId: '166',
    volumeTheoric: '115.5684011',
    volumeQuarry: '11.55684011',
    totalVolumeOfMaxQs: '57.78420053',
  },
  {
    polyhedronId: '167',
    volumeTheoric: '115.5915342',
    volumeQuarry: '11.55915342',
    totalVolumeOfMaxQs: '57.7957671',
  },
  {
    polyhedronId: '168',
    volumeTheoric: '119.5175678',
    volumeQuarry: '11.95175678',
    totalVolumeOfMaxQs: '59.7587839',
  },
  {
    polyhedronId: '169',
    volumeTheoric: '122.7562647',
    volumeQuarry: '12.27562647',
    totalVolumeOfMaxQs: '61.37813237',
  },
  {
    polyhedronId: '170',
    volumeTheoric: '122.7562647',
    volumeQuarry: '12.27562647',
    totalVolumeOfMaxQs: '61.37813237',
  },
  {
    polyhedronId: '171',
    volumeTheoric: '123.8921837',
    volumeQuarry: '12.38921837',
    totalVolumeOfMaxQs: '61.94609183',
  },
  {
    polyhedronId: '172',
    volumeTheoric: '123.9593254',
    volumeQuarry: '12.39593254',
    totalVolumeOfMaxQs: '61.9796627',
  },
  {
    polyhedronId: '173',
    volumeTheoric: '127.9905235',
    volumeQuarry: '12.79905235',
    totalVolumeOfMaxQs: '63.99526174',
  },
  {
    polyhedronId: '174',
    volumeTheoric: '129.6117598',
    volumeQuarry: '12.96117598',
    totalVolumeOfMaxQs: '64.80587992',
  },
  {
    polyhedronId: '175',
    volumeTheoric: '129.6117598',
    volumeQuarry: '12.96117598',
    totalVolumeOfMaxQs: '64.80587992',
  },
  {
    polyhedronId: '176',
    volumeTheoric: '131.8278655',
    volumeQuarry: '13.18278655',
    totalVolumeOfMaxQs: '65.91393275',
  },
  {
    polyhedronId: '177',
    volumeTheoric: '140.120305',
    volumeQuarry: '14.0120305',
    totalVolumeOfMaxQs: '70.06015252',
  },
  {
    polyhedronId: '178',
    volumeTheoric: '145.3746873',
    volumeQuarry: '14.53746873',
    totalVolumeOfMaxQs: '72.68734363',
  },
  {
    polyhedronId: '179',
    volumeTheoric: '146.5236289',
    volumeQuarry: '14.65236289',
    totalVolumeOfMaxQs: '73.26181444',
  },
  {
    polyhedronId: '180',
    volumeTheoric: '148.8972379',
    volumeQuarry: '14.88972379',
    totalVolumeOfMaxQs: '74.44861894',
  },
  {
    polyhedronId: '181',
    volumeTheoric: '151.2463591',
    volumeQuarry: '15.12463591',
    totalVolumeOfMaxQs: '75.62317957',
  },
  {
    polyhedronId: '182',
    volumeTheoric: '160.3884905',
    volumeQuarry: '16.03884905',
    totalVolumeOfMaxQs: '80.19424526',
  },
  {
    polyhedronId: '183',
    volumeTheoric: '160.3884905',
    volumeQuarry: '16.03884905',
    totalVolumeOfMaxQs: '80.19424526',
  },
  {
    polyhedronId: '184',
    volumeTheoric: '164.3355116',
    volumeQuarry: '16.43355116',
    totalVolumeOfMaxQs: '82.16775579',
  },
  {
    polyhedronId: '185',
    volumeTheoric: '165.9737193',
    volumeQuarry: '16.59737193',
    totalVolumeOfMaxQs: '82.98685963',
  },
  {
    polyhedronId: '186',
    volumeTheoric: '169.092763',
    volumeQuarry: '16.9092763',
    totalVolumeOfMaxQs: '84.54638151',
  },
  {
    polyhedronId: '187',
    volumeTheoric: '177.7067641',
    volumeQuarry: '17.77067641',
    totalVolumeOfMaxQs: '88.85338204',
  },
  {
    polyhedronId: '188',
    volumeTheoric: '180.2871756',
    volumeQuarry: '18.02871756',
    totalVolumeOfMaxQs: '90.14358782',
  },
  {
    polyhedronId: '189',
    volumeTheoric: '182.9994227',
    volumeQuarry: '18.29994227',
    totalVolumeOfMaxQs: '91.49971136',
  },
  {
    polyhedronId: '190',
    volumeTheoric: '185.9785252',
    volumeQuarry: '18.59785252',
    totalVolumeOfMaxQs: '92.98926258',
  },
  {
    polyhedronId: '191',
    volumeTheoric: '186.1547975',
    volumeQuarry: '18.61547975',
    totalVolumeOfMaxQs: '93.07739876',
  },
  {
    polyhedronId: '192',
    volumeTheoric: '186.1547975',
    volumeQuarry: '18.61547975',
    totalVolumeOfMaxQs: '93.07739876',
  },
  {
    polyhedronId: '193',
    volumeTheoric: '197.2227217',
    volumeQuarry: '19.72227217',
    totalVolumeOfMaxQs: '98.61136085',
  },
  {
    polyhedronId: '194',
    volumeTheoric: '197.2227217',
    volumeQuarry: '19.72227217',
    totalVolumeOfMaxQs: '98.61136085',
  },
  {
    polyhedronId: '195',
    volumeTheoric: '198.631996',
    volumeQuarry: '19.8631996',
    totalVolumeOfMaxQs: '99.31599802',
  },
  {
    polyhedronId: '196',
    volumeTheoric: '200.6514617',
    volumeQuarry: '20.06514617',
    totalVolumeOfMaxQs: '100.3257308',
  },
  {
    polyhedronId: '197',
    volumeTheoric: '211.4121605',
    volumeQuarry: '21.14121605',
    totalVolumeOfMaxQs: '105.7060802',
  },
  {
    polyhedronId: '198',
    volumeTheoric: '212.1727902',
    volumeQuarry: '21.21727902',
    totalVolumeOfMaxQs: '106.0863951',
  },
  {
    polyhedronId: '199',
    volumeTheoric: '223.7888318',
    volumeQuarry: '22.37888318',
    totalVolumeOfMaxQs: '111.8944159',
  },
  {
    polyhedronId: '200',
    volumeTheoric: '224.6385574',
    volumeQuarry: '22.46385574',
    totalVolumeOfMaxQs: '112.3192787',
  },
  {
    polyhedronId: '201',
    volumeTheoric: '225.8759298',
    volumeQuarry: '22.58759298',
    totalVolumeOfMaxQs: '112.9379649',
  },
  {
    polyhedronId: '202',
    volumeTheoric: '233.5412075',
    volumeQuarry: '23.35412075',
    totalVolumeOfMaxQs: '116.7706037',
  },
  {
    polyhedronId: '203',
    volumeTheoric: '240.1674293',
    volumeQuarry: '24.01674293',
    totalVolumeOfMaxQs: '120.0837147',
  },
  {
    polyhedronId: '204',
    volumeTheoric: '240.1674293',
    volumeQuarry: '24.01674293',
    totalVolumeOfMaxQs: '120.0837147',
  },
  {
    polyhedronId: '205',
    volumeTheoric: '242.4670124',
    volumeQuarry: '24.24670124',
    totalVolumeOfMaxQs: '121.2335062',
  },
  {
    polyhedronId: '206',
    volumeTheoric: '251.9191303',
    volumeQuarry: '25.19191303',
    totalVolumeOfMaxQs: '125.9595651',
  },
  {
    polyhedronId: '207',
    volumeTheoric: '251.9191303',
    volumeQuarry: '25.19191303',
    totalVolumeOfMaxQs: '125.9595651',
  },
  {
    polyhedronId: '208',
    volumeTheoric: '255.3231071',
    volumeQuarry: '25.53231071',
    totalVolumeOfMaxQs: '127.6615535',
  },
  {
    polyhedronId: '209',
    volumeTheoric: '275.045002',
    volumeQuarry: '27.5045002',
    totalVolumeOfMaxQs: '137.522501',
  },
  {
    polyhedronId: '210',
    volumeTheoric: '275.6419832',
    volumeQuarry: '27.56419832',
    totalVolumeOfMaxQs: '137.8209916',
  },
  {
    polyhedronId: '211',
    volumeTheoric: '278.3995546',
    volumeQuarry: '27.83995546',
    totalVolumeOfMaxQs: '139.1997773',
  },
  {
    polyhedronId: '212',
    volumeTheoric: '287.1719655',
    volumeQuarry: '28.71719655',
    totalVolumeOfMaxQs: '143.5859827',
  },
  {
    polyhedronId: '213',
    volumeTheoric: '298.96',
    volumeQuarry: '29.896',
    totalVolumeOfMaxQs: '149.48',
  },
  {
    polyhedronId: '214',
    volumeTheoric: '317.6424583',
    volumeQuarry: '31.76424583',
    totalVolumeOfMaxQs: '158.8212291',
  },
  {
    polyhedronId: '215',
    volumeTheoric: '318.8210218',
    volumeQuarry: '31.88210218',
    totalVolumeOfMaxQs: '159.4105109',
  },
  {
    polyhedronId: '216',
    volumeTheoric: '324.9689983',
    volumeQuarry: '32.49689983',
    totalVolumeOfMaxQs: '162.4844992',
  },
  {
    polyhedronId: '217',
    volumeTheoric: '327.640177',
    volumeQuarry: '32.7640177',
    totalVolumeOfMaxQs: '163.8200885',
  },
  {
    polyhedronId: '218',
    volumeTheoric: '363.4633713',
    volumeQuarry: '36.34633713',
    totalVolumeOfMaxQs: '181.7316857',
  },
  {
    polyhedronId: '219',
    volumeTheoric: '365.7145411',
    volumeQuarry: '36.57145411',
    totalVolumeOfMaxQs: '182.8572706',
  },
  {
    polyhedronId: '220',
    volumeTheoric: '395.6689824',
    volumeQuarry: '39.56689824',
    totalVolumeOfMaxQs: '197.8344912',
  },
  {
    polyhedronId: '221',
    volumeTheoric: '395.6689824',
    volumeQuarry: '39.56689824',
    totalVolumeOfMaxQs: '197.8344912',
  },
  {
    polyhedronId: '222',
    volumeTheoric: '407.0266527',
    volumeQuarry: '40.70266527',
    totalVolumeOfMaxQs: '203.5133263',
  },
  {
    polyhedronId: '223',
    volumeTheoric: '409.712272',
    volumeQuarry: '40.9712272',
    totalVolumeOfMaxQs: '204.856136',
  },
  {
    polyhedronId: '224',
    volumeTheoric: '410.4041603',
    volumeQuarry: '41.04041603',
    totalVolumeOfMaxQs: '205.2020801',
  },
  {
    polyhedronId: '225',
    volumeTheoric: '412.4712705',
    volumeQuarry: '41.24712705',
    totalVolumeOfMaxQs: '206.2356352',
  },
  {
    polyhedronId: '226',
    volumeTheoric: '434.487888',
    volumeQuarry: '43.4487888',
    totalVolumeOfMaxQs: '217.243944',
  },
  {
    polyhedronId: '227',
    volumeTheoric: '456.9388774',
    volumeQuarry: '45.69388774',
    totalVolumeOfMaxQs: '228.4694387',
  },
  {
    polyhedronId: '228',
    volumeTheoric: '459.7463631',
    volumeQuarry: '45.97463631',
    totalVolumeOfMaxQs: '229.8731816',
  },
  {
    polyhedronId: '229',
    volumeTheoric: '463.7917397',
    volumeQuarry: '46.37917397',
    totalVolumeOfMaxQs: '231.8958698',
  },
  {
    polyhedronId: '230',
    volumeTheoric: '468.3031069',
    volumeQuarry: '46.83031069',
    totalVolumeOfMaxQs: '234.1515534',
  },
  {
    polyhedronId: '231',
    volumeTheoric: '470.080664',
    volumeQuarry: '47.0080664',
    totalVolumeOfMaxQs: '235.040332',
  },
  {
    polyhedronId: '232',
    volumeTheoric: '474.1585984',
    volumeQuarry: '47.41585984',
    totalVolumeOfMaxQs: '237.0792992',
  },
  {
    polyhedronId: '233',
    volumeTheoric: '480.6878166',
    volumeQuarry: '48.06878166',
    totalVolumeOfMaxQs: '240.3439083',
  },
  {
    polyhedronId: '234',
    volumeTheoric: '480.7964827',
    volumeQuarry: '48.07964827',
    totalVolumeOfMaxQs: '240.3982413',
  },
  {
    polyhedronId: '235',
    volumeTheoric: '486.3842936',
    volumeQuarry: '48.63842936',
    totalVolumeOfMaxQs: '243.1921468',
  },
  {
    polyhedronId: '236',
    volumeTheoric: '487.7100792',
    volumeQuarry: '48.77100792',
    totalVolumeOfMaxQs: '243.8550396',
  },
  {
    polyhedronId: '237',
    volumeTheoric: '555.4363778',
    volumeQuarry: '55.54363778',
    totalVolumeOfMaxQs: '277.7181889',
  },
  {
    polyhedronId: '238',
    volumeTheoric: '585.6805019',
    volumeQuarry: '58.56805019',
    totalVolumeOfMaxQs: '292.840251',
  },
  {
    polyhedronId: '239',
    volumeTheoric: '640.9173371',
    volumeQuarry: '64.09173371',
    totalVolumeOfMaxQs: '320.4586686',
  },
  {
    polyhedronId: '240',
    volumeTheoric: '647.2857396',
    volumeQuarry: '64.72857396',
    totalVolumeOfMaxQs: '323.6428698',
  },
  {
    polyhedronId: '241',
    volumeTheoric: '696.7160321',
    volumeQuarry: '69.67160321',
    totalVolumeOfMaxQs: '348.3580161',
  },
  {
    polyhedronId: '242',
    volumeTheoric: '697.5880182',
    volumeQuarry: '69.75880182',
    totalVolumeOfMaxQs: '348.7940091',
  },
  {
    polyhedronId: '243',
    volumeTheoric: '738.1964739',
    volumeQuarry: '73.81964739',
    totalVolumeOfMaxQs: '369.098237',
  },
  {
    polyhedronId: '244',
    volumeTheoric: '781.68',
    volumeQuarry: '78.168',
    totalVolumeOfMaxQs: '390.84',
  },
  {
    polyhedronId: '245',
    volumeTheoric: '804.2111619',
    volumeQuarry: '80.42111619',
    totalVolumeOfMaxQs: '402.1055809',
  },
  {
    polyhedronId: '246',
    volumeTheoric: '810.7397119',
    volumeQuarry: '81.07397119',
    totalVolumeOfMaxQs: '405.3698559',
  },
  {
    polyhedronId: '247',
    volumeTheoric: '864.5741243',
    volumeQuarry: '86.45741243',
    totalVolumeOfMaxQs: '432.2870622',
  },
  {
    polyhedronId: '248',
    volumeTheoric: '866.8157021',
    volumeQuarry: '86.68157021',
    totalVolumeOfMaxQs: '433.407851',
  },
  {
    polyhedronId: '249',
    volumeTheoric: '869.260273',
    volumeQuarry: '86.9260273',
    totalVolumeOfMaxQs: '434.6301365',
  },
  {
    polyhedronId: '250',
    volumeTheoric: '885.3840528',
    volumeQuarry: '88.53840528',
    totalVolumeOfMaxQs: '442.6920264',
  },
  {
    polyhedronId: '251',
    volumeTheoric: '911.2052068',
    volumeQuarry: '91.12052068',
    totalVolumeOfMaxQs: '455.6026034',
  },
  {
    polyhedronId: '252',
    volumeTheoric: '911.2052068',
    volumeQuarry: '91.12052068',
    totalVolumeOfMaxQs: '455.6026034',
  },
  {
    polyhedronId: '253',
    volumeTheoric: '933.5329777',
    volumeQuarry: '93.35329777',
    totalVolumeOfMaxQs: '466.7664888',
  },
  {
    polyhedronId: '254',
    volumeTheoric: '982.4094687',
    volumeQuarry: '98.24094687',
    totalVolumeOfMaxQs: '491.2047343',
  },
  {
    polyhedronId: '255',
    volumeTheoric: '994.4035173',
    volumeQuarry: '99.44035173',
    totalVolumeOfMaxQs: '497.2017587',
  },
  {
    polyhedronId: '256',
    volumeTheoric: '996.2689635',
    volumeQuarry: '99.62689635',
    totalVolumeOfMaxQs: '498.1344817',
  },
  {
    polyhedronId: '257',
    volumeTheoric: '999.6525228',
    volumeQuarry: '99.96525228',
    totalVolumeOfMaxQs: '499.8262614',
  },
  {
    polyhedronId: '258',
    volumeTheoric: '1003.428085',
    volumeQuarry: '100.3428085',
    totalVolumeOfMaxQs: '501.7140425',
  },
  {
    polyhedronId: '259',
    volumeTheoric: '1005.936249',
    volumeQuarry: '100.5936249',
    totalVolumeOfMaxQs: '502.9681247',
  },
  {
    polyhedronId: '260',
    volumeTheoric: '1027.556376',
    volumeQuarry: '102.7556376',
    totalVolumeOfMaxQs: '513.778188',
  },
  {
    polyhedronId: '261',
    volumeTheoric: '1039.575702',
    volumeQuarry: '103.9575702',
    totalVolumeOfMaxQs: '519.7878509',
  },
  {
    polyhedronId: '262',
    volumeTheoric: '1072.903493',
    volumeQuarry: '107.2903493',
    totalVolumeOfMaxQs: '536.4517465',
  },
  {
    polyhedronId: '263',
    volumeTheoric: '1096.44416',
    volumeQuarry: '109.644416',
    totalVolumeOfMaxQs: '548.2220802',
  },
  {
    polyhedronId: '264',
    volumeTheoric: '1105.604156',
    volumeQuarry: '110.5604156',
    totalVolumeOfMaxQs: '552.8020782',
  },
  {
    polyhedronId: '265',
    volumeTheoric: '1105.604156',
    volumeQuarry: '110.5604156',
    totalVolumeOfMaxQs: '552.8020782',
  },
  {
    polyhedronId: '266',
    volumeTheoric: '1279.879718',
    volumeQuarry: '127.9879718',
    totalVolumeOfMaxQs: '639.9398588',
  },
  {
    polyhedronId: '267',
    volumeTheoric: '1282.32',
    volumeQuarry: '128.232',
    totalVolumeOfMaxQs: '641.16',
  },
  {
    polyhedronId: '268',
    volumeTheoric: '1292.618574',
    volumeQuarry: '129.2618574',
    totalVolumeOfMaxQs: '646.3092868',
  },
  {
    polyhedronId: '269',
    volumeTheoric: '1372.640123',
    volumeQuarry: '137.2640123',
    totalVolumeOfMaxQs: '686.3200615',
  },
  {
    polyhedronId: '270',
    volumeTheoric: '1373.524125',
    volumeQuarry: '137.3524125',
    totalVolumeOfMaxQs: '686.7620627',
  },
  {
    polyhedronId: '271',
    volumeTheoric: '1385.000574',
    volumeQuarry: '138.5000574',
    totalVolumeOfMaxQs: '692.500287',
  },
  {
    polyhedronId: '272',
    volumeTheoric: '1412.536638',
    volumeQuarry: '141.2536638',
    totalVolumeOfMaxQs: '706.268319',
  },
  {
    polyhedronId: '273',
    volumeTheoric: '1479.086411',
    volumeQuarry: '147.9086411',
    totalVolumeOfMaxQs: '739.5432057',
  },
  {
    polyhedronId: '274',
    volumeTheoric: '1537.596367',
    volumeQuarry: '153.7596367',
    totalVolumeOfMaxQs: '768.7981833',
  },
  {
    polyhedronId: '275',
    volumeTheoric: '1609.378762',
    volumeQuarry: '160.9378762',
    totalVolumeOfMaxQs: '804.689381',
  },
  {
    polyhedronId: '276',
    volumeTheoric: '1661.503321',
    volumeQuarry: '166.1503321',
    totalVolumeOfMaxQs: '830.7516606',
  },
  {
    polyhedronId: '277',
    volumeTheoric: '1661.503321',
    volumeQuarry: '166.1503321',
    totalVolumeOfMaxQs: '830.7516606',
  },
  {
    polyhedronId: '278',
    volumeTheoric: '1845.19818',
    volumeQuarry: '184.519818',
    totalVolumeOfMaxQs: '922.59909',
  },
  {
    polyhedronId: '279',
    volumeTheoric: '1845.19818',
    volumeQuarry: '184.519818',
    totalVolumeOfMaxQs: '922.59909',
  },
  {
    polyhedronId: '280',
    volumeTheoric: '2110.839982',
    volumeQuarry: '211.0839982',
    totalVolumeOfMaxQs: '1055.419991',
  },
  {
    polyhedronId: '281',
    volumeTheoric: '2110.839982',
    volumeQuarry: '211.0839982',
    totalVolumeOfMaxQs: '1055.419991',
  },
  {
    polyhedronId: '282',
    volumeTheoric: '2546.727819',
    volumeQuarry: '254.6727819',
    totalVolumeOfMaxQs: '1273.36391',
  },
];
