const express = require("express");

const Product = require("../models/product");

const router = express.Router();

router.get('', (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      products: documents
    });
  });
});

router.post('', (req, res, next) => {
  const { name, company, type, picturePath, rate, calories, numberOfVotes } = req.body;
  const product = new Product({
    name, company, type, picturePath, rate, calories, numberOfVotes
  });

  product.save().then(createdProduct => {
    res.status(201).json({
      _id: createdProduct._id
    });
  }).catch(error => {
    res.status(400).json({
      error: 'Product with that name already exist'
    });
  });
});

// router.post("", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: createdPost._id
//     });
//   });
// });

// router.put("/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

// router.get("", (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

module.exports = router;
