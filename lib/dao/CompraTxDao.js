const compra = require('../modelBd/entity/Compra'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear una compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.crearCompra = async function (oParam) { 
    const oResponse = {};
    try {
        var seqCompra = "'" +config.seqCompra +"'";
        var seq = await utilsDao.obtenetSequencia(seqCompra);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.ProveedorCod                   = oParam.oData.sProveedorCod;
        oRegistro.ProveedorNumIdentificacion    = oParam.oData.sProveedorNumIdentificacion;
        oRegistro.ProveedorRazonSocial          = oParam.oData.sProveedorRazonSocial;
        oRegistro.CodTipoDocumento              = oParam.oData.sCodTipoDocumento;
        oRegistro.TipoDocumento                 = oParam.oData.sTipoDocumento;
        oRegistro.NumeroDocumento               = oParam.oData.sNumeroDocumento;
        oRegistro.FechaCompra                   = oParam.oData.dFechaCompra;
        oRegistro.CodEstadoPago                 = oParam.oData.sCodEstadoPago;
        oRegistro.EstadoPago                    = oParam.oData.sEstadoPago;
        oRegistro.DiasCredito                   = oParam.oData.iDiasCredito;
        oRegistro.FechaVencimientoPago          = oParam.oData.dFechaVencimientoPago;
        oRegistro.AlmacenCod                     = oParam.oData.sAlmacenCod;
        oRegistro.Almacen                       = oParam.oData.sAlmacen;
        oRegistro.Descuento                     = oParam.oData.fDescuento;
        oRegistro.PrecioTotal                   = oParam.oData.fPrecioTotal;   
        oRegistro.EstadoMercanciaCod            = oParam.oData.sEstadoMercanciaCod;  
        oRegistro.EstadoMercancia               = oParam.oData.sEstadoMercancia;  
        oRegistro.Observacion                   = oParam.oData.sObservacion;  
        oRegistro.EstadoCompraId                = oParam.oData.iEstadoCompraId;  
        oRegistro.EstadoCompra                  = oParam.oData.sEstadoCompra;   
        const crearRegistroPromise = await compra.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra, error: '+ e.message;
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
        
        if(oParam.oData.sProveedorCod !== undefined){
            oRegistro.ProveedorCod     = oParam.oData.sProveedorCod; 
        }
        if(oParam.oData.sProveedorNumIdentificacion !== undefined){
            oRegistro.ProveedorNumIdentificacion     = oParam.oData.sProveedorNumIdentificacion; 
        }
        if(oParam.oData.sProveedorRazonSocial !== undefined){
            oRegistro.ProveedorRazonSocial     = oParam.oData.sProveedorRazonSocial; 
        }
        if(oParam.oData.sCodTipoDocumento !== undefined){
            oRegistro.CodTipoDocumento     = oParam.oData.sCodTipoDocumento; 
        }
        if(oParam.oData.sTipoDocumento !== undefined){
            oRegistro.TipoDocumento     = oParam.oData.sTipoDocumento; 
        }
        if(oParam.oData.sNumeroDocumento !== undefined){
            oRegistro.NumeroDocumento     = oParam.oData.sNumeroDocumento; 
        }
        if(oParam.oData.dFechaCompra !== undefined){
            oRegistro.FechaCompra     = oParam.oData.dFechaCompra; 
        }
        if(oParam.oData.sCodEstadoPago !== undefined){
            oRegistro.CodEstadoPago     = oParam.oData.sCodEstadoPago; 
        }
        if(oParam.oData.sEstadoPago !== undefined){
            oRegistro.EstadoPago     = oParam.oData.sEstadoPago; 
        }
        if(oParam.oData.iDiasCredito !== undefined){
            oRegistro.DiasCredito     = oParam.oData.iDiasCredito; 
        }
        if(oParam.oData.dFechaVencimientoPago !== undefined){
            oRegistro.FechaVencimientoPago     = oParam.oData.dFechaVencimientoPago; 
        }
        if(oParam.oData.sAlmacenCod !== undefined){
            oRegistro.AlmacenCod     = oParam.oData.sAlmacenCod; 
        }
        if(oParam.oData.sAlmacen !== undefined){
            oRegistro.Almacen     = oParam.oData.sAlmacen; 
        }
        if(oParam.oData.fDescuento !== undefined){
            oRegistro.Descuento     = oParam.oData.fDescuento; 
        }
        if(oParam.oData.fPrecioTotal !== undefined){
            oRegistro.PrecioTotal     = oParam.oData.fPrecioTotal; 
        }
       
        if(oParam.oData.sEstadoMercanciaCod !== undefined){
            oRegistro.EstadoMercanciaCod     = oParam.oData.sEstadoMercanciaCod; 
        }
        if(oParam.oData.sEstadoMercancia !== undefined){
            oRegistro.EstadoMercancia     = oParam.oData.sEstadoMercancia; 
        }
        if(oParam.oData.sObservacion !== undefined){
            oRegistro.Observacion     = oParam.oData.sObservacion; 
        }
        if(oParam.oData.iEstadoCompraId !== undefined){
            oRegistro.EstadoCompraId     = oParam.oData.iEstadoCompraId; 
        }
        if(oParam.oData.sEstadoCompra !== undefined){
            oRegistro.EstadoCompra     = oParam.oData.sEstadoCompra; 
        }
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await compra.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Compra 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarCompra = async function (oParam) { 
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
        const acrualizarRegistroPromise = await compra.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}