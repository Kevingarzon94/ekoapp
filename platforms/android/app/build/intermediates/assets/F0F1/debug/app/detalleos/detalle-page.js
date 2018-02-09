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
const DetalleViewModel = require("./detalle-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const detalleViewModel = new DetalleViewModel();
const frameModule = require("ui/frame");
var view = require("ui/core/view");
var appSettings = require('application-settings');
const http = require("http");


function onNavigatingTo(args) {

    //appSettings.setNumber('numberO', args.object.items[args.index].Norden);
    
   /* var ofertanteName = appSettings.getString('Offer', 'DefaultValue');
    var label1 = view.getViewById(page, "ofertante");
    label1.text = ofertanteName;*/
    var key = appSettings.getNumber('key', 123);

    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var NumeroOrden = appSettings.getNumber('numberO', 123);
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select R6311987,R7442986,Cantidad from Servicio where Num_Servicio = " + NumeroOrden + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;

    http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        
        cliName(obj[0][0],args);

    
    }, function (e) {

    });





    if( key == 2) {
        var button1 = view.getViewById(page, "accept");
        var button2 = view.getViewById(page, "refuse");

        button1.visibility = "collapsed";
        button2.visibility = "collapsed";

    }
    page.addCssFile("css/style.css");
    page.bindingContext = detalleViewModel;
}


function onBack(){
    var key = appSettings.getNumber('key', 123);
    var topmost = frameModule.topmost();
    
    if ( key == 1) {
    topmost.navigate("ordenServicio/ordens-page");  
    } else {
    topmost.navigate("detalleNotificaciones/detalleN-page");  
    
    }
}

async function cliName (nombreCliente,args) {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre from Cliente1 where id= " + nombreCliente + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var obj;
    var name;
    const page = args.object;
    var bindig = page.bindingContext;

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        obj = response.content.toJSON();
        name = obj[0][0];
        var label1 = view.getViewById(page, "ofertante");
        label1.text = name;
        
    }, function (e) {

    });

    page.bindingContext = detalleViewModel;
    }
exports.cliName = cliName;
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
