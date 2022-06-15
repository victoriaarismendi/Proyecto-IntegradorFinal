var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var multer= require('multer')
var upload = multer({dest:'public/images/uploads'})

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post('/logout', indexController.logout);
router.post ('/login', indexController.access);
router.get('/register', indexController.register);
router.post ('/register', upload.single('fotoDePerfil') ,indexController.store);
router.get ('/search', indexController.search);




module.exports = router;

