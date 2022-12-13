const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Compra = require('./Compra'); 

//db.createSchema("logistica").then(() => {
    // esquema para el producto
//});

const CompraDocumento = db.define('compra_documento', { 
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

    CompraId               : {
                            type: Sequelize.INTEGER,
                            references: {
                            model: 'compra', // 'fathers' refers to table name
                            key: 'Id', // 'id' refers to column name in fathers table
                            }
                        },
    CodTipoDocumento                : Sequelize.STRING(16) ,
    TipoDocumento                : Sequelize.STRING(64) ,
    DocumentoUrl                : Sequelize.STRING(200) 
} 
,
{
    schema: "logistica"
});

CompraDocumento.belongsTo(Compra, { as: "Compra",targetKey: 'Id',foreignKey: 'CompraId' });   
Compra.hasMany(CompraDocumento, { as: "CompraDocumento",foreignKey: 'CompraId' });
 
module.exports = CompraDocumento;