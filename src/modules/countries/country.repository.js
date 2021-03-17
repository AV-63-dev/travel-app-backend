const Country = require('./country.schema');
const { NotFoundError } = require('../../common/errors/errors-list');
const { ENTITY_NAME } = require('./constants');
// const {
//   COLLECTION_NAME: ATTRACTION_COLLECTION_NAME,
// } = require('../attractions/constants');
// const { Types } = require('mongoose');

const countryExcludedFields = {
  _id: 0,
  id: 0,
  __v: 0,
  lang: 0,
  description: 0,
  capitalCoordinates: 0,
  videoURL: 0,
  info: 0,
  timeZone: 0,
  currency: 0,
};
const countryExcludedFieldsForOne = {
  id: 0,
  __v: 0,
  lang: 0,
  info: 0,
};
const attractionExcludedFields = {
  countryId: 0,
  lang: 0,
  info: 0,
  countryCodeISO2: 0,
};

const getAllByLang = async (lang) => {
  return await Country.aggregate()
    .match({ info: { $elemMatch: { lang } } })
    .unwind('info')
    .match({ 'info.lang': lang })
    .replaceRoot({
      $mergeObjects: [{ id: '$_id' }, '$info', '$$ROOT'],
    })
    .project(countryExcludedFields);
};

const getOneByLang = async (codeISO2, lang) => {
  const data = await Country.aggregate()
    .match({ codeISO2: codeISO2 })
    .unwind('info')
    .match({ 'info.lang': lang })
    .replaceRoot({
      $mergeObjects: [{ id: '$_id' }, '$info', '$$ROOT'],
    })
    .project(countryExcludedFieldsForOne)
    .lookup({
      from: 'attractions',
      // from: ATTRACTION_COLLECTION_NAME,
      pipeline: [
        {
          $match: { countryCodeISO2: codeISO2 },
        },
        { $unwind: '$info' },
        {
          $match: { 'info.lang': lang },
        },
        {
          $replaceWith: { $mergeObjects: ['$info', '$$ROOT'] },
        },
        { $project: attractionExcludedFields },
      ],
      as: 'attractions',
    });

  const country = data[0];
  if (country) {
    return country;
  }
  throw new NotFoundError(ENTITY_NAME);
};

module.exports = {
  getAllByLang,
  getOneByLang,
};
