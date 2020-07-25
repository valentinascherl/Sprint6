var express = require('express');
var router = express.Router();
var carritoController = require('../controllers/carritoController');
var middPermisos = require('../middlewares/middPermisos');


/* GET users listing. */
router.get('/:id', middPermisos.soloUsuariosLogueados, carritoController.carrito);


module.exports = router;
