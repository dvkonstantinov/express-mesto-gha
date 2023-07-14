const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
