const {product} = require('../database/models/index')
const { Op } = require("sequelize")
module.exports = {
    home: async  (req,res) => {
        let products = await product.findAll({
            where:{
                price: {
                    [Op.lte]:2000
                }
            }
        })
        return res.render('index',{
            styles: ['index'],
            products: products
        })
    }
}
