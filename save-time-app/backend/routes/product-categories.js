const express = require("express");

const ProductCategory = require("../models/product-category");
const router = express.Router();

router.get('', (req, res, next) => {
  ProductCategory.find().then(productCategories => {
    res.status(200).json({
      productCategories
    })
  })
  .catch(error => {
    res.status(400).json({
      error: 'There is a problem with reading product categories'
    });
  })
});

router.post('', (req, res, next) => {
  const newCategory = new ProductCategory({
    name: req.body.name.toLowerCase()
  });

  newCategory.save().then(savedCategory => {
    res.status(201).json({
      savedCategory
    });
  }).catch(error => {
    res.status(400).json({
      error: "Category with given name already exists"
    });
  })
});


module.exports = router;
