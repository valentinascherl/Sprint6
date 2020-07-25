module.exports = function (sequelize, dataTypes){

    let alias = "Productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        modelo: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        tamano:{
            type: dataTypes.INTEGER
        },
        descuento:{
            type: dataTypes.INTEGER
        },
        categoria:{
            type: dataTypes.STRING
        },
        seccion_id:{
            type: dataTypes.INTEGER
        },
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsToMany(models.Carritos, {
            as: 'carritos',
            through: "producto_carrito",
            foreignKey: "producto_id",
            otherKey: "carrito_id"
        });

        Producto.belongsTo(models.Seccion, {
            as: "seccion",
            foreignKey: "seccion_id",
            timestamps: false,
        })

        /*Producto.belongsToMany(models.Usuario, {
            as: "usuarios",
            through: "users_products",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        });*/
    }

    return Producto;
}