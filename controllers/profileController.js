const db = require('../database/models');
var joyas = require ('../db/data');

const profileController = {
    index: function(req, res){
        db.User.findByPk(req.session.user.id, {includes: [{association: 'joya'}]})
        .then(usuario=>{
            return res.render('profile',{
                usuario: usuario
                
            })
        })
        
    },
    edit: function(req,res){
        if(req.session.user && req.session.user.id == req.params.id){
            return res.render('profile-edit');
        } else{
            res.redirect('/')
        }
       
    }
}

module.exports = profileController;