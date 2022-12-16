const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

function success(data) {
  console.log("PRODUCT SAVED TO DB!");
  console.log(data);
}

function error(err) {
  console.log("ERROR SAVING TO DB!");
  console.log(err);
}

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

const Person = new mongoose.model("Person", personSchema);

const jaimin = new Person({ first: "Jaimin", last: "Parmar" });

console.log(jaimin.fullName);
