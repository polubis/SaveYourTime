const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const shoppingRoutes = require("./routes/shopping");
const productCategoriesRoutes = require("./routes/product-categories");
const userSettingsRoutes = require('./routes/user-settings');
const app = express();
mongoose
.connect(
  'mongodb://localhost:27017/test'
)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images/products", express.static(path.join("backend/images/products")));
app.use("/images/avatars", express.static(path.join("backend/images/avatars")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/product/categories", productCategoriesRoutes);
app.use('/api/usersettings', userSettingsRoutes);

module.exports = app;
