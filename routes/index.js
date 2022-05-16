var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post ('/login', controller.access);
router.get('/register', indexController.register);
router.post ('/register', controller.store);
router.get ('/searchResults', indexController.index);


module.exports = router;

