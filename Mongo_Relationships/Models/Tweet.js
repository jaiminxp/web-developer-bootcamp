const mongoose = require('mongoose');
const { Schema } = mongoose;
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

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweet = async () => {
//   const user = await User.findOne({ name: 'chickenfan99' });
//   const tweet = new Tweet({
//     text: 'bok! bok! chickens make noise!',
//     likes: 0,
//   });

//   tweet.user = user;

//   //   await user.save();
//   await tweet.save();
//   console.log('✅ DONE!');
// };

// makeTweet();

const findTweet = async () => {
  const t = await Tweet.find({}).populate('user');
  console.log(t);
};

findTweet();
