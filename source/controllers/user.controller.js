const { hashSync } = require('bcryptjs');
const {validationResult} = require('express-validator')
const { user } = require('../database/models/index');

const usersController = {
//  Ahora nuestros métodos ***
//    Tienen que ser métodos async ***

  register: async (req, res) => {
    return res.render('users/register',{
      styles:['users/register'],
    });
  },
  process: async (req, res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/register',{
        styles:['users/register'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }
    // ---- HASHEAMOS LA PASSWORD DEL NEW USER ----
req.body.password = hashSync(req.body.password, 10);
    // ---- VERIFICAMOS SI ES ADMIN ----
req.body.isAdmin = String(req.body.username).toLocaleLowerCase().includes('@dh');

await user.create(req.body);
    // req.body.avatar = req.files[0].filename;
  
    return res.redirect(`/users/login`)
  },

  login: async (req,res) => {
    return res.render('users/login',{
      styles:['users/login'],
    });
  },
  access: async (req,res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/login',{
        styles:['users/login'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }

    let users = await user.findAll();
    let user = users.find(u => u.username === req.body.username)
     req.session.user = user
    return res.redirect(`/?msg=Bienvenido! ${user.isAdmin? 'Administador':user.username.split('@')[0]}`)
  },
  logout: function (req,res) {
    delete req.session.user 
    return res.redirect('/')
  }
}
  module.exports = usersController;