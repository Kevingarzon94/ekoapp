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
var geolocation = require("nativescript-geolocation");
// require the plugin
var Directions = require("nativescript-directions").Directions;
var array_clientes = [];
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
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var placa = appSettings.getNumber('idVehiculo', 123);
    var nombre_clientes = [];
    ///////////////////////////
    /*
    Despacho Nro. 1
    Ofertante
    Origen
    Destino
    Fecha de Cargue
    Peso
    */
   ///////////////////////////
   var urlCLientes = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Cliente1 &sessionId="+ sessionId +"&output=json&maxRows=3000";
   urlCLientes = encodeURI(urlCLientes);
   var obj1;

   await http.request({ url: urlCLientes, method: "POST" }).then(function (response) {

       obj1 = response.content.toJSON();
       nombre_clientes = obj1;

   }, function (e) {

   });

   
    var webMethod1 = "https://www.impeltechnology.com/rest/api/selectQuery?query=select id,Nmero_Consecutivo_oc,R8676030,Origen,'',Fecha_y_Hora_de_Cargue,Total_Toneladas_Despacho from Despacho where status=8544722 and R8544591 = " + placa + " order by Nmero_Consecutivo_oc desc&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod1 = encodeURI(webMethod1);
    var clientesArray = await onInitserOrders();
    const page = args.object;
    var bindig = page.bindingContext;

    http.request({ url: webMethod1, method: "POST" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];
            if(obj.length < 1) {
            alert("No se Econtraron Nuevos Viajes Disponibles.");
            var topmost = frameModule.topmost();
            topmost.navigate("home/home-page"); 

            return;
            }
        for (var i = 0; i < obj.length; i++) {

            var origen= "Origen: ";
            for (var k=0; k<clientesArray.length; k++) {

            if (obj[i][3] == clientesArray[k][1]){
                origen = "Origen: "+clientesArray[k][0];     
            }
/*            if (obj[i][1] == clientesArray[k][1]){
                destino1 = "Destino: "+clientesArray[k][0];*/
            
        }       

        var nCons = "Despacho Nro." + obj[i][1];
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

    }, function (e) {

    });


    page.addCssFile("css/style.css");
    page.bindingContext = ordensViewModel;
}


/*async function onMapReady(args) {
    geolocation.isEnabled().then(function (isEnabled) {
        if (!isEnabled) {
            geolocation.enableLocationRequest().then(function () {
            }, function (e) {
                console.log("Error: " + (e.message || e));
            });
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });

    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {
        
        if (loc) {
            console.log("Current location is: " + loc);
        }
    
        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(loc.latitude, loc.longitude);
        marker.title = "Colombia";
        marker.snippet = "Bogota";
        marker.userData = { index : 1};
        mapView.addMarker(marker);
       
        // Disabling zoom gestures
        mapView.zoom = 15;
        mapView.latitude = loc.latitude;
        mapView.longitude = loc.longitude;
        mapView.settings.zoomGesturesEnabled = true;
        mapView.settings.myLocationButtonEnabled = true;

    }, function(e){
        console.log("Error: " + e.message);
    });

    var mapView = args.object;


  }*/
  function onMarkerSelect(args) {
     console.log("Clicked on " +args.marker.title);
  }
  
  function onCameraChanged(args) {
      console.log("Camera changed: " + JSON.stringify(args.camera)); 
  }
  function ontapList(args){
    appSettings.setNumber('numberO', args.object.items[args.index].Norden);
    var origen = args.object.items[args.index].Origen;
    var destino = args.object.items[args.index].destino;

    var directions = new Directions();

    directions.available().then(
      function(avail) {
        console.log(avail ? "Yes" : "No");
      }
    );
 
    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {     
        if (loc) {
            console.log("Current location is: " + loc);
        }
            directions.navigate({
            from: { // optional, default 'current location'
                lat: loc.latitude,
                lng: loc.longitude
            },
            to: [{ // if an Array is passed (as in this example), the last item is the destination, the addresses in between are 'waypoints'.
             address: origen,
             },
             {
             address: destino
             }],
            // for iOS-specific options, see the TypeScript example below.
            }).then(
            function() {
                console.log("Maps app launched.");
            },
            function(error) {
                console.log(error);
            }
            );
    }, function(e){
        console.log("Error: " + e.message);
    });


  }
  function onButtoTapOrder(args) {
    appSettings.setNumber('numberO', args.object.items[args.index].Norden);    
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
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Ciudad where Codigo_Ciudad=000 &sessionId="+ sessionId +"&output=json&maxRows=3000";
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
   // exports.onMapReady = onMapReady;
    exports.onMarkerSelect = onMarkerSelect;
    exports.onCameraChanged = onCameraChanged;
    exports.onNavigatingTo = onNavigatingTo;