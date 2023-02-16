const express = require('express');
const app = express();
const morgan = require('morgan');

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

  res.send('SORRY, YOU NEED A PASSWORD!!!');
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

// 404 route
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

app.listen(3000, () => {
  console.log('Running on localhost:3000');
});
