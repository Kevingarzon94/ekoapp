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
var camera = require("nativescript-camera");


function onNavigatingTo(args) {

     //appSettings.setNumber('numberO', args.object.items[args.index].Norden);
    
    /* var ofertanteName = appSettings.getString('Offer', 'DefaultValue');
        var label1 = view.getViewById(page, "ofertante");
        label1.text = ofertanteName;*/
    var key = appSettings.getNumber('key', 123);

    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var NumeroOrden = appSettings.getNumber('numberO', 123);
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select R6311987,R7442986,PesoTON,Origen,fecha_y_hora_de_cargue,Destino,fecha_y_hora_de_descargue,numeros_de_entregas,Total_Costo from Servicio where Num_Servicio = " + NumeroOrden + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;
    var keystatus = appSettings.getNumber('notStatus', 123);

    http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        
        cliName(obj[0][0],args);
        tipos_mercancia(obj[0][1],args);
        origen(obj[0][3],args);
        destino(obj[0][5],args);
        
        var label3 = view.getViewById(page, "vol_carga");
        label3.text = obj[0][2];
        
        var label5 = view.getViewById(page, "hora_fecha");
        label5.text = obj[0][4];

        var label7 = view.getViewById(page, "hora_fecha_d");
        label7.text = obj[0][6];

        var label8 = view.getViewById(page, "num_entregas");
        label8.text = obj[0][7];

        var label9 = view.getViewById(page, "ValorSer");
        label9.text = obj[0][8];
    
    }, function (e) {

    });
    
    var button1 = view.getViewById(page, "accept");
    var button2 = view.getViewById(page, "refuse");
    if( key == 2) {


        button1.visibility = "collapsed";
        button2.visibility = "collapsed";
    
    } else {
        button1.visibility = "visible";
        button2.visibility = "visible";
    
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

    async function tipos_mercancia (idMercancia,args) {
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre from Tipos_de_Mercancia where id= " + idMercancia + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var obj;
    var name;
    const page = args.object;
    var bindig = page.bindingContext;

    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        obj = response.content.toJSON();
        name = obj[0][0];
        var label2 = view.getViewById(page, "Tipo_carga");
        label2.text = name;
        
    }, function (e) {

    });

    page.bindingContext = detalleViewModel;
    }

    async function origen (idSede,args) {
        var sessionId = appSettings.getString('sessionId', 'defaultValue');
        var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre from Ciudad where id= " + idSede + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
        webMethod = encodeURI(webMethod);
        var obj;
        var name;
        const page = args.object;
        var bindig = page.bindingContext;
    
        await http.request({ url: webMethod, method: "GET" }).then(function (response) {
    
            obj = response.content.toJSON();
            name = obj[0][0];
            var label4 = view.getViewById(page, "origen");
            label4.text = name;
            
        }, function (e) {
    
        });
    
        page.bindingContext = detalleViewModel;
        }

        async function destino (idDestino,args) {
            var sessionId = appSettings.getString('sessionId', 'defaultValue');
            var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select Nombre from Ciudad where id= " + idDestino + "&sessionId="+ sessionId +"&output=json&maxRows=3000";
            webMethod = encodeURI(webMethod);
            var obj;
            var name;
            const page = args.object;
            var bindig = page.bindingContext;
        
            await http.request({ url: webMethod, method: "GET" }).then(function (response) {
        
                obj = response.content.toJSON();
                name = obj[0][0];
                var label6 = view.getViewById(page, "destino");
                label6.text = name;
                
            }, function (e) {
        
            });
        
            page.bindingContext = detalleViewModel;
            }
    
    function onButtonTap () {
        alert("Aceptado");
        var topmost = frameModule.topmost();   
        topmost.navigate("home/home-page");
    }

    function onButtonTap1 () {
        alert("Rechazado");
        var topmost = frameModule.topmost();
        topmost.navigate("home/home-page"); 

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

exports.onButtonTap = onButtonTap;
exports.onButtonTap1 = onButtonTap1;
exports.onButtonTap2 = onButtonTap2;
exports.cliName = cliName;
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
