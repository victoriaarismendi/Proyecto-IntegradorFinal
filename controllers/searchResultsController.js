var joyas = require ('../db/data');

const  searchResultsController = {
    searchResults: function(req, res){
        res.render('searchResults')
    }
}

module.exports = searchResultsController;