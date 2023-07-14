const express = require('express');
const { mongoose } = require('mongoose');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64875871a54f131ad715579c',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT);
