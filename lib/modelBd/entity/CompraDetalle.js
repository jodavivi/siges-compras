const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Compra = require('./Compra'); 

//db.createSchema("logistica").then(() => {
    // esquema para el producto
//});

const CompraDetalle = db.define('compra_detalle', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador    : Sequelize.STRING(64),
    TransaccionId          : Sequelize.STRING(64), 
    CompraId                    : {
                                    type: Sequelize.INTEGER,
                                    references: {
                                    model: 'compra', // 'fathers' refers to table name
                                    key: 'Id', // 'id' refers to column name in fathers table
                                    }
                                }, 
    ProductoCod              : Sequelize.STRING(32), 
    Producto                    : Sequelize.STRING(128), 
    UnidadMedidaCod             : Sequelize.STRING(16), 
    UnidadMedida                : Sequelize.STRING(32), 
    Cantidad                    : Sequelize.FLOAT, 
    Precio                      : Sequelize.FLOAT,
    Descuento                   : Sequelize.FLOAT 
} 
,
{
    schema: "logistica"
});

CompraDetalle.belongsTo(Compra, { as: "Compra",targetKey: 'Id',foreignKey: 'CompraId' });   
Compra.hasMany(CompraDetalle, { as: "CompraDetalle",foreignKey: 'CompraId' });
 
module.exports = CompraDetalle;