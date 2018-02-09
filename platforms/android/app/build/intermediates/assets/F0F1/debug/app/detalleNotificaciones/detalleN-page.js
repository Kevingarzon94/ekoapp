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


async function onNavigatingTo(args) {
    var placa = appSettings.getNumber('idVehiculo', 123);
    var status = appSettings.getNumber('notStatus', 123);
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Num_Servicio from Servicio where status="+ status +" and R6947057 = " + placa + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];

        for (var i = 0; i < obj.length; i++) {

            items.push({ noOrden: obj[i][0]});    
        
        }
        
        var listview = view.getViewById(page, "listview");
        listview.items = items;

    }, function (e) {

    });
    page.addCssFile("css/style.css");

    page.bindingContext = detalleViewModel;
}

function onBack(){
    var topmost = frameModule.topmost();
    topmost.navigate("notificaciones/notificaciones-page");  
}

function onItemTap(args) {
    var key = 2;
    appSettings.setNumber('key', key);
    appSettings.setNumber('numberO', args.object.items[args.index].noOrden);
    var topmost = frameModule.topmost();
    topmost.navigate("detalleos/detalle-page"); 
}
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
