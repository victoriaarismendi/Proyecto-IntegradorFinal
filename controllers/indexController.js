var joyas = require('../db/data')

const indexController = {
    index: function(req, res){
       return res.render('index',{
           joyas: joyas.productos,
        })
    },
    login: function(req, res){
        return res.render('login', {title: 'login'})
    },
    register: function(req, res){
        return res.render('register')
    },
    searchResults: function(req, res){
        res.render('searchResults')
    }
};

module.exports = indexController;
