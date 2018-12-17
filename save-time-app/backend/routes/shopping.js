const express = require("express");

const Shopping = require("../models/shopping");
const router = express.Router();

router.post('', (req, res, next) => {
  const shopping = new Shopping({
    ...req.body
  });

  shopping.save().then(savedShopping => {
    res.status(201).json({
      shopping: savedShopping
    });
  }).catch(error => {
    console.log(error);
    res.status(400).json({
      error: 'There is a problem with saving shopping. Check is data in correct format'
    });
  });
});

router.patch('/:id', (req, res, next) => {
  const newShopping = new Shopping({
    ...req.body, _id: req.params.id
  });

  Shopping.updateOne( { _id: req.params.id }, newShopping ).then(shopping => {
    res.status(202).json({
      shopping
    });
  }).catch(error => {
    console.log(error);
    res.status(400).json({
      error: "There is a problem with updating selected shopping"
    });
  });
});

router.get('', (req, res, next) => {
  Shopping.find().then(shoppings => {
    res.status(200).json({
      shoppings
    })
  }).catch(error => {
    console.log(error);
    res.status(400).json({
      error: 'There is a problem with downloading shoppings. Try again later'
    })
  });
});

module.exports = router;
