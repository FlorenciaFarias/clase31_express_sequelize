const {product, image} = require('../../database/models');
const {Op} = require('sequelize');

module.exports = {
    all: async (req,res) => {
        try {
            let filters = {}
            let page = 0
            if(req.query.price){
                filters.price = {
                    [Op.lte]: req.query.price
                }
            }
            if(req.query.page){
                page = parseInt(req.query.page)
            }
            let products = await product.findAll({
                include:{all:true},
                where: filters,
                limit: 4,
                offset: page
            })
            return res.status(200).json({next:products.length > 0 ?page+4:null,products})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}