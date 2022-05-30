var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/logout', indexController.logout);
router.post ('/login', indexController.access);
router.get('/register', indexController.register);
router.post ('/register', indexController.store);
router.get ('/searchResults', indexController.index);


module.exports = router;

