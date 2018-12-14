const express = require("express");

const Product = require("../models/product");
const multer = require("multer");
const router = express.Router();

const ALLOWED_MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = ALLOWED_MIME_TYPES[file.mimetype];
    const error = isValid ? null : 'Invalid mime type';
    cb(error, "backend/images/products");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = ALLOWED_MIME_TYPES[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.get('', (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      products: documents
    });
  });
});

router.post('', multer({ storage: storage }).single("picturePath"), (req, res, next) => {
  const { name, company, type, calories } = req.body;
  const product = new Product({
    name, company, type, calories
  });
  if (req.file) {
    const picturePath = req.protocol + '://' + req.get('host') + '/images/products/';
    product.picturePath = picturePath + req.file.filename;
  }

  product.save().then(createdProduct => {
    res.status(201).json({
      product: createdProduct
    });
  }).catch(error => {
    res.status(400).json({
      error: 'Product with that data cannot be created. Try again later'
    });
  });
});

router.patch('/:id', multer({ storage: storage }).single("picturePath"), (req, res, next) => {
  const { name, company, type, rate, calories, numberOfVotes } = req.body;

  const product = new Product({
    _id: req.params.id, name, company, type, rate, calories, numberOfVotes
  });
  console.log(req.file);
  if (req.file) {
    const picturePath = req.protocol + '://' + req.get('host') + '/images/products/';
    product.picturePath = picturePath + req.file.filename;
  } else {
  }

  Product.updateOne( {_id: req.params.id }, product ).then(editedProduct => {
    res.status(202).json({
      product: product
    });
  }).catch(error => {
    res.status(400).json({
      error: 'Cannot edit product. Make sure all data is in correct format'
    })
  });
})

router.delete('/:id', (req, res, next) => {
  Product.deleteOne( {_id: req.params.id } ).then(deletedProduct => {
    res.status(200).json({
      _id: req.params.id
    });
  }).catch(error => {
    res.status(400).json({
      error: "Cannot delete selected product. Probably wrong idnetifier"
    })
  })
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
