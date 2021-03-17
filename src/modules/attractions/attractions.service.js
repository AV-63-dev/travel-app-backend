const attractionsRepo = require('./attractions.repository');

const getAll = async (lang) => {
  const attractions = await attractionsRepo.getAllByLang(lang);
  return attractions;
};

const setRating = async (changedAttrId, changedAttrRating, userEmail) => {
  console.log(changedAttrId, changedAttrRating, userEmail);
  const attraction = await attractionsRepo.setRating(
    changedAttrId,
    changedAttrRating,
    userEmail
  );
  return attraction;
};

module.exports = {
  getAll,
  setRating,
};
