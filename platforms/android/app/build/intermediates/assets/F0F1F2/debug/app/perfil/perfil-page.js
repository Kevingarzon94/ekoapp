const PerfilViewModel = require("./perfil-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const perfilViewModel = new PerfilViewModel();
const geoLocation = require("nativescript-geolocation");
var view = require("ui/core/view");
var appSettings = require('application-settings');
const http = require("http");
const frameModule = require("ui/frame");


function onNavigatingTo(args) {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var nit = appSettings.getString('nit', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select nombre,nit,Licencia_de_Conduccin,eps_,'',c_c_asociado,'',celular from Proveedor where nit = '" + nit + "'&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;

    http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();

            var label1 = view.getViewById(page, "nameP");
            label1.text = obj[0][0];
            
            var label2 = view.getViewById(page, "ccP");
            label2.text = obj[0][1];

            var label3 = view.getViewById(page, "licenciaP");
            label3.text = obj[0][2];

            var label4 = view.getViewById(page, "seguridadsP");
            label4.text = obj[0][3];

            var label5 = view.getViewById(page, "soatP");
            label5.text = obj[0][4];

            var label8 = view.getViewById(page, "numerocP");
            label8.text = obj[0][7];

    }, function (e) {

    });

    page.addCssFile("css/style.css");
    
    page.bindingContext = perfilViewModel;

}
function onBack(){
    var key = appSettings.getNumber('key', 123);
    var topmost = frameModule.topmost();
    
    topmost.navigate("home/home-page");  

}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
