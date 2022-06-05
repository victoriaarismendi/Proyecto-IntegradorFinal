//var joyas = require('../db/data');
var db = require ('../database/models');
var hasher = require ('bcryptjs');


const indexController = {
    index: function(req, res){
        res.redirect('/product')
    },
    login: function(req, res){
        return res.render('login', {title: 'login'});
    },

    access: function(req, res, next) {
        db.User.findOne({ where: {email: req.body.username}})
        .then(function(user) {
        if (!user) throw Error ('User not found.')
        if (hasher.compareSync(req.body.password, user.contraseña)) {
            req.session.user = user;
            if (req.body.rememberme){
                res.cookie('userId', user.id, {maxAge: 1000 * 60 * 60 * 24 * 7})
            }
            res.redirect('/');
        } else {
            throw Error('Invalid credentials.')
        }
    })
        .catch(function(error) {
            next (error)
        })
    },    

    logout: function(req, res, next){
        req.session.user = null;
        res.clearCookie ('userId');
        res.redirect ('/')
    },
    register: function(req, res){
        return res.render('register')
    },

    store: function(req, res) {
        if (!req.body.email) { throw Error('Not email provided.') }
        const hashedPassword = hasher.hashSync(req.body.contraseña, 10); 
        db.User.create({
                nombre: req.body.nombre,
                contraseña: hashedPassword,
                email: req.body.email,
                fechaDeNacimiento: req.body.fechaDeNacimiento
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    searchResults: function(req, res){
        res.render('searchResults')
    }
};

module.exports = indexController;
