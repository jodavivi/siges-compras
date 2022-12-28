const compraDocumento = require('../modelBd/entity/CompraDocumento'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear documentos de compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.crearCompraDocumento = async function (oParam) { 
    const oResponse = {};
    try {
        var seqCompraDocumento = "'" +config.seqCompraDocumento +"'";
        var seq = await utilsDao.obtenetSequencia(seqCompraDocumento);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.CompraId          = oParam.oData.iCompraId;
        oRegistro.CodTipoDocumento  = oParam.oData.sCodTipoDocumento;
        oRegistro.TipoDocumento     = oParam.oData.sTipoDocumento;
        oRegistro.DocumentoUrl      = oParam.oData.sDocumentoUrl; 
        const crearRegistroPromise = await compraDocumento.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_documento, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Compra documento
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.actualizarCompraDocumento = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
         
        if(oParam.oData.sCodTipoDocumento !== undefined){
            oRegistro.CodTipoDocumento     = oParam.oData.sCodTipoDocumento; 
        }
        if(oParam.oData.sCodTipoDocumento !== undefined){
            oRegistro.CodTipoDocumento     = oParam.oData.sCodTipoDocumento; 
        }
        if(oParam.oData.sDocumentoUrl !== undefined){
            oRegistro.DocumentoUrl     = oParam.oData.sDocumentoUrl; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await compraDocumento.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_documento, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Compra documento
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarCompraDocumento = async function (oParam) { 
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
        const acrualizarRegistroPromise = await compraDocumento.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_documento, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}