const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { MONGO_CONNECTION_STRING } = require('./common/config.js');


mongoose.connect(MONGO_CONNECTION_STRING)
  .then( () => { console.log('MongoDB connected!');})
  .catch( (error) => { console.log(error);})


const app = express();

//passportjs allows that only authenticated users can make requests to our endpoints
app.use(passport.initialize());
require('./middleware/passport')(passport);

const authRouter = require('./resources/authentication/auth.router');
//const booksRouter = require('./resources/books/books.router');
const tokenRouter = require('./resources/token/token.router');

const ugolkiRouter = require('./resources/ugolki/ugolki.router');
const samoreziRouter = require('./resources/samorezi/samorezi.router');
const krugiRouter = require('./resources/krugi/krugi.router');
const othersRouter = require('./resources/others/others.router');


app.use(cors());
app.use(morgan('dev'));
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(express.urlencoded());

app.use('/api/auth', authRouter);
//app.use('/api', booksRouter);
app.use('/api', tokenRouter);

app.use('/api', ugolkiRouter);
app.use('/api', samoreziRouter);
app.use('/api', krugiRouter);
app.use('/api', othersRouter);


module.exports = app;