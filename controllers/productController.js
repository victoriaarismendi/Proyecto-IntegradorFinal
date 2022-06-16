//var joyas = require ('../db/data');
var db = require ('../database/models');
var multer = require('multer');
const upload = multer({dest: 'public/images/upload'}) //destinantion a donde quiero que se guarden las imagenes 


const productController = {
    index: function(req,res){
        db.Joya.findAll({
            include: {all: true, nested: false },
            order: [ ['id', 'DESC' ]],

        }
        ) //aca le digo al modelo que me traiga todo lo que encuentre
        .then(function (joyas) { //cuando pase lo de arriba, que me traiga lo que encontro y me muestre la vista de index
            console.log(joyas);
            res.render('index', { joyas });
        })
        .catch(function (error) {
            res.send(error)
        });
    }, //esto pasa del modulo de datos a la base de datos
    add: function(req, res){
        res.render('product-add')
    },
    show: function(req, res) {
        db.Joya.findByPk(req.params.id, { include: {all: true, nested: true}})
            .then(function (joyas) {
                res.render('product', { joyas });
            })
            .catch(function (error) {
                res.send(error);
            })

    },
    
    store: function(req, res) {
        //req.body.user_id = req.session.user.id; 
        if (req.file) req.body.imagen = (req.file.path).replace('public',''); //si viene un archivo fijate de traer la direccion local donde esta este archivo sacale public porque uqiero gurdqar todo sin el public
        db.Joya.create({
            producto: req.body.nombre,
            imagen: req.body.imagen,
            material: req.body.material,
            fechaDeCarga: req.body.fechaDeCarga,
            piedras: req.body.piedras,
            usuario_id: req.session.user.id 
        }) 
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    delete: function(req, res) {
        if(!req.session.user){
            throw Error('Not authorized.')
        }
        db.Joya.destroy({ where: {id: req.params.id}})
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    edit: function(req, res) { 
       
        db.Joya.findByPk(req.params.id)
            .then(function(joyas) {
                res.render('product-edit', {joyas});
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    update: function(req, res) {
       
        console.log(req.body)

        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.Joya.update(
            req.body, 
            {
            where: {id:req.body.id}
        })
        .then(function(joya) {
            res.redirect('/')
        })
        .catch(function(error) {
            res.send(error);
        })

    },
           
   
    comment: function(req, res) {
        if (!req.session.user) { 
            throw Error('Iniciá sesión o registrate para comentar')
        }
        req.body.usuario_id = req.session.user.id;
        req.body.producto_id = req.params.id;
        db.Comentario.create(req.body)
            .then(function() {
                res.redirect('/product/id/' + req.params.id)
            })
            .catch(function(error) {
                res.send(error);
            })
    },

}


module.exports = productController;