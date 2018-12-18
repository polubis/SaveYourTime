const express = require("express");

const Product = require("../models/product");
const multer = require("multer");
const fs = require('fs');
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

  const size = +req.query.size;
  const page = +req.query.page;
  const productsQuery = Product.find();
  let products;
  console.log(size, page);
  if (size && page) {
    productsQuery.skip((page - 1) * size).limit(size);
  }

  productsQuery.then(documents => {
    products = documents;
    return Product.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      count,
      products
    })
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      error: 'There is a problem with fetching products. Query params can be incorrect'
    });
  });
});

function deleteImage (picPath, cb, delPath = '/backend/images/products/') {
  const indexOfLastSlash = picPath.lastIndexOf("/");
  const picName = picPath.slice(indexOfLastSlash + 1, picPath.length);
  const initPath = process.cwd() + delPath + picName;

  fs.stat(initPath, function(err, stats) {
    if(!err) {
      fs.unlink(initPath, function(err){
        cb(err);
      });
    }
  })
}

router.post('', multer({ storage: storage }).single("picturePath"), (req, res, next) => {
  const product = new Product({
    ...req.body
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




router.patch('/rate/:id', (req, res, next) => {
  const productId = req.params.id;
  Product.findOne( { _id: productId } ).then(product => {
    const { rate } = req.body;

    const newProduct = new Product({
      ...product, rate, _id: req.params.id
    });

    Product.updateOne( { _id: productId }, newProduct ).then(addedProduct => {
      res.status(202).json({
      });
    }).catch(error => {
      res.status(400).json({
        error: 'Rate value is incorrect'
      });
    });
  }).catch(error => {
    res.status(400).json({
      error: "Product with given id doesn't exist"
    })
  })
});

router.delete('/:id', (req, res, next) => {

  Product.findOne( {_id: req.params.id} ).then(product => {
    if (product.picturePath) {

      deleteImage(product.picturePath, function(err) {
        Product.deleteOne( {_id: req.params.id } ).then(deletedProduct => {
          res.status(200).json({
            _id: req.params.id
          });
        }).catch(error => {
          res.status(400).json({
            error: "Cannot delete selected product entity"
          })
        });
      });

    } else {
      Product.deleteOne( {_id: req.params.id } ).then(deletedProduct => {
        res.status(200).json({
          _id: req.params.id
        });
      }).catch(error => {
        res.status(400).json({
          error: "Cannot delete selected product. Probably wrong idnetifier"
        })
      });
    }

  }).catch(error => {
    res.status(400).json({
      error: "Product with given id doesn't exists"
    });
  })
});

function update(product, id, res) {
  Product.updateOne( {_id: id }, product ).then(editedProduct => {
    res.status(202).json({
      product: product
    });
  }).catch(error => {
    res.status(400).json({
      error: 'Cannot edit product. Make sure all data is in correct format'
    })
  });
}

router.patch('/:id', multer({ storage: storage }).single("picturePath"), (req, res, next) => {
    Product.findOne( { _id: req.params.id } ).then(product => {

      const newProduct = new Product({
        ...req.body, _id: req.params.id, picturePath: product.picturePath
      });

      const isImageAlreadyAdded = product.picturePath;
      const isFileInReq = req.file ? req.file.size > 0 ? true : false : false;

      if (isFileInReq) {
          const savePath = req.protocol + '://' + req.get('host') + '/images/products/';
          newProduct.picturePath = savePath + req.file.filename;
      }

      if (isImageAlreadyAdded && isFileInReq) {
        deleteImage(product.picturePath, function() {
          update(newProduct, req.params.id, res);
        });
      }
      else if(req.body.picturePath === '' && isImageAlreadyAdded) {
        deleteImage(product.picturePath, function() {
          newProduct.picturePath = '';
          update(newProduct, req.params.id, res);
        });
      }
      else {
        update(newProduct, req.params.id, res);
      }


    }).catch(error => {
      res.status(400).json({error: "Product with given id doesn't exists"})
    });

});

module.exports = router;
