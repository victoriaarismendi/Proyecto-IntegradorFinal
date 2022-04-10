var express = require('express');
var router = express.Router();
var controller = require('../controllers/productController');

//ruta para search result
router.get ('/search-results', controller.search);

//ruta de product y product-add, hacemos un solo router
router.get ('/:id', controller.product);
router.get ('/add', controller.search);



module.exports = router;
