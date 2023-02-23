const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('mysecretkey'));

app.get('/greet', (req, res) => {
  const { name = 'no-name' } = req.cookies;
  res.send(`hey there ${name}`);
});

app.get('/setname', (req, res) => {
  res.cookie('name', 'jaimin parmar');
  res.cookie('animal', 'duck');
  res.send('OK SENT YOU A COOKIE!');
});

app.get('/getsignedcookie', (req, res) => {
  res.cookie('fruit', 'mango', { signed: true });
  res.send('OK SIGNED YOUR FRUIT COOKIE');
});

app.get('/verifyfruit', (req, res) => {
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log('SERVING');
});
