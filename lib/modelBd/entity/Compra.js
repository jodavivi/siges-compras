const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

//db.createSchema("logistica").then(() => {
    // esquema para el producto
//});

const Compra = db.define('compra', { 
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
    CodEmpresa          : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    ProveedorCod                 : Sequelize.STRING(8), 
    ProveedorNumIdentificacion  : Sequelize.STRING(32),
    ProveedorRazonSocial        : Sequelize.STRING(128), 
    CodTipoDocumento            : Sequelize.STRING(16),
    TipoDocumento               : Sequelize.STRING(16), 
    NumeroDocumento             : Sequelize.STRING(32),
    FechaCompra                 : Sequelize.DATE,   
    CodEstadoPago               : Sequelize.STRING(16), 
    EstadoPago                  : Sequelize.STRING(64), 
    DiasCredito                 : Sequelize.INTEGER,
    FechaVencimientoPago        : Sequelize.DATE,   
    AlmacenCod                   : Sequelize.STRING(6),
    Almacen                     : Sequelize.STRING(128),   
    Descuento                   : Sequelize.FLOAT, 
    PrecioTotal                 : Sequelize.FLOAT,
    EstadoMercanciaCod          : Sequelize.STRING(16),  
    EstadoMercancia             : Sequelize.STRING(64),  
    Observacion                 : Sequelize.STRING(256),  
    EstadoCompraId              : Sequelize.INTEGER,
    EstadoCompra                : Sequelize.STRING(128)
} 
,
{
    schema: "logistica"
});

 
module.exports = Compra;