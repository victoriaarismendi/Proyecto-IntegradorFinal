var joyas = require ('../db/data');

const productController = {
    index: function(req,res){
        return res.render('product',{
            joyas: joyas.comentarios
        })
    },
    add: function(req, res){
        return res.render('product-add')
    }
}

module.exports = productController;