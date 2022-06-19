const db = require('../database/models');
var joyas = require('../db/data');
var multer = require('multer');
const upload = multer({
    dest: 'public/images/upload'
})
var bcrypt = require('bcryptjs');


const profileController = {

    myProfile: function (req, res) {
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

    index: function (req, res) {
        if(req.session.user){
        if(req.session.user.id == req.params.id){res.redirect('/profile ')}}
        db.User.findByPk(req.params.id, {include: {all: true, nested: false}})
        .then(function(data){
            db.Joya.findAll({
                where: [
                    {usuario_id: req.params.id}
                ],
                include: {all: true, nested: false}
            }) .then(function(products){
                console.log(products);
                res.render('profile', {user: data, products})
            }) 
                    
        })
        /*.then (function(user ){
            res.render ('profile', {user})
        }) */



    },
    edit: function (req, res) {
        if (req.session.user && req.session.user.id == req.params.id) {
            return res.render('profile-edit', {
                usuario: req.session.user
            });
        } else {
            res.redirect('/')
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