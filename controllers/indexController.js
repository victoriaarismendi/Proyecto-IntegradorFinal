var joyas = require('../db/data')

const controller = {
    index: function(req, res){
       res.render('index', {joyas: joyas.productos});
    
    },
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register')
    },
    product: function(req, res){
        res.render('product', {joyas: joyas.productos})
    },
    add: function(req, res){
        res.render('product-add', {joyas: joyas.productos})
    },
    profileEdit: function(req, res){
        res.render('profile-edit')
    },
    profile: function(req, res){
        res.render('profile')
    }
};

module.exports = controller
