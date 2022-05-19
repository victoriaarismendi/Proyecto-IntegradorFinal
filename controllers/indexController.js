var joyas = require('../db/data');
var db = require ('../database/models');
var hasher = require ('bcryptjs');


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

        db.User.findOne({ where: {username: req.body.username}})
        .then(function(user) {

        if (hasher.compareSync(req.body.password, user.password)) {
            res.redirect('/');
        } else {
            throw Error('Invalid credentials.')
        }
    })
        .catch(function(error) {
              throw Error ('Unable to retrieve user.')
        })
    },    
    register: function(req, res){
        return res.render('register')
    },
    store: function(req, res) {
        if (!req.body.email) { throw Error('Not email provided.') }
        const hashedPassword = hasher.hashSync(req.body.password, 10); 


        db.User.create({
                username: req.body.username,
                password: hashedPassword,
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
