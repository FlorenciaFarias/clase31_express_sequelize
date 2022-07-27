const {index,one} = require('../models/product.model');
module.exports = {
    home: (req,res) => {
        return res.render('index',{
            styles: ['index'],
            products: index()
        })
    }
}
