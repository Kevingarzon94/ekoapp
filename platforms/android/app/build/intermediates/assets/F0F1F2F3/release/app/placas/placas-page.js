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
const PlacasViewModel = require("./placas-view-model");
const frameModule = require("ui/frame");
const placasViewModel = new PlacasViewModel();
var appSettings = require('application-settings');
const http = require("http");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var view = require("ui/core/view");
var plcasConductor = [];
var sessionId;

async function onNavigatingTo(args) {
    const page = args.object;

    var idProveedor = appSettings.getNumber('id', 123);
    sessionId = appSettings.getString('sessionId', 'defaultValue');    

    var webMethod = "https://www.impeltechnology.com/rest/api/getRelationships?&sessionId="+sessionId+"&objName=Proveedor&id="+idProveedor+"&relName=R6919788&fieldList=name&output=json";
    webMethod = encodeURI(webMethod);
    
    plcasConductor.length = 0;
    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();

        for (var i = 0; i < obj.length; i++) {

            plcasConductor.push( obj[i].name );    


        }
        var listview = view.getViewById(page, "placaId");
        listview.items = plcasConductor;

   }, function (e) {

   });
    
    page.addCssFile("css/style.css");
    page.bindingContext = placasViewModel;
}
function tapPrueba (args) {
  var placas = plcasConductor;
  const page = args.object;
  const bindingContext = page.bindingContext;

  var listview = view.getViewById(page, "placaId");

    var loader = new LoadingIndicator();
    
    
    var options = {
        message: 'Cargando ...'
      };
    loader.show(options);  
    
//  appSettings.setNumber('idVehiculo', obj[0][2]);


    var webMethod1 = "https://www.impeltechnology.com/rest/api/selectQuery?query=select id from vehiculo1 where name = '" + placas[bindingContext.selectedListPickerIndex] + "' &sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod1 = encodeURI(webMethod1);

    http.request({ url: webMethod1, method: "POST" }).then(function (response) {

        var obj = response.content.toJSON();
        
        appSettings.setNumber('idVehiculo', obj[0][0]);       

   }, function (e) {

   });

//////////////////////////////////////////////////

    var topmost = frameModule.topmost();
    topmost.navigate("home/home-page");
    loader.hide();
}


async function onSigninButtonTap (args) {
    const button = args.object;
    const bindingContext = button.bindingContext;
    var loader = new LoadingIndicator();
    
    
    var options = {
        message: 'Cargando ...'
      };
    loader.show(options);  
    
    var topmost = frameModule.topmost();
    topmost.navigate("home/home-page");
    loader.hide();

}
exports.tapPrueba = tapPrueba;
exports.onNavigatingTo = onNavigatingTo;
exports.onSigninButtonTap = onSigninButtonTap;


