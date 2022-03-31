const controller = {
    index: function(req, res){
        res.render('index');
    },
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register')
    },
    productAdd: function(req, res){
        res.render('product-add')
    },
    product: function(req, res){
        res.render('product')
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

