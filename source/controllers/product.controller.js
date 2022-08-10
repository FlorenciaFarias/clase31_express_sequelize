const {validationResult} = require('express-validator')
const {product,image,imagesProducts} = require('../database/models/index')
module.exports ={
  index: async ( req , res ) =>{

    let products = await product.findAll({include:{all:true}});

    if(req.query && req.query.name){
      products = products.filter(product => product.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1)
    }

    return res.render('products/list',{
      title: 'List of products',
      styles: ['products/list'],
      products: products
    })
  },
  detail: async ( req , res) => {
    let productDB = await product.findByPk(req.params.id,{include:{all:true}})

    if(!productDB){
      return res.redirect('/products/')
    }
    return res.render('products/detail', {
      title: 'Detail of products',
      styles: ['products/detail'],
      product:productDB
    })
  },
  create: async ( req , res ) => {
    return res.render('products/create', {
      styles: ['products/create'],
      title: 'Create Product',
    })
  },
  save: async (req , res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('products/create',{
        styles:['products/create'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }
    
    let nuevoProducto = await product.create(req.body)

    if(req.files && req.files.length > 0){

      let images = await Promise.all(req.files.map( file => {
        return image.create({
          path: file.filename
        })
      }))

      let addProductImages = await Promise.all(images.map(image => {
        return imagesProducts.create({
          product: nuevoProducto.id,
          image: image.id
        })
      }))

    }
    
    // req.body.image = req.files[0].filename
    return res.redirect('/products/')
  },
  edit:async ( req , res ) => {
    let productDB = await product.findByPk(req.params.id,{include:{all:true}})
    if(!productDB){
      return res.redirect('/products/')
    }
    return res.render('products/edit', {
      title: 'Edit of products',
      styles: ['products/edit'],
      product:productDB
    })
  },
  modify: async (req, res) => {
    let productDB = await product.findByPk(req.params.id,{include:{all:true}})

    await productDB.update({
      name :  req.body.name,
      description : req.body.description,
      price : parseInt(req.body.price)
    })
    
    return res.redirect('/products/detail/' + product.id)
  },
  destroid:async ( req , res ) => {
    let productDB = await product.findByPk(req.body.product,{include:{all:true}})
    if(!productDB){
      return res.redirect('/products/');
    }
    /*
    await product.destroy({where:{
      id: productDB.id
    }})
    */
    await productDB.destroy()
    return res.redirect('/products/');
  }
}