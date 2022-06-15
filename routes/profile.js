var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');
var multer= require('multer');
const upload = multer({dest: 'public/images/uploads'});



router.get('/id/:id',profileController.index);
router.get ('/edit/:id', profileController.edit);
router.post ('/edit/:id', profileController.edit);


module.exports = router;
