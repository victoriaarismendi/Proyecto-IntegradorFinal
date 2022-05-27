//var joyas = require ('../db/data');
var db = require ('../database/models');


const productController = {
    index: function(req,res){
        db.Joya.findAll()
        .then(function (joyas) {
            console.log(joyas);
            res.render('index', { joyas });
        })
        .catch(function (error) {
            res.send(error)
        });
    },
    add: function(req, res){
        res.render('product-add')
    },
    show: function(req, res) {
        db.Joya.findByPk(req.params.id)
            .then(function (joyas) {
                res.render('joyas_show', { joyas });
            })
            .catch(function (error) {
                res.send(error);
            })

    },
    
    store: function(req, res) {
        req.body.user_id = req.session.user.id;
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
}


module.exports = productController;