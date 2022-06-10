var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

router.get('/id/:id',profileController.index);
router.get ('/edit/:id', profileController.edit);

module.exports = router;
