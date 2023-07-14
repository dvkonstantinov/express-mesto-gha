const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201);
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании карточки.',
          });
      }
      return res.status(500).send({ message: err });
    });
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании карточки.',
          });
      }
      return res.status(500).send({ message: err });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.status(204);
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: err });
    });
};

const likeCard = (req, res) => {
  let currentCard;
  if (req.method === 'PUT') {
    currentCard = Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
  }
  if (req.method === 'DELETE') {
    currentCard = Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
  }
  currentCard
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      }
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(500).send({ message: err });
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
};
