var joyas = require('../db/data')

const controller = {
    index: function(req, res){
        res.render('index', {joyas: joyas.produtos});
    },
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register')
    },
    productAdd: function(req, res){
        res.render('product-add', {joyas: joyas.produtos})
    },
    product: function(req, res){
        res.render('product', {joyas: joyas.produtos})
    },
    profileEdit: function(req, res){
        res.render('profile-edit')
    },
    profile: function(req, res){
        res.render('profile')
    },
    search: function(req, res){
        res.render('search-results')
    },
};

module.exports = controller
