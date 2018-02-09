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
const OrdensViewModel = require("./ordens-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const ordensViewModel = new OrdensViewModel();
var appSettings = require('application-settings');
const http = require("http");
const frameModule = require("ui/frame");
var view = require("ui/core/view");


async function onNavigatingTo(args) {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var placa = appSettings.getNumber('idVehiculo', 123);
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Num_Servicio,R6311987,CarroceriaServ from Servicio where status=6957915 and R6947057 = " + placa + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var clientesArray = await onInitserOrders();
    const page = args.object;
    var bindig = page.bindingContext;

    http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];

        for (var i = 0; i < obj.length; i++) {

            var cliente;


        for (var k=0; k<clientesArray.length; k++) {

            if (obj[i][1] == clientesArray[k][1]){
                cliente = clientesArray[k][0];     
            }
        }        

            items.push({ Norden: obj[i][0], Origen: cliente , destino: obj[i][2]});    
        
        }
        
        var listview = view.getViewById(page, "listview");
        listview.items = items;

    }, function (e) {

    });
   
    
    
    page.addCssFile("css/style.css");
    page.bindingContext = ordensViewModel;
}


function findCli(idcliente) {

}
/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/

function onMapReady(args) {
    var mapView = args.object;
  
    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(4.7341279, -74.0242537);
    marker.title = "Sydney";
    marker.snippet = "Australia";
    marker.userData = { index : 1};
    mapView.addMarker(marker);
    
    // Disabling zoom gestures
    mapView.settings.zoomGesturesEnabled = true;
  }
  function onMarkerSelect(args) {
     console.log("Clicked on " +args.marker.title);
  }
  
  function onCameraChanged(args) {
      console.log("Camera changed: " + JSON.stringify(args.camera)); 
  }
  function ontapList(args){
    appSettings.setNumber('numberO', args.object.items[args.index].Norden);

  }
  function onButtoTapOrder() {
    var key = 1;
    appSettings.setNumber('key', key);      
    var topmost = frameModule.topmost();
    topmost.navigate("detalleos/detalle-page");     
    
  }
  function onBack(){
    var topmost = frameModule.topmost(); 
    topmost.navigate("home/home-page");     
  
  }
 async function onInitserOrders () {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Cliente1 &sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var obj;
    var name;

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        obj = response.content.toJSON();
        console.log("ok");

    }, function (e) {

    });

    return obj;
    }
    exports.onInitserOrders = onInitserOrders;  
    exports.onBack = onBack;
    exports.ontapList = ontapList;
    exports.onButtoTapOrder = onButtoTapOrder;
    exports.onMapReady = onMapReady;
    exports.onMarkerSelect = onMarkerSelect;
    exports.onCameraChanged = onCameraChanged;
    exports.onNavigatingTo = onNavigatingTo;
