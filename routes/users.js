const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const {
  getAllUsers,
  getById,
  updateProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getMe);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  getById
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(URL_REGEX),
    }),
  }),
  updateAvatar
);

module.exports = router;
