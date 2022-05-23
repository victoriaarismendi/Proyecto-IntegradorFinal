var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');


//ruta de product y product-add, hacemos un solo router
router.get ('/', productController.index);
router.get ('/add', productController.add);
router.get ('/:id/edit', productController.edit);
router.post('/add', productController.store);
router.post('/:id/delete', productController.delete);
router.get('/:id', productController.show);



module.exports = router;
