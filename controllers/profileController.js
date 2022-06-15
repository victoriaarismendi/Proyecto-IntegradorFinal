const db = require('../database/models');
var joyas = require ('../db/data');
var multer = require('multer');
const upload = multer({dest: 'public/images/upload'})


const profileController = {

myProfile: function(req, res) {
        db.User.findByPk(req.session.user.id, { include: [ { association: 'joya' } ] })
            .then(function (user) {
                res.render('profile', { user });
            })
            .catch(function (error) {
                res.send(error)
            });
    },

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
       
    },
    /*procesarEdit: function(req,res){
       let idEdit = req.params.id;

       db.User.update(
        {
            nombre: req.body.nombre,
            email: req.body.email,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            fotoDePerfil: req.body.fotoDePerfil
        },
        { where : {id: idEdit}
    })


       
    }*/
}

module.exports = profileController;