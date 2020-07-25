module.exports = (sequelize, dataTypes) => {

    let alias = "Carritos";
    let cols = {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        cliente_id:{
            type: dataTypes.INTEGER
        },
        producto: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        cantidad: {
            type: dataTypes.INTEGER,
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        precioTotal:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "carritos",
        timestamps: false,
    };

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models){
        Carrito.hasMany(models.Producto, {
            as: "productos",
            through: "producto_carrito",
            foreignKey: "carrito_id",
            otherKey: "producto_id",
            timestamps: false,
        })
    }
    return Carrito;
}