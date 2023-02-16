const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose
  .connect('mongodb://localhost:27017/relationshipDemo')
  .then(() => {
    console.log('CONNECTION OPEN!');
  })
  .catch((err) => {
    console.log('ERROR!');
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
  const u = new User({
    first: 'Harry',
    last: 'Potter',
  });

  u.addresses.push({
    street: '123 Sesame St.',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  });

  const res = await u.save();
  console.log(res);
};

makeUser();

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: '99 3rd St.',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  });

  const res = await user.save();
  console.log(res);
};

addAddress('63edc9c8dc9ceae74b55079a');
