const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { URL_REGEX } = require('../utils/constants');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(URL_REGEX),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

module.exports = router;
