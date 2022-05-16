var joyas = require ('../db/data');
var db = require ('../database/models');

const productController = {
    index: function(req,res){
        db.Joya.findAll()
        .then(function (joyas) {
            res.render('index', { joyas });
        })
        .catch(function (error) {
            res.send(error)
        });
    },
    add: function(req, res){
        return res.render('product-add')
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
        db.Joya.create(req.body)
            .then(function() {
                res.redirect('/')
            })
            .catch(function(error) {
                res.send(error);
            })
    }
}


module.exports = productController;