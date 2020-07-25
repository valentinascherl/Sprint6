var express = require('express');
var router = express.Router();
const { middlewareGenerico, userlog } = require('../middlewares/generics');
const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware");


/* Registro */
var registroController = require('../controllers/registroController');
router.get('/registro', registroController.registro);
//router.post('/registro',uploadFileMiddleware.uploadFile, registroController.crear);
router.post('/registro', userlog.registerUserValidation, uploadFileMiddleware.uploadFile, registroController.crear);

/*Login*/
var usersController = require('../controllers/usersController');
router.get('/login', usersController.login);
router.post('/login', userlog.loginUserValidation, usersController.loginUser);
router.get('/perfil', usersController.perfil);



module.exports = router;
