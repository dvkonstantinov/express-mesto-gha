require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { mongoose } = require('mongoose');
const { errors } = require('celebrate');
const serverError = require('./errors/ServerError');
const router = require('./routes/indexRouter');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(serverError);

app.listen(PORT);
