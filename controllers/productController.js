//var joyas = require ('../db/data');
var db = require ('../database/models');


const productController = {
    index: function(req,res){
        db.Joya.findAll() //aca le digo al modelo que me traiga todo lo que encuentre
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
        req.body.user_id = req.session.user.id;
        if (req.file) req.body.cover = (req.file.path).replace('public','');
        db.Joya.create(req.body) 
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    delete: function(req, res) {
        db.Joya.destroy({ where: {id: req.params.id}})
            .then(function(joyas) {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    edit: function(req, res) {
        db.Joya.findByPk(req.params.id)
            .then(function() {
                res.render('joyas-edit', {joyas});
            })
            .catch(function(error) {
                res.send(error);
            })
    },

    update: function(req, res) {
        db.Joya.update(req.body, { where: { id: req.params.id } })
            .then(function(joyas) {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    },
    comment: function(req, res) {
        if (!req.session.user) { 
            throw Error('Not authorized.')
        }
        // Set user from session user
        req.body.usuario_id = req.session.user.id;
        // Set book from url params
        req.body.book_id = req.params.id;
        db.Comentario.create(req.body)
            .then(function() {
                res.redirect('/product' + req.params.id)
            })
            .catch(function(error) {
                res.send(error);
            })
    },
}


module.exports = productController;