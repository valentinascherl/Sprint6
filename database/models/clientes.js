module.exports = function (sequelize, dataTypes){
    let alias = "Clientes";
    let cols = {

        clientes_id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        usuario_id:{
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        nombre: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        apellido: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING
        },
        contrasena: {
            allowNull: false,
            type: dataTypes.STRING
        },
        avatar: {
            allowNull: false,
            type: dataTypes.STRING
        },
        ciudad:{
            allowNull: false,
            type: dataTypes.STRING
        },
        departamento:{
            allowNull: false,
            type: dataTypes.STRING
        },
        codigoPostal: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        domicilio:{
            allowNull:false,
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "clientes",
        timestamps: false,
    };

    const Cliente = sequelize.define(alias, cols, config);

    Cliente.associate = function(models){
        Cliente.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'usuario_id'
        });

        Cliente.hasOne(models.Usuario,{
            as: 'usuarios',
            foreignKey: 'usuario_id'
        });
    }
    return Cliente;
}