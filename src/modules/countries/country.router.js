const express = require('express');
const wrap = require('../../common/errors/async-error-wrapper');
const countryService = require('./country.service');
// const validateId = require('../../common/validation/objectID.validation');
const { DEFAULT_LANG } = require('../../common/config');
// const { ENTITY_NAME } = require('./constants');

const router = express.Router();

router.param(
  'codeISO2',
  wrap(async (req, res, next) => {
    // const { id } = req.params;
    // validateId(id, ENTITY_NAME);
    next();
  })
);

router.get(
  '/',
  wrap(async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const data = await countryService.getAll(lang);
    res.send(data);
  })
);

router.get(
  '/:codeISO2',
  wrap(async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const { codeISO2 } = req.params;
    const data = await countryService.getOne(codeISO2, lang);
    res.json(data);
  })
);

module.exports = router;
