var joyas = require ('../db/data');

const productController = {
    index: function(req,res){
        return res.render('product',{
            joyas: joyas.productos[0],
            comentarios: joyas.comentarios
        })
    },
    add: function(req, res){
        return res.render('product-add')
    }
}

module.exports = productController;