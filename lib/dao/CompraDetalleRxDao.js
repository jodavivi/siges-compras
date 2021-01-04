const compraDetalle = require('../modelBd/entity/CompraDetalle');  

/**
 * @description Función que permite consultar los detalles de compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.consultarCompraDetalle = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iCompraId !== undefined){
            oFiltroLista.where.CompraId  = oFiltro.iCompraId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        } 
         
        oFiltroLista.where.EstadoId     = 1; 
        const consultarListaResponse = await  compra.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del  detalle de compra'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: compra_detalle, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}