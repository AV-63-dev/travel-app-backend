const attractionsRepo = require('./attractions.repository');

const getAll = async (lang) => {
  const attractions = await attractionsRepo.getAllByLang(lang);
  return attractions;
};

module.exports = {
  getAll,
};
