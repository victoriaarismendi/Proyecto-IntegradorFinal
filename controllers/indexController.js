var joyas = require('../db/data');
var db = require ('../database/models');

const indexController = {
    index: function(req, res){
       return res.render('index',{
           joyas: joyas.productos,
        })
    },
    login: function(req, res){
        return res.render('login', {title: 'login'})
    },
    access: function(req, res) {
        const user = db.User.findOne({ where: {username: req.body.username}})
        if (user.password == req.body.password) {
            res.redirect('/');
        } else {
            throw Error('Invalid credentials.')
        }
    },    
    register: function(req, res){
        return res.render('register')
    },
    store: function(req, res) {
        if (!req.body.email) { throw Error('Not email provided.') }
        db.User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
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
