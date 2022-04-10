var joyas = require ('../db/data');

const controller = {
    search: function (req, res) {
        res.render ('search-result');
    },
    product: function (req, res) {
       res.render ('product') 
    },
    add: function (req, res) {
        res.render ('product-add')
    }
}

module.exports = controller