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

            let data = products.map(product => Object({
                    id:product.id,
                    name: product.name,
                    image: "http://localhost:3030/illustrations/" + product.images[0].path
                })
            )

            return res.status(200).json({data})
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    one: async (req,res) => {
        try {
            let result  = await product.findByPk(req.params.id,{
                include:{all:true}
            })
            let data = {}
            data.id = result.id
            data.name = result.name
            data.image = "http://localhost:3030/illustrations/" + result.images[0].path
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}