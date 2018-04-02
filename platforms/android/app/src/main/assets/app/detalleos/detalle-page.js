Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
     c = isNaN(c = Math.abs(c)) ? 2 : c,
     d = d == undefined ? "." : d,
     t = t == undefined ? "," : t,
     s = n < 0 ? "-" : "",
     i = String(parseInt(n = Math.abs(Number(n)
    || 0).toFixed(c))),
     j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) :
     "");
   };
   var view = require("ui/core/view");
   var geolocation = require("nativescript-geolocation");
   // require the plugin
   var Directions = require("nativescript-directions").Directions;

const DetalleViewModel = require("./detalle-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const detalleViewModel = new DetalleViewModel();
const frameModule = require("ui/frame");
var view = require("ui/core/view");
var appSettings = require('application-settings');
const http = require("http");
var camera = require("nativescript-camera");
var Origen_servicio = '';
var Destino_servicio = '';
var id_servicio;
var array_ciudades = [];
var array_tMercancias = [];
tipos_mercancia();
Ciudades();

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

     //appSettings.setNumber('numberO', args.object.items[args.index].Norden);
    
    /* var ofertanteName = appSettings.getString('Offer', 'DefaultValue');
        var label1 = view.getViewById(page, "ofertante");
        label1.text = ofertanteName;*/
    var key = appSettings.getNumber('key', 123);
        /*
        Servicio No
        Cliente Destino
        Direccion Destino
        Destino
        Orden del Cliente
        Tipo de Mercancia 
        */
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var NumeroOrden = appSettings.getNumber('numberO', 123);
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Num_Servicio,Cliente_Destino,Direccion_Destino,Destino,Orden_de_Servicio,R8557298,id,status from Servicio where R8476682 = " + NumeroOrden + " order by Num_Servicio desc&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;
    var keystatus = appSettings.getNumber('notStatus', 123);

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];

        for (var i = 0; i < obj.length; i++) { 
        
            var nServicio = "No Servicio: " + obj[i][0];
            var cDestino = "Cliente Destino: " + obj[i][1];
            var dirDestino = "Direccion Destino: " + obj[i][2];
            var oCliente = "Orden Cliente: " + obj[i][4];
            var color;

            if (obj[i][7] === 7590913) {
                color = "#BEF15E";               
            } else {
                color = "white";
            } 


            for (var k=0; k < array_ciudades.length; k++) {

                if (obj[i][3] == array_ciudades[k][1]){
                    var destino = "Destino: "+array_ciudades[k][0];     
                }

            } 
            for (var h=0; h < array_tMercancias.length; h++) {

                if (obj[i][5] == array_tMercancias[h][1]){
                    var t_mercancia = "Tipo de Mercancia: "+array_tMercancias[h][0];     
                }

            } 

            items.push({ nServicio: nServicio , cDestino: cDestino, dirDestino:dirDestino,destino:destino, oCliente:oCliente, t_mercancia:t_mercancia,Norden:obj[i][6],color: color});    

        }
        var listview = view.getViewById(page, "listview");
        listview.items = items;

    }, function (e) {

    });
    
    var button1 = view.getViewById(page, "accept");
    var button2 = view.getViewById(page, "refuse");
    var button4 = view.getViewById(page, "map");


    if( key == 2) {

        button1.visibility = "collapsed";
        button2.visibility = "collapsed";
       // button4.visibility = "visible";
    
    } else {
        button1.visibility = "visible";
        button2.visibility = "visible";
        //button4.visibility = "visible";

    }
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

    async function tipos_mercancia (idMercancia,args) {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select name,id from grupo_de_material_ &sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var obj;
    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        obj = response.content.toJSON();
        array_tMercancias = obj;
        
    }, function (e) {

    });

    }

    async function Ciudades () {
            var sessionId = appSettings.getString('sessionId', 'defaultValue');
            var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre,id from Ciudad where Codigo_Ciudad=000 &sessionId="+ sessionId +"&output=json&maxRows=3000";
            webMethod = encodeURI(webMethod);
            var obj;

            await http.request({ url: webMethod, method: "GET" }).then(function (response) {
            
                obj = response.content.toJSON();
                array_ciudades = obj;    
                
            }, function (e) {
        
            });
        
            }
    
    function onButtonTap () {
        var sessionId = appSettings.getString('sessionId', 'defaultValue');
        var NumeroOrden = appSettings.getNumber('numberO', 123);
        var webMethod = "https://www.impeltechnology.com/rest/api/updateRecord?&objName=Despacho&id="+ NumeroOrden +"&useIds=false&status=Aceptado x Conductor&sessionId="+sessionId;
        webMethod = encodeURI(webMethod);

        http.request({ url: webMethod, method: "GET" }).then(function (response) {
            
            alert("Aceptado");
            var topmost = frameModule.topmost();
            topmost.navigate("home/home-page");            
 
            
        }, function (e) {
    
        });       

    }

    function onButtonTap1 () {
        var sessionId = appSettings.getString('sessionId', 'defaultValue');
        var NumeroOrden = appSettings.getNumber('numberO', 123);
        var webMethod = "https://www.impeltechnology.com/rest/api/updateRecord?&objName=Despacho&id="+ NumeroOrden +"&useIds=false&status=Rechazado x Conductor&sessionId="+sessionId;
        webMethod = encodeURI(webMethod);

        http.request({ url: webMethod, method: "GET" }).then(function (response) {
            
            alert("Rechazado");
            var topmost = frameModule.topmost();
            topmost.navigate("home/home-page");            
 
            
        }, function (e) {
    
        });

    }   
    function onButtonTap2 () {
        camera.requestPermissions();        
        var imageModule = require("ui/image");
        camera.takePicture()   
            .then(function (imageAsset) {
                console.log("Result is an image asset instance");
                var image = new imageModule.Image();
                image.src = imageAsset;
                alert("Foto Cargada");
            }).catch(function (err) {
                console.log("Error -> " + err.message);
            });
    }   

    function planRuta(){

        var origen = Origen_servicio;
        var destino = Destino_servicio;
    
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
      function onItemTap(args) {
        var key = appSettings.getNumber('key', 123);
        if ( key == 1) {
        
        alert("Para Notificar Remesas y novedades debe hacerlo desde la opcion en Transito.");    
        
        } else {
        var topmost = frameModule.topmost(); 
              
        appSettings.setNumber('nOrdenConfirmada', args.object.items[args.index].Norden);
        topmost.navigate("notificaciones/notificaciones-page");            
        }        

    }
exports.planRuta = planRuta;
exports.onButtonTap = onButtonTap;
exports.onButtonTap1 = onButtonTap1;
exports.onButtonTap2 = onButtonTap2;
exports.cliName = cliName;
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
exports.Ciudades = Ciudades;
exports.tipos_mercancia = tipos_mercancia;
exports.onItemTap = onItemTap;