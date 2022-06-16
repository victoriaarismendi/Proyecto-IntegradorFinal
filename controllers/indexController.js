//var joyas = require('../db/data');
var db = require('../database/models');
var op = db.Sequelize.Op;
var hasher = require('bcryptjs');
const data = require('../db/data');


const indexController = {
    index: function (req, res) {
        res.redirect('/product')
    },
    login: function (req, res) {
        if (req.session.user) {
            res.redirect('/')
        }
        return res.render('login', {
            title: 'login'
        });
    },


    access: function (req, res, next) {
        db.User.findOne({
                where: {
                    email: req.body.username
                }
            })
            .then(function (user) {
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.password, user.contrasena)) {
                    req.session.user = user;
                    if (req.body.rememberme) {
                        res.cookie('userId', user.id, {
                            maxAge: 1000 * 60 * 60 * 24 * 7
                        }) //la cookie vive una semana
                    }
                    res.redirect('/');
                } else {
                    throw Error('Invalid credentials.')
                }
            })
            .catch(function (error) {
                next(error)
            })
    },

    logout: function (req, res, next) {
        req.session.user = null;
        res.clearCookie('userId');
        res.redirect('/')
    },
    register: function (req, res) {
        if (req.session.user) {
            res.redirect('/')
        }
        return res.render('register')
    }, //muestro el formulario 

    store: async function (req, res) { //este lo procesa
        try {
            if (!req.body.email) {
                throw Error('Not email provided.')
            }
            if (!req.body.nombre) {
                throw Error('Not username provided.')
            }
           if (req.body.contrasena.length < 4) {
                throw Error('Password too short.')
            }
            const user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                throw Error('Email already in use')
            }
            if (req.file) req.body.imagen = (req.file.path).replace('public','');
        } catch (err) {
           return res.render('register', {error: err.message });
            
        }
        if (req.file) req.body.fotoDePerfil = (req.file.path).replace('public','');
        const hashedPassword = hasher.hashSync(req.body.contrasena, 10);
        db.User.create({
                nombre: req.body.nombre,
                contrasena: hashedPassword,
                email: req.body.email,
                fechaDeNacimiento: req.body.fechaDeNacimiento,
                fotoDePerfil: req.body.fotoDePerfil
            })
            .then(function () {
                res.redirect('/login');
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    
    search: function (req, res) {
        db.Joya.findAll({
                where: {
                    [op.or]: [
                        {producto: {[op.like]: "%" + req.query.search + "%"}},
                        {material: {[op.like]: "%" + req.query.search + "%"}}
                    ]
                },
                include: {all: true, nested:true}
                })

        .then (function (joyas) {
                res.render('search-results',{products:joyas});
        })

        .catch(function (error) {
            res.send(error)
                
        });
    },
};

module.exports = indexController;