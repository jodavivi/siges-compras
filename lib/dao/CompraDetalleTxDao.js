const compraDetalle = require('../modelBd/entity/CompraDetalle'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear un detalle de compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.crearCompraDetalle = async function (oParam) { 
    const oResponse = {};
    try {
        var seqCompraDetalle = "'" +config.seqCompraDetalle +"'";
        var seq = await utilsDao.obtenetSequencia(seqCompraDetalle);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.CompraId              = oParam.oData.iCompraId;
        oRegistro.ProductoId            = oParam.oData.iProductoId;
        oRegistro.ProductoCodigo        = oParam.oData.ProductoCodigo;
        oRegistro.ProductoCodigoBarra   = oParam.oData.sProductoCodigoBarra;
        oRegistro.Producto              = oParam.oData.sProducto;
        oRegistro.UnidadMedidaCod       = oParam.oData.sUnidadMedidaCod;
        oRegistro.UnidadMedida          = oParam.oData.sUnidadMedida;
        oRegistro.Cantidad              = oParam.oData.fCantidad;
        oRegistro.Precio                = oParam.oData.fPrecio;
        oRegistro.Descuento             = oParam.oData.fDescuento; 
        const crearRegistroPromise = await compraDetalle.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Compra 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.actualizarCompra = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iCompraId !== undefined){
            oRegistro.CompraId     = oParam.oData.iCompraId; 
        }
        if(oParam.oData.iProductoId !== undefined){
            oRegistro.ProductoId     = oParam.oData.iProductoId; 
        }
        if(oParam.oData.sProductoCodigo !== undefined){
            oRegistro.ProductoCodigo     = oParam.oData.sProductoCodigo; 
        }
        if(oParam.oData.sProductoCodigoBarra !== undefined){
            oRegistro.ProductoCodigoBarra     = oParam.oData.sProductoCodigoBarra; 
        }
        if(oParam.oData.sProducto !== undefined){
            oRegistro.Producto     = oParam.oData.sProducto; 
        }
        if(oParam.oData.sUnidadMedidaCod !== undefined){
            oRegistro.UnidadMedidaCod     = oParam.oData.sUnidadMedidaCod; 
        }
        if(oParam.oData.sUnidadMedida !== undefined){
            oRegistro.UnidadMedida     = oParam.oData.sUnidadMedida; 
        }
        if(oParam.oData.fCantidad !== undefined){
            oRegistro.Cantidad     = oParam.oData.fCantidad; 
        }
        if(oParam.oData.fPrecio !== undefined){
            oRegistro.Precio     = oParam.oData.fPrecio; 
        }
        if(oParam.oData.fDescuento !== undefined){
            oRegistro.Descuento     = oParam.oData.fDescuento; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await compraDetalle.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Compra detalle
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarCompraDetalle = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await compraDetalle.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}