/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
const DetalleViewModel = require("./detalleN-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const detalleViewModel = new DetalleViewModel();
const frameModule = require("ui/frame");
var view = require("ui/core/view");
var appSettings = require('application-settings');
const http = require("http");
const dialogs = require("tns-core-modules/ui/dialogs");

function formateDate(date){
    var fechaCesionFormat;
    var year;
    var month;
    var day;
   
    var dateformat;
   
    if(date !== null && date !== ''){
     fechaCesionFormat = new Date(date);
     year = fechaCesionFormat.getFullYear();
     month = fechaCesionFormat.getMonth() + 1;
     day = fechaCesionFormat.getDate();
   
     if((day + "").length === 1){
   
       day = "0" + day;
   
     }
     if((month + "").length === 1){
   
       month = "0" + month;
   
     }
     dateformat =  day + "/" + (month) + "/" + year;
     return dateformat;
   }else{
     dateformat = '';
     return dateformat;
   }
   }
async function onNavigatingTo(args) {
    const status = '8564930';
    var placa = appSettings.getNumber('idVehiculo', 123);
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select id,Nmero_Consecutivo_oc,R8676030,Origen,'',Fecha_y_Hora_de_Cargue,Total_Toneladas_Despacho from Despacho where status="+ status +" and R8544591 = " + placa + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;
    var nombre_clientes = [];
    var urlCLientes = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Cliente1 &sessionId="+ sessionId +"&output=json&maxRows=3000";
    urlCLientes = encodeURI(urlCLientes);
    var obj1;
    var clientesArray = await onInitserOrders();

    await http.request({ url: urlCLientes, method: "POST" }).then(function (response) {
 
        obj1 = response.content.toJSON();
        nombre_clientes = obj1;
 
    }, function (e) {
 
    });

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];
         if(obj.length > 0) {

            
        for (var i = 0; i < obj.length; i++) {

            var origen = "Origen: ";
            for (var k=0; k<clientesArray.length; k++) {

            if (obj[i][3] == clientesArray[k][1]){
                origen = "Origen: "+clientesArray[k][0];     
            }
/*            if (obj[i][1] == clientesArray[k][1]){
                destino1 = "Destino: "+clientesArray[k][0];*/
            }
             
        var fecha = formateDate(obj[i][5]);
        var nCons = "Despacho Nro: " + obj[i][1];
        var ofertante = "Ofertante: ";
        var destino = "Destino: " +obj[i][4];
        var f_cargue = "Fecha Cargue: "+ formateDate(obj[i][5]);
        var peso = "Peso: "+obj[i][6];

        for (var k=0; k<nombre_clientes.length; k++) {

            if (obj[i][2] == nombre_clientes[k][1]){
                ofertante = "Ofertante: "+nombre_clientes[k][0];     
            }

        }       

            items.push({ nConsecutivo: nCons , ofertante: ofertante, Norden:obj[i][0],origen:origen, destino:destino, fecha_cargue:f_cargue, peso:peso});    
        
        }
            
            var listview = view.getViewById(page, "listview");
            listview.items = items;
    } else {
        var options = {
            title: "Atencion !",
            message: "No se encontraron Despachos en Transito",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Race Chosen!");
        });
        var topmost = frameModule.topmost();
        topmost.navigate("home/home-page"); 
    }
    }, function (e) {

    });
    page.addCssFile("css/style.css");

    page.bindingContext = detalleViewModel;
}

function onBack(){
    var topmost = frameModule.topmost();
    topmost.navigate("home/home-page");  
}

function onItemTap(args) {
    var key = 2;
    appSettings.setNumber('key', key);
    appSettings.setNumber('numberO', args.object.items[args.index].Norden);
    var topmost = frameModule.topmost();
    topmost.navigate("detalleos/detalle-page"); 
}
async function onInitserOrders () {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Ciudad where Codigo_Ciudad=000 &sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var obj;
    var name;

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        obj = response.content.toJSON();

    }, function (e) {

    });

    return obj;
    }
exports.onInitserOrders = onInitserOrders;  
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
exports.formateDate = formateDate;