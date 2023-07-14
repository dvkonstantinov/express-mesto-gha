const router = require('express').Router();
const {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', likeCard);
module.exports = router;
