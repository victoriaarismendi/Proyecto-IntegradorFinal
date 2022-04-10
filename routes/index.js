var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexController');

router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/register', controller.register);
//router.get('/product-add', controller.productAdd);
//router.get('/product', controller.product);
router.get('/profile-edit', controller.profileEdit);
router.get('/profile', controller.profile);
//router.get('/search-results', controller.search);



module.exports = router;

