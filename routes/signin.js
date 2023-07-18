const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { loginUser } = require('../controllers/users');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser
);

module.exports = router;
