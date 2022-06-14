//var joyas = require('../db/data');
var db = require('../database/models');
var op = db.Sequelize.Op;
var hasher = require('bcryptjs');


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


    search: function (req, res) {
        db.Joya.findAll({
                where: {
                    [op.or]: [{
                            producto: {
                                [op.like]: "%" + req.query.search + "%"
                            }
                        },
                        {
                            material: {
                                [op.like]: "%" + req.query.search + "%"
                            }
                        }
                    ]
                },
                include: [{
                    association: 'usuario'
                }]
            }).then(function (joyas) {
                res.render('index', {
                    joyas
                });
            })
            .catch(function (error) {
                res.send(error)
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
                if (hasher.compareSync(req.body.password, user.contraseña)) {
                    req.session.user = user;
                    if (req.body.rememberme) {
                        res.cookie('userId', user.id, {
                            maxAge: 1000 * 60 * 60 * 24 * 7
                        })
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
            if (req.body.contraseña.length < 4) {
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
        } catch (error) {
            res.render('register', {
                error: error.message
            });
            return;
        }
        if (req.file) req.body.fotoDePerfil = (req.file.path).replace('public','');
        const hashedPassword = hasher.hashSync(req.body.contraseña, 10);
        db.User.create({
                nombre: req.body.nombre,
                contraseña: hashedPassword,
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
    searchResults: function (req, res) {
        res.render('searchResults')
    }
};

module.exports = indexController;