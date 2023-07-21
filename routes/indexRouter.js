const router = require('express').Router();
const userRoutes = require('./users');
const cardRouter = require('./cards');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.use('/', signupRouter);
router.use('/', signinRouter);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страницы по запрошенному URL не существует'));
});

module.exports = router;
