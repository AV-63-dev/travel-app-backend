const Attractions = require('./attractions.schema');
const { NotFoundError } = require('../../common/errors/errors-list');
const { ENTITY_NAME } = require('./constants');

const attractionsExcludedFields = { _id: 0, __v: 0, lang: 0, localizations: 0 };

const getAllByLang = async (lang) => {
  console.log('lang', lang);
  return await Attractions.aggregate()
    .replaceRoot({
      $mergeObjects: [{ id: '$_id' }, '$localizations', '$$ROOT'],
    })
    .project(attractionsExcludedFields);
};

const getOneByLang = async (/*id, lang*/) => {
  const data = await Attractions.aggregate()
    .replaceRoot({
      $mergeObjects: [{ id: '$_id' }, '$localizations', '$$ROOT'],
    })
    .project(attractionsExcludedFields);

  const country = data[0];
  if (country) {
    return country;
  }
  throw new NotFoundError(ENTITY_NAME);
};

const setRating = async (changedAttrId, changedAttrRating, userEmail) => {
  console.log(changedAttrId, changedAttrRating, userEmail);
  let attraction = await Attractions.findOne({ _id: changedAttrId });
  const isUserVoteAlready = attraction.votes.find(
    (vote) => vote.user === userEmail
  );
  if (isUserVoteAlready === undefined) {
    attraction.votes.push({ user: userEmail, rate: changedAttrRating });
  } else {
    isUserVoteAlready.rate = changedAttrRating;
  }
  await attraction.save();
  return { id: attraction._id, votes: attraction.votes };
};

module.exports = {
  getAllByLang,
  getOneByLang,
  setRating,
};
