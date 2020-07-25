const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const saveProducts = (array => fs.writeFileSync(productsFilePath, JSON.stringify(array)));




let homeController = {
    home: function(req, res, next) {
      res.locals.title = "Home";
    res.render('home', {productosAMostrar: products});
  }
};


module.exports=homeController;
