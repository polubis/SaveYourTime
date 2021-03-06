const express = require("express");

const Product = require("../models/product");
const multer = require("multer");
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const imagesService = require('../services/image');

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

router.get('', checkAuth, (req, res, next) => {

  const size = +req.query.size;
  const page = +req.query.page;
  const productsQuery = Product.find({userId: req.userId});
  let products;
  if (size && page) {
    productsQuery.skip((page - 1) * size).limit(size);
  }
  productsQuery.then(documents => {
    products = documents;
    return Product.countDocuments( {userId: req.userId} );
  })
  .then(count => {
    res.status(200).json({
      count,
      products
    })
  })
  .catch(error => {
    res.status(400).json({
      error: 'There is a problem with fetching products. Query params can be incorrect'
    });
  });
});

router.post('', checkAuth, multer({ storage: storage }).single("picturePath"), (req, res, next) => {
  const product = new Product({
    ...req.body, userId: req.userId
  });

  if (req.file) {
    const picturePath = req.protocol + '://' + req.get('host') + '/images/products/';
    product.picturePath = picturePath + req.file.filename;
  }

  product.save().then(sProduct => {
    res.status(201).json({ product: sProduct });
  })
  .catch(err => {
    imagesService.deleteImage(product.picturePath, function(err) {
      res.status(400).json({ error: 'There is a problem with adding product' })
    });
  });

});

router.patch('/rate/:id', checkAuth, (req, res, next) => {
  const productId = req.params.id;
  Product.findOne( { _id: productId } ).then(product => {
    const { rate } = req.body;

    const newProduct = new Product({
      ...product, rate, _id: req.params.id, userId: req.userId
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

router.delete('/:id', checkAuth, (req, res, next) => {

  Product.findOne( {_id: req.params.id} ).then(product => {
    if (product.picturePath) {

      imagesService.deleteImage(product.picturePath, function(err) {
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
    deleteImage(product.picturePath, function(err) {
      res.status(400).json({ error: 'Cannot edit product. Make sure all data is in correct format' })
    });
  });
}

router.patch('/:id', checkAuth, multer({ storage: storage }).single("picturePath"), (req, res, next) => {

    Product.findOne( { _id: req.params.id } ).then(product => {

      const newProduct = new Product({
        ...req.body, _id: req.params.id, picturePath: product.picturePath, userId: req.userId
      });

      const isImageAlreadyAdded = product.picturePath;
      const isFileInReq = req.file ? req.file.size > 0 ? true : false : false;

      if (isFileInReq) {
          const savePath = req.protocol + '://' + req.get('host') + '/images/products/';
          newProduct.picturePath = savePath + req.file.filename;
      }

      if (isImageAlreadyAdded && isFileInReq) {
        imagesService.deleteImage(product.picturePath, function() {
          update(newProduct, req.params.id, res);
        });
      }
      else if(req.body.picturePath === '' && isImageAlreadyAdded) {
        imagesService.deleteImage(product.picturePath, function() {
          newProduct.picturePath = '';
          update(newProduct, req.params.id, res);
        });
      }
      else {
        update(newProduct, req.params.id, res);
      }


    }).catch(error => {
      imagesService.deleteImage(req.body.picturePath, function() {
        res.status(400).json({error: "Product with given id doesn't exists"})
      });
    });

});

module.exports = router;
