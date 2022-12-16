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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The price must be positive"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

productSchema.methods.greet = function () {
  console.log("HIII!");
  console.log(`- from ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCatrgory = function (category) {
  this.categories.push(category);
  return this.save();
};

const Product = new mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCatrgory("Outdoors");
  console.log(foundProduct);
};

findProduct();

// //not including a required property (name)
// const bike = new Product({
//   price: 599,
// });

// bike.save().then(success).catch(error);

// //using different datatype(String) for price(Number )
// const bike2 = new Product({
//   name: "Mountain Bike",
//   price: "799",
// });

// bike2.save().then(success).catch(error);

// //adding property that is not present in product schema (color)
// const bike3 = new Product({
//   name: "Mountain Bike",
//   price: 999,
//   color: "red",
// });

// bike3.save().then(success).catch(error);

// //name is longer than maxlength, price is less than 0
// const helmet = new Product({
//   name: "Bike helmet from helmet makers",
//   price: -29.99,
//   color: "black",
//   onSale: true,
// });

// helmet.save().then(success).catch(error);

// //using array datatype for categories
// const helmet2 = new Product({
//   name: "Bike helmet",
//   price: 29.99,
//   color: "black",
//   onSale: true,
//   categories: ["accesories"],
// });

// helmet2.save().then(success).catch(error);

// //using object datatype for qty
// const tesla = new Product({
//   name: "Model S",
//   price: 690000,
//   color: "Silver",
//   onSale: true,
//   categories: ["accesories"],
//   size: "XL",
// });

// tesla.save().then(success).catch(error);

// //updating with validations
// Product.findOneAndUpdate(
//   { name: "Model S" },
//   { price: -19.99 },
//   { new: true, runValidators: true }
// )
//   .then(success)
//   .catch(error);
