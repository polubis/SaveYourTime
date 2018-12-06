const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/products", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/products", (req, res, next) => {
  const products = [
    { id: 0, name: 'Carrot', company: 'Lidl', type: 'wegetable', rate: 3.43, calories: 100, numberOfVotes: 10 },
    { id: 1, name: 'Pasta', company: 'Lidl', type: 'eating product', numberOfVotes: 10 },
    { id: 2, name: 'Onion', company: 'Lidl', type: 'wegetable' },
    { id: 3, name: 'Pepper', company: 'Lidl', type: 'wegetable' },
    { id: 4, name: 'Milk', company: 'Lidl', type: 'dairy', numberOfVotes: 10 },
    { id: 5, name: 'Eggs', company: 'Lidl', type: 'dairy', rate: 3.43, numberOfVotes: 10 },
    { id: 6, name: 'Oil', company: 'Lidl', type: 'cooking additivies', rate: 2, calories: 31, numberOfVotes: 10 },
    { id: 7, name: 'Shampoo', company: 'Lidl', type: 'washing stuff', rate: 3.3, numberOfVotes: 150 }
  ];

  res.status(200).json(products);
});

module.exports = app;



