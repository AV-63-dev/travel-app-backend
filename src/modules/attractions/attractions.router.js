const express = require('express');
const wrap = require('../../common/errors/async-error-wrapper');
const attractionsService = require('./attractions.service');
const validateId = require('../../common/validation/objectID.validation');
const { DEFAULT_LANG } = require('../../common/config');
const { ENTITY_NAME } = require('./constants');

const router = express.Router();
console.log('2222');
router.param(
  'id',
  wrap(async (req, res, next) => {
    const { id } = req.params;
    validateId(id, ENTITY_NAME);
    next();
  })
);

router.get(
  '/',
  wrap(async (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG;
    const data = await attractionsService.getAll(lang);
    res.send(data);
  })
);



module.exports = router;
