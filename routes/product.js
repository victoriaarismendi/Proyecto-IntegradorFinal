var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
var multer= require('multer');
const upload = multer({dest: 'public/images/uploads'});

router.get ('/', productController.index);

router.get ('/add', productController.add);
router.post('/add', upload.single('imagen'), productController.store); //entre parentesis va el name que tenga mi imagen en el formulario

router.get ('/:id/edit', productController.edit);
router.post('/:id/edit', upload.single('imagen'),productController.update);

router.post('/:id/delete', productController.delete);


router.post('/:id/comment', productController.comment);

router.get('/id/:id', productController.show);



module.exports = router;
