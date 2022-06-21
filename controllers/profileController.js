const db = require('../database/models');
var multer = require('multer');
const upload = multer({
    dest: 'public/images/upload'
})
var hasher = require('bcryptjs');


const profileController = {

    myProfile: function (req, res) {
        if(!req.session.user){ 
            return res.render('login', {error:'Ingresá sesión para ver tu perfil'})
        }
        db.User.findByPk(req.session.user.id, {
                include: [{
                    all: true,
                    nested: true
                }]
            })
            .then(usuario => {
                return res.render('profile', {
                    usuario: usuario
                })

            })
            
            .catch(function(error){
                res.send(error)
            })
    },

    profile: function (req, res) {
        if(req.session.user){
        if(req.session.user.id == req.params.id){res.redirect('/profile/myprofile')}}
        db.User.findByPk(req.params.id, {include: {all: true, nested: false}})
        .then(function(data){
                res.render('profile', {usuario: data})
            }) 
                    


    },

    edit: function (req, res) {
        if (req.session.user && req.session.user.id == req.params.id) {
            return res.render('profile-edit', {
                usuario: req.session.user
            });
        } else {
            throw Error('Not authorized')
          
        }

    },
    
    procesarEdit: async function (req, res) {
        try {
            if (!req.body.email) {
                throw Error('Not email provided.')
            }
            if (!req.body.nombre) {
                throw Error('Not username provided.')
            }
            const user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user && user.email != req.session.user.email) {
                throw Error('Email already in use')
            }
            if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        } catch (err) {
            return res.render('register', {
                error: err.message
            });

        }
        let usuario = {
            nombre: req.body.nombre,
            email: req.body.email
        }
        if (req.file) usuario.fotoDePerfil = req.body.imagen
        if (req.body.contrasena) usuario.contrasena = hasher.hashSync(req.body.contrasena, 10);
        if (req.body.fechaDeNacimiento) usuario.fechaDeNacimiento = req.body.fechaDeNacimiento;
        db.User.update(usuario, {
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect('/profile/id/' + req.params.id);
            })
            .catch(function (error) {
                res.send(error);
            })

    }
};

module.exports = profileController;