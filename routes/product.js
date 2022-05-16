var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');


//ruta de product y product-add, hacemos un solo router
router.get ('/id/:id?', productController.index);
router.get ('/add', productController.add);
router.post('/add', productController.store);
router.get('/:id', productController.show);


module.exports = router;
