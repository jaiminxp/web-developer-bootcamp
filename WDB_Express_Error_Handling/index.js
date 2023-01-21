const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('dev'));

//custom middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chickennugget') {
    next();
  }

  //   res.send('SORRY, YOU NEED A PASSWORD!!!');
  throw new AppError('SORRY, YOU NEED A PASSWORD!!!', 401);
};

//middleware for specific path
app.use('/cats', (req, res, next) => {
  console.log('I LOVE CATS!');
  next();
});

app.get('/', (req, res) => {
  res.send('HOME PAGE!');
});

app.get('/cats', (req, res) => {
  res.send('MEOWWWW!');
});

app.get('/secret', verifyPassword, (req, res) => {
  res.send('CLASSIFIED SECRET: GUSTAVO BING CHILLING!!!');
});

app.get('/error', (req, res) => {
  cat.fly();
});

app.get('/admin', (req, res) => {
  throw new AppError('You are not an admin', 403);
});

// 404 route
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

//error handler middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log('Running on localhost:3000');
});
