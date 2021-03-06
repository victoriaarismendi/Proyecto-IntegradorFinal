var db = require('../database/models');
var multer = require('multer');
const upload = multer({
    dest: 'public/images/upload'
}) //destinantion a donde quiero que se guarden las imagenes 



const productController = {
    index: function (req, res) {
        db.Joya.findAll({
                include: {
                    all: true,
                    nested: false
                }, //con esto le digo que me traiga todas las relaciones 
                order: [
                    ['createdAt', 'DESC']
                ],

            }) //aca le digo al modelo que me traiga todo lo que encuentre
            .then(function (joyas) { //cuando pase lo de arriba, que me traiga lo que encontro y me muestre la vista de index
                
                res.render('index', {
                    joyas
                });
            })
            .catch(function (error) {
                res.send(error)
            });
    }, //esto pasa del modulo de datos a la base de datos

    add: function (req, res) {
        if(!req.session.user){ 
            throw Error ('Debes iniciar sesión o registrarte para agregar un producto')
        }
        res.render('product-add')
    },

    show: function (req, res) {
        db.Joya.findByPk(req.params.id, {
                include: {
                    all: true,
                    nested: true
                },
                order: [['comentarios', 'id', 'DESC']],
            })
            .then(function (joyas) {
                res.render('product', {
                    joyas
                });
            })
            .catch(function (error) {
                res.send(error);
            })

    },

    store: function (req, res) {
        if(!req.session.user){ 
            return res.render('product-add', {error:'Not authorized'})
        }
        req.body.usuario_id = req.session.user.id
        if (req.file) req.body.imagen = (req.file.path).replace('public', ''); //si viene un archivo fijate de traer la direccion local donde esta este archivo sacale public porque uqiero gurdqar todo sin el public
        db.Joya.create({
                producto: req.body.nombre,
                imagen: req.body.imagen,
                material: req.body.material,
                fechaDeCarga: req.body.fechaDeCarga,
                piedras: req.body.piedras,
                usuario_id: req.session.user.id
            })
            .then(function () {
                res.redirect('/')
            })
            .catch(function (error) {
                res.send(error);
            })
    },

    delete: async function (req, res) {
        try{
            const producto = await db.Joya.findByPk(req.params.id)
            if(producto.usuario_id != req.session.user.id){
                throw Error ('No has subido este producto')}
    
            if(!req.session.user){
                throw Error('Not authorized')}
            } catch (err){
                return res.send(err.message);
            }

            db.Joya.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect('/')
            })
            .catch(function (error) {
                res.send(error);
            })
        },
    
        
        

    edit: function (req, res) {
        if (!req.session.user) {
            throw Error('Not authorized.')
        }
        db.Joya.findByPk(req.params.id)
            .then(function (joyas) {
                res.render('product-edit', {
                    joyas
                });
            })
            .catch(function (error) {
                res.send(error);
            })
    },

    update: function (req, res) {

        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        
        
        db.Joya.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            .then(function (joya) {
                res.redirect('/')
            })
            .catch(function (error) {
                res.send(error);
            })


    },

    comment: function (req, res) {

        if(!req.session.user){ 
            return res.render('login', {error:'Iniciá sesión o registrate para comentar'})
        }
         
        if(req.session.user){
        req.body.usuario_id = req.session.user.id;
        req.body.producto_id = req.params.id;
        

        
        
        db.Comentario.create(req.body)
            .then(function () {
                res.redirect("/product/id/" + req.params.id)
            })
            .catch(function (error) {
                res.send(error);
            })
    
        }
    },

}


module.exports = productController;