const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

const avatar = new Movie({
  title: "Avatar",
  year: 2009,
  score: 9.8,
  rating: "PG-13",
});

Movie.insertMany([
  { title: "Thor", year: 2011, score: 8, rating: "PG-13" },
  { title: "Top Gun Maverick", year: 2022, score: 10, rating: "R" },
  { title: "Don't Look Up", year: 2022, score: 7, rating: "R" },
  { title: "Infinity War", year: 2018, score: 10, rating: "PG-13" },
  { title: "Creep", year: 2007, score: 8.5, rating: "R" },
]).then((data) => {
  console.log("IT WORKED!");
  console.log(data);
});

//Finding data
Movie.find({ title: "Avatar" }).then((res) => console.log(res));

//Finding by Id
Movie.findById("62d6543c6ddb49c14de9e4a1").then((res) => console.log(res));

//Updating data
Movie.updateMany(
  { title: { $in: ["Infinity War", "Thor"] } },
  { score: 10 }
).then((res) => console.log(res));

//Return the updated result
Movie.findOneAndUpdate(
  { title: "batman" },
  { title: "The Batman" },
  { new: true }
).then((res) => console.log(res));

//Deleting data
Movie.deleteMany({ year: { $lt: 2022 } }).then((res) => console.log(res));

//Return the deleted result
Movie.findOneAndDelete({ title: "The Batman" }).then(printRes);

function printRes(res) {
  console.log(res);
}
