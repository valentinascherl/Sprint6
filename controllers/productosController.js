const fs = require('fs');
const path = require('path');
const {check, validationResult, body} = require ('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const saveProducts = (array => fs.writeFileSync(productsFilePath, JSON.stringify(array)));


const readJSONFile = () => JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));

const searchProduct = id => {
    let productos = readJSONFile();
    let productFound = null;
    productos.forEach(prod => {
        if (prod["id"] == id) {
            productFound = prod;
        }
    });
    return productFound; // si no lo encuentra devuelve null
};





let productosController = {
    productos: function (req, res) {
        res.locals.title = "Productos";
        res.render('productos', { productosAMostrar: products });
    },
    cardio: function (req, res, next) {
        res.locals.title = "Cardio";
        res.render('cardio', { productosAMostrar: products });
    },
    musculacion: function (req, res) {
        res.locals.title = "Musculacion";
        res.render('musculacion', { productosAMostrar: products });
    },
    create: function (req, res) {
        res.locals.title = "Creacion de productos";
        res.render('formToCreate');

    },
    store: function (req, res) {

        let prod = { ...req.body }
        db.Producto.create(prod)
            .then((product) => {
                let mensaje = 'El producto se creó correctamente.';
                res.render("/", { mensaje }) // va la / o /crear?  //crear nueva vista
            }).catch((error) => {
                res.render("/", { error })  //
            });
    },
    edit: function (req, res) {
        res.locals.title = 'Editar';
        const productToEdit = products.find(item => item.id == req.params.id);
        res.render("formToEdit", { productToEdit });
    },
    update: (req, res) => {
        //let prod = { nombre: req.body.nombre, origen: req.body.origen, stock: req.body.stock, email: req.body.email }
        let cantFilasActualizadas = /*await*/ db.Producto.update({ //update a product
            ...req.body
        }, { where: { name: prod.name } })

            .then((product) => {
                let mensaje = 'El producto se modificó correctamente.';
                res.render("/", { mensaje })
            }).catch((error) => {
                res.render("/", { error })
            });

        /*
        res.locals.title='Editado';
        let productEdited = null;
        products.forEach(product => {
            if(product.id == req.params.id) {
                product.name = req.body.name;
                product.price = parseFloat(req.body.price);
                product.discount = parseFloat(req.body.discount);
                product.category = req.body.category;
                product.description = req.body.description;
                productEdited = product;
            }
        });
        saveProducts(products);
        res.send("Editado!");
        */
    },
    delete: (req, res) => {
        res.locals.title = "Eliminar";
        //const productsNew = products.filter(product => product.id != req.params.id);
        //saveProducts(productsNew);
        //res.send("Eliminado!");
    db.Producto.destroy({
        where:{
            id : req.body.id
        }
    })
    .then((product) => {
        let mensaje = 'El producto se eleminó correctamente.';
        res.render("/", { mensaje })
    }).catch((error) => {
        res.render("/", { error })
    });
},
    admin: (req, res, next) => {
        res.locals.title = "Administrador";
        res.render('admin', { products: products });
    },
    detail: (req, res) => {
        //esto es por params
        //con FindOne
        //where id ...
        db.Producto.findByPk(req.params.codigo)
        .then(function(producto){
            res.render('detalle', {producto: producto, user: req.session.usuario});
        })
        .catch(function(e){
            console.log(e)
        });


        /*res.locals.title = 'Detalle';
        const product = searchProduct(req.params.id);
        res.render("detalle", { product, formatPrice });*/
    }
}



module.exports = productosController;


//crear es post  es /productos
//elimnar es por delete  /productos/:id
//modificar es put  /productos/:id
//detalle es get //productos/:id
