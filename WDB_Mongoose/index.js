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
