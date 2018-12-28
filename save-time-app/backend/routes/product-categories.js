const express = require("express");

const ProductCategory = require("../models/product-category");
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

router.get('', checkAuth, (req, res, next) => {
  ProductCategory.find( {userId: req.userId} ).then(productCategories => {
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

router.post('', checkAuth, (req, res, next) => {
  const newCategory = new ProductCategory({
    name: req.body.name.toLowerCase(), userId: req.userId
  });

  ProductCategory.findOne( {name: newCategory.name, userId: newCategory.userId }).then(category => {

    if (category) {
      res.status(400).json({
        error: "Category with given name already exists"
      });
    }

    newCategory.save().then(savedCategory => {
      res.status(201).json({
        savedCategory
      });
    }).catch(error => {
      res.status(400).json({
        error: "There is a problem with adding new category"
      });
    })
  });

});

router.patch('', checkAuth, (req, res, next) => {

  const category = new ProductCategory({
    _id: req.body._id,
    name: req.body.name,
    userId: req.userId
  });

  ProductCategory.updateOne( {_id: req.body._id }, category ).then(eCategory => {
    res.status(202).json({});
  }).catch(error => {
    res.status(400).json({ error: 'Cannot edit category' });
  });

});

router.delete('/:id', checkAuth, (req, res, next) => {
  ProductCategory.deleteOne( {_id: req.params.id }).then(dCat => {
      res.status(200).json({
        _id: req.params.id
      });
  }).catch(err => res.status(400).json( {error: 'There is a problem with removing category'} ));
});


module.exports = router;
