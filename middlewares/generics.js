const fs = require('fs');
const path = require('path');
//const productController = require('../controllers/productController');
const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');


   let middlewares = {
      middlewareGenerico: function(req, res, next){ // middleware not used (only structure)
         // code here
         next();
      },
      // It validates "New Product" form
      newProductValidation: [
         check('nombre')
            .exists().withMessage('Error de seguridad.') // el campo nombre no está definido en el request
            .trim()
            .isLength({min: 5}).withMessage('El Nombre del producto debe tener al menos 5 caracteres.'),
         check('descripcion')
            .exists().withMessage('Error de seguridad')
            .isLength({min:20}).withMessage('El campo debe tener al menos 20 caracteres.'),
         check('imagen')
            .exists().withMessage('Error de seguridad')
         //FALTA VALIDACION DE IMAGEN (JPG, JPEG, PNG, GIF)

      ],
      // It validates "Edit Product" form
      editProductValidation: [
         check('nombre')
            .exists().withMessage('Error de seguridad.') // el campo nombre no está definido en el request
            .trim()
            .isLength({min: 5}).withMessage('El Nombre del producto debe contener al menos 5 caracteres.'),
         check('descripcion')
            .exists().withMessage('Error de seguridad')
            .isLength({min:20}).withMessage('El campo debe tener al menos 20 caracteres.'),
         check('imagen')
            .exists().withMessage('Error de seguridad')
      ],
      // It writes a log of all routes that user accesses
      userlog: function(req, res, next){
         let logFile = path.join(__dirname, '..') + '/userLog.txt';
         fs.appendFileSync(logFile, `Se ingresó a la ruta: ${req.url}\n`);
         next();
      },
      // It validates a User Login form
      loginUserValidation:[
         check('contrasena')
            .exists().withMessage('Error de seguridad.') // el campo password no está definido en el request
            .trim()
            .isLength({min: 8}).withMessage('Error: contraseña inválida.'),
         check('email')
            .exists().withMessage('Error de seguridad.') // el campo email no está definido en el request
            .isEmail().withMessage('Error: email inválido.')
            .normalizeEmail(), //sanitiza el email
      ],
      // It validates a User Register form
      registerUserValidation: [
         check('nombre')
            .exists().withMessage('Error de seguridad.') // el campo nombre no está definido en el request
            .trim()
            .isLength({min: 2}).withMessage('Error: El Nombre debe tener al menos 2 caracteres.'),
         check('apellido')
            .exists().withMessage('Error de seguridad.') // el campo apellido no está definido en el request
            .trim()
            .isLength({min: 2}).withMessage('Error: El Apellido debe tener al menos 2 caracteres.'),
         check('contrasena')
            .exists().withMessage('Error de seguridad.') // el campo password no está definido en el request
            .trim()
            .isLength({min: 8}).withMessage('Error: La Contraseña debe contener al menos 8 caracteres.'),
         check('email')
            .exists().withMessage('Error de seguridad.') // el campo email no está definido en el request
            .isEmail().withMessage('El Email no es válido.')
            .normalizeEmail(), //sanitiza el email
         body('email').custom(function(valor){ // chequeamos si el usuario ya existe
            let exist = usersController.searchByEmail(valor);
            if (exist == null) {
               return true;
            }else{
               return false; // no pasó la validación, se mostrará mensaje de error
            }
         }).withMessage('Error: ya existe un usuario registrado con el mismo email.'),
         //FALTA VALIDACION DE AVATAR (JPG, JPEG, PNG, GIF)
      ],
   }

module.exports = middlewares;
