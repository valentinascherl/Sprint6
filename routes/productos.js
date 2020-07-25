var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productosController');
const { middlewareGenerico, userlog } = require('../middlewares/generics');


/* GET todos los productos. */
router.get('/', productosController.productos);/* GET - All products */

/* GET cardio.*/
router.get('/cardio', productosController.cardio);

/* GET musculacion. */
router.get('/musculacion', productosController.musculacion);

/* GET admin. */
router.get('/admin', productosController.admin);

/* GET home page. */
router.get("/detalle/:id", productosController.detail);   //GET - Muestra el detalle de un producto


router.get('/crear', productosController.create); /* GET - Form to create */
//router.post('/', productosController.store); /* POST - Store in DB */
router.post('/', middlewareGenerico.newProductValidation, productosController.store);/* POST - Store in DB */

router.get('/:id/editar', productosController.edit); /* GET - Form to create */
//router.put('/:id', productosController.update);  /*PUT - Update in DB */
router.put('/:id', middlewareGenerico.editProductValidation, productosController.update);

router.delete('/eliminar/:id', productosController.delete); /* DELETE - Delete from DB */




module.exports = router;