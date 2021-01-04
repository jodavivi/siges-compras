const express = require('express');
const router = express.Router();

const compraRxBusiness        = require('../business/CompraRxBusiness');  
const compraTxBusiness        = require('../business/CompraTxBusiness');  

module.exports = function(){

    //compra
    router.post('/', compraTxBusiness.registrarCompra); 
    router.put('/:id', compraTxBusiness.actualizarCompra); 
    router.delete('/', compraTxBusiness.eliminarCompra);  
    router.get('/', compraRxBusiness.consultarCompra); 
 
    return router;
}

