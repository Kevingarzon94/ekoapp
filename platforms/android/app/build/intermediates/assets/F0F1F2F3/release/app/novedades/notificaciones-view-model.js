const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");
const frameModule = require("ui/frame");


function NotificacionesViewModel() {
    const viewModel = observableModule.fromObject({
        ComentarioIncidencia: "",
        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
        listPickerCountries: ["Demora en el cargue" ,
            "Demora en el descargue donde el cliente" ,
            "Demora en la devolución de documentos por el cliente" ,
            "Demora en la documentación de salida" ,
            "Demora en salida planta" ,
            "Dirección errada" ,
            "Error Codigo de barras" , 
            "Falla mecanica" ,
            "Faltante de producto" ,
            "Faltante Interno en caja Sellada" ,
            "Fuera del rango de  entrega" ,
            "Hubo sobrante de producto" ,
            "Local cerrado" ,
            "Mal estado de vias cliente" ,
            "Mercancía averiada" , 
            "Mercancía no solicitada" ,
            "No conocen al destinatario" ,
            "No existe orden de compra" ,
            "No existe persona responsable para recibo" ,
            "No hay cita de entrega" ,
            "No recibe por falta de certificados" ,
            "No recibe por fecha de vencimiento" ,
            "No recibe por inventarios en el cliente" ,
            "Pedido cancelado" ,
            "Pedido Facturado" ,
            "Pedido repetido" ,
            "Producto trocado" ,
            "Programacion inadecuada" ,
            "Reenvio por demora en el recibo de uno o mas clientes" ,
            "Restricciòn vehicular" ,
            "Sobre-stock en el cliente"],       
        selectedListPickerIndex: 0,
      
    });
    return viewModel;
}

module.exports = NotificacionesViewModel;
