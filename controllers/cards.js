const Card = require("../models/card");
const BadRequest = require("../errors/BadRequest");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201);
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при создании карточки")
        );
      } else {
        next(err);
      }
    });
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          "Переданы некорректные данные для удаления карточки."
        );
      }
      if (req.user._id !== card.owner.valueOf()) {
        throw new ForbiddenError("Нет прав на удаление карточки");
      }
      card.deleteOne().then(() => {
        res.status(204).send(card);
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Карточка с указанным _id не найдена"));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  let currentCard;
  if (req.method === "PUT") {
    currentCard = Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true }
    );
  }
  if (req.method === "DELETE") {
    currentCard = Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true }
    );
  }
  currentCard
    .then((card) => {
      if (!card) {
        throw new BadRequest(
          "Переданы некорректные данные для постановки/снятии лайка."
        );
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Передан несуществующий _id карточки"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
};
