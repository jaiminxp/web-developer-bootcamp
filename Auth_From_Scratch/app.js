const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const session = require('express-session');

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://localhost:27017/authDemo')
  .then(() => {
    console.log('Database connected ✅');
  })
  .catch((err) => {
    console.log('ERROR 🚫');
    console.log(err);
  });

// EXPRESS CONFIG AND MIDDLEWARES
app.use(session({ secret: '3C82C489F33261B4231D1EA3D173F' }));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//CUSTOM MIDDLEWARES
function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

// ROUTES
app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  req.session.user_id = user._id;
  res.redirect('/secret');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findAndValidate(username, password);

  if (user) {
    req.session.user_id = user._id;
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', async (req, res) => {
  req.session.user_id = null;
  res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
  res.render('secret', { title: 'Secret' });
});

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
});
