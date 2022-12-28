const utils 	     	 	= require('../utils/utils'); 
const compraTxDao	 		= require('../dao/CompraTxDao');  
const compraDetalleTxDao	= require('../dao/CompraDetalleTxDao');
const compraDocumentoTxDao	= require('../dao/CompraDocumentoTxDao');  

/**
 * @description Función que permite registrar compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.registrarCompra = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 
		 //Registramos la cabecera de la compra
		 var oRegistroCompra = {};
		 oRegistroCompra.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroCompra.oData		  	 = oRequest.oData; 
		 const crearCompraResponse = await  compraTxDao.crearCompra(oRegistroCompra);
		 if(crearCompraResponse.iCode !== 1){
			throw new Error(crearCompraResponse.iCode + "||" + crearCompraResponse.sMessage);
		 } 
		 var oCompra = crearCompraResponse.oData;
		 //Registramos el detalle de la cabecera
		 if(oRequest.oData.aDetalle && oRequest.oData.aDetalle.length > 0){
			
			oRequest.oData.aDetalle.forEach( async function(e){
				var oRegistroCompraDet = {};
				oRegistroCompraDet.oAuditRequest  = oRequest.oAuditRequest;
				oRegistroCompraDet.oData		   = e; 
				oRegistroCompraDet.oData.iCompraId = oCompra.Id;
				const crearCompraDetalleResponse = await  compraDetalleTxDao.crearCompraDetalle(oRegistroCompraDet);
				if(crearCompraDetalleResponse.iCode !== 1){
					throw new Error(crearCompraDetalleResponse.iCode + "||" + crearCompraDetalleResponse.sMessage);
				}  
			});
 
		 }
		
		 //Registramos los documentos de la compra
		 if(oRequest.oData.aDocCompra && oRequest.oData.aDocCompra.length > 0){
			oRequest.oData.aDocCompra.forEach(async function(e){
				var oRegistroCompraDoc = {};
				oRegistroCompraDoc.oAuditRequest  = oRequest.oAuditRequest;
				oRegistroCompraDoc.oData		   = e; 
				oRegistroCompraDoc.oData.iCompraId = oCompra.Id;
				const oRegistroCompraDocResponse = await  compraDocumentoTxDao.crearCompraDocumento(oRegistroCompraDoc);
				if(oRegistroCompraDocResponse.iCode !== 1){
				throw new Error(oRegistroCompraDocResponse.iCode + "||" + oRegistroCompraDocResponse.sMessage);
				}   
			}); 
		 }

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oCompra;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.actualizarCompra = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos Compra
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarProveedorResponse = await  compraTxDao.actualizarCompra(oRegistro);
		if(actualizarProveedorResponse.iCode !== 1){
		   throw new Error(actualizarProveedorResponse.iCode + "||" + actualizarProveedorResponse.sMessage);
		}

		//Registramos el detalle de la cabecera
		if(oRequest.oData.aDetalle && oRequest.oData.aDetalle.length > 0){
			
			oRequest.oData.aDetalle.forEach( async function(e){
				
				if(e.sAccion === "C"){
					var oRegistroCompraDet = {};
					oRegistroCompraDet.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDet.oData		   = e; 
					oRegistroCompraDet.oData.iCompraId = parseInt(req.params.id, 10);
					const crearCompraDetalleResponse = await  compraDetalleTxDao.crearCompraDetalle(oRegistroCompraDet);
					if(crearCompraDetalleResponse.iCode !== 1){
						throw new Error(crearCompraDetalleResponse.iCode + "||" + crearCompraDetalleResponse.sMessage);
					}  
				} 
				if(e.sAccion === "U"){
					var oRegistroCompraDet = {};
					oRegistroCompraDet.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDet.oData		   = e;  
					const actualizarCompraDetalleResponse = await  compraDetalleTxDao.actualizarCompraDetalle(oRegistroCompraDet);
					if(actualizarCompraDetalleResponse.iCode !== 1){
						throw new Error(actualizarCompraDetalleResponse.iCode + "||" + actualizarCompraDetalleResponse.sMessage);
					}  
				} 
				if(e.sAccion === "D"){
					var oRegistroCompraDet = {};
					oRegistroCompraDet.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDet.oData		   = e;  
					const eliminarCompraDetalleResponse = await  compraDetalleTxDao.eliminarCompraDetalle(oRegistroCompraDet);
					if(eliminarCompraDetalleResponse.iCode !== 1){
						throw new Error(eliminarCompraDetalleResponse.iCode + "||" + eliminarCompraDetalleResponse.sMessage);
					}  
				} 
			});
 
		 }

		  //Registramos los documentos de la compra
		  if(oRequest.oData.aDocCompra && oRequest.oData.aDocCompra.length > 0){
			oRequest.oData.aDocCompra.forEach(async function(e){
				if(e.sAccion === "C"){
					var oRegistroCompraDoc = {};
					oRegistroCompraDoc.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDoc.oData		   = e; 
					oRegistroCompraDoc.oData.iCompraId = parseInt(req.params.id, 10);
					const crearCompraDocumentoResponse = await  compraDocumentoTxDao.crearCompraDocumento(oRegistroCompraDoc);
					if(crearCompraDocumentoResponse.iCode !== 1){
					throw new Error(crearCompraDocumentoResponse.iCode + "||" + crearCompraDocumentoResponse.sMessage);
					}   
				}
				if(e.sAccion === "U"){
					var oRegistroCompraDoc = {};
					oRegistroCompraDoc.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDoc.oData		   = e;  
					const actualizarCompraDocumentoResponse = await  compraDocumentoTxDao.actualizarCompraDocumento(oRegistroCompraDoc);
					if(actualizarCompraDocumentoResponse.iCode !== 1){
					throw new Error(actualizarCompraDocumentoResponse.iCode + "||" + actualizarCompraDocumentoResponse.sMessage);
					}   
				}
				if(e.sAccion === "D"){
					var oRegistroCompraDoc = {};
					oRegistroCompraDoc.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroCompraDoc.oData		   = e;  
					const eliminarCompraDocumentoResponse = await  compraDocumentoTxDao.eliminarCompraDocumento(oRegistroCompraDoc);
					if(eliminarCompraDocumentoResponse.iCode !== 1){
					throw new Error(eliminarCompraDocumentoResponse.iCode + "||" + eliminarCompraDocumentoResponse.sMessage);
					}   
				}
			}); 
		 }
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarProveedorResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar Compra
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarCompra = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarCompraResponse = await  compraTxDao.eliminarCompra(oRegistro);
			if(eliminarCompraResponse.iCode !== 1){
				throw new Error(eliminarCompraResponse.iCode + "||" + eliminarCompraResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

