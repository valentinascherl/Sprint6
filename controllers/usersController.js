const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

// Private functions
const productsFilePath = path.join(__dirname, '../data/users.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// Lee el archivo Json
function readJSONfile() {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}
// Guarda el json de usuarios
function saveJSONfile(objetos) {
  fs.writeFileSync(userController.archivo, JSON.stringify(objetos, null, ' '));
}
// Agrega un nuevo usuario
function addUserToList(usuario) {
  let usuarios = fs.readFileSync(productsFilePath, { encoding: 'utf-8' });
  usuarios.push(usuario);
  saveJSONfile(usuarios);
}



let usersController = {

  // Busca un usuario por su email
  searchByEmail: function (email) {
    let archivoJson = readJSONfile();
    let user = null;
    archivoJson.forEach((elem, i) => {
      if (elem["email"] == email) {
        user = elem;
      }
    });
    return user; // si no lo encuentra devuelve null
  },
  login: function (req, res, next) {
    res.locals.title = "Iniciar sesión";
    //res.render('login', {productosAMostrar: products});
    res.render('login');
  },

  loginUser: function (req, res) {
    res.locals.title = "Proceso de Iniciar sesión";
    /*let errors = validationResult(req); // check if exist validation errors
    if(errors.errors.length == 0){ // validation is ok: no errors =)
       let usuario = usersController.searchByEmail(req.body.email); // vemos si el usuario existe
       console.log(usuario);

       // el usuario existe y la pass es correcta?
       if (usuario && bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
          req.session.usuario = usuario; // logueamos al usuario
          return res.redirect('/users/perfil');// lo redireccionamos a la página del perfil
       }else{
          mensaje = "Error: usuario o contraseña incorrectos.";
          return res.render("login",{mensaje: mensaje, status: "error", user: undefined});
       }
    }else{
       return res.render('login', {errors: errors.errors, mensaje: undefined, status: undefined, usuario: undefined})
    }*/
    db.Usuario.findOne({
      where: {
        email: req.body.email,
      }
    })

      .then(function (usuario) {
        if(usuario){
          // el usuario existe y la pass es correcta?
          if (usuario && bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
            req.session.usuario = usuario; // logueamos al usuario
            return res.redirect('/users/perfil');// lo redireccionamos a la página del perfil
          } else {
            mensaje = "Error: usuario o contraseña incorrectos.";
            return res.render("login", { mensaje: mensaje, status: "error", user: undefined });
          }
        } else {
          return res.render('login', { errors: errors.errors, mensaje: undefined, status: undefined, usuario: undefined })
        }
      });
  },
  perfil: function (req, res) {
    res.locals.title = "Perfil del usuario";
    res.render('perfil', { user: req.session.usuario });
  }
}

module.exports = usersController;