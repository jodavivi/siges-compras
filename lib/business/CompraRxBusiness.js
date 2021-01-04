const compraRxDao = require('../dao/CompraRxDao'); 
const utils 	  = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.consultarCompra = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroCompra = {};
		 oFiltroCompra.sRazonSocial  = req.query.sRazonSocial;
		 oFiltroCompra.iId 	  		= req.query.iId; 
		 var consultarCompraResponse =  await compraRxDao.consultarCompra(oFiltroCompra);
		 if(consultarCompraResponse.iCode !== 1){
			throw new Error(consultarCompraResponse.iCode + "||" + consultarCompraResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarCompraResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 