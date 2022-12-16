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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema);

//not including a required property (name)
const bike = new Product({
  price: 599,
});

bike
  .save()
  .then((data) => {
    console.log("PRODUCT SAVED TO DB!");
    console.log(data);
  })
  .catch((err) => {
    console.log("ERROR SAVING TO DB!");
    console.log(err);
  });

//using different datatype(String) for price(Number )
const bike2 = new Product({
  name: "Mountain Bike",
  price: "799",
});

bike2
  .save()
  .then((data) => {
    console.log("PRODUCT SAVED TO DB!");
    console.log(data);
  })
  .catch((err) => {
    console.log("ERROR SAVING TO DB!");
    console.log(err);
  });

//adding property that is not present in product schema (color)
const bike3 = new Product({
  name: "Mountain Bike",
  price: 999,
  color: "red",
});

bike3
  .save()
  .then((data) => {
    console.log("PRODUCT SAVED TO DB!");
    console.log(data);
  })
  .catch((err) => {
    console.log("ERROR SAVING TO DB!");
    console.log(err);
  });
