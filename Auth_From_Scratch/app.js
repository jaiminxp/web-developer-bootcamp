const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

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
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// ROUTES
app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);

  const user = new User({
    username,
    password: hash,
  });

  await user.save();
  res.redirect('/');
});

app.get('/secret', (req, res) => {
  res.send('!!SECRET!!');
});

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
});
