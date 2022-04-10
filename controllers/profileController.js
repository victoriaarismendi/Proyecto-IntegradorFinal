var joyas = require ('../db/data');

const profileController = {
    index: function(req, res){
        return res.render('profile',{
            joyas: joyas.usuario,
            productos: joyas.producto
        })
    },
    edit: function(req,res){
        return res.render('profile-edit');
    },
};

module.exports = profileController;