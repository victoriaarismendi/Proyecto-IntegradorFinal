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
    procesarEdit: function(req, res){
        req.body.contraseña =bcrypt.hashSync(req.body.contraseña, 10)
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.User.update(req.body,{where: {id: req.session.user.id}})
            .then(function(data){
                if (req.file){
                    req.session.user.fotoDePerfil = req.body.fotoDePerfil;
                   
                }
                res.redirect('/')
            })

            .catch(function(error){
                res.send(error)
            })
    }
};

module.exports = profileController;