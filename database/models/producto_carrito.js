module.exports = (sequelize, dataTypes) => {

    const alias = "Productos_Carritos";

    const cols = {
        producto_id: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        carrito_id: {
            allowNull: false,
            type: dataTypes.STRING,
        }
    }

    const config = {
        tableName: "producto_carrito"
    };

    const ProductoCarrito = sequelize.define(alias, cols, config);

    ProductoCarrito.associate = (models) => {
        ProductoCarrito.belongsTo(models.Producto, {
            as: "productos",
            foreignKey: "producto_id"
        });

        ProductoCarrito.belongsTo(models.Carrito, {
            as: "carritos",
            foreignKey: "carrito_id"
        });
    }
}