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
            .then(function (user) { //user es el resultado de todo lo que puse arriba, el resultado de lo que guarde en la base de datos. 
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.password, user.contrasena)) {
                    req.session.user = user; //guarda en la sesion, o sea del lado el servidor en esto. En adelante voy a identificar todas las request del mismo usuario por esto
                    if (req.body.rememberme) { //si el usuario clickeo rememberme agrego una cookie 
                        res.cookie('userId', user.id, {
                            maxAge: 1000 * 60 * 60 * 24 * 7
                        }) //guardo del lado del cliente una cookie que dura 7 horas
                    }
                    res.redirect('/');
                } else {
                    throw Error('Email o contraseña incorrecto')
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
            } //esto es una validacion a nivel base de datos y que sea unico
            if (req.file) req.body.imagen = (req.file.path).replace('public', '');

        } catch (err) {
            return res.render('register', {
                error: err.message,
            });
            next(); //estructura try catch es parecido a las promesas, si hay un error renderiza el formulario con un valor nuevo que es el error. en el que procesa el formulario, si viene un error, vuelvo a mostrar un error y nada mas

        }
        if (req.file) req.body.fotoDePerfil = (req.file.path).replace('public', '');
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
                    [op.or]: [{
                            producto: {
                                [op.like]: "%" + req.query.search + "%"
                            }
                        },
                        {
                            material: {
                                [op.like]: "%" + req.query.search + "%"
                            }
                        },
                        {
                            piedras: {
                                [op.like]: "%" + req.query.search + "%"
                            }
                        }

                    ]
                },
                include: {
                    all: true,
                    nested: true
                }
            })

            .then(function (joyas) {
                res.render('search-results', {
                    products: joyas
                });
            })

            .catch(function (error) {
                res.send(error)

            });
    },
};

module.exports = indexController;