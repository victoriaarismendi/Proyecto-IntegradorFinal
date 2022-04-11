var joyas = require ('../db/data');

const profileController = {
    index: function(req, res){
        return res.render('profile',{
            usuario: joyas.usuarios,
            
        })
    },
    edit: function(req,res){
        return res.render('profile-edit');
    },
};

module.exports = profileController;