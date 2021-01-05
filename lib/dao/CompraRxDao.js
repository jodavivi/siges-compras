const compra = require('../modelBd/entity/Compra');  
const compraDetalle = require('../modelBd/entity/CompraDetalle');  
const compraDocumento = require('../modelBd/entity/CompraDocumento');  

/**
 * @description Función que permite consultar las compras
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarCompra = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sNumeroDocumento !== undefined){
            oFiltroLista.where.NumeroDocumento  = oFiltro.sNumeroDocumento; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1; 
        oFiltroLista.include = [
            { model: compraDetalle, as: "CompraDetalle" },
            { model: compraDocumento, as: "CompraDocumento" }  
        ]
        const consultarListaResponse = await  compra.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de compras'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}