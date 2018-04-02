
const NotificacionesViewModel = require("./notificaciones-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const notificacionesViewModel = new NotificacionesViewModel();
var appSettings = require('application-settings');
const frameModule = require("ui/frame");
var camera = require("nativescript-camera");
var fs = require('file-system');
var imageSource = require("tns-core-modules/image-source");
const http = require("http");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var idIncidencia;
var idIncidenciaEvidencia;
var base64String = '';
var view = require("ui/core/view");

function onNavigatingTo(args) {

    const page = args.object;
    
    page.addCssFile("css/style.css");

    page.bindingContext = notificacionesViewModel;
}

function onBack(){
    var topmost = frameModule.topmost(); 
    topmost.navigate("notificaciones/notificaciones-page");     
  
}
async function fotoRemesa1 () {
    try {
    var fielNameRemesa = "Imagen_Remesa_1";
    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var idOrdenS = appSettings.getNumber('nOrdenConfirmada', 123);
    camera.requestPermissions();        
    var imageModule = require("ui/image");
    camera.takePicture()   
        .then(function (imageAsset) {
            
            var img = imageAsset;
          
            var imgLocal = imageSource.fromFile(img._android);
            base64String = imgLocal.toBase64String("jpg",10);
            
              
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    } catch (f) {
        alert(f);
    }

}
async function crearIncidencia(args) {
  var idOrdenS = appSettings.getNumber('nOrdenConfirmada', 123);
  var sessionId = appSettings.getString('sessionId', 'defaultValue');
  

  var fecha = new Date();
  fecha = fecha.getTime();

  const button = args.object;
  const bindingContext = button.bindingContext;
  var comentariosIncidencias = bindingContext.ComentarioIncidencia; 
  var tipo = bindingContext.listPickerCountries;
  var tipo_vehiculo = tipo[bindingContext.selectedListPickerIndex]

  var webMethod1 = "https://www.impeltechnology.com/rest/api/createRecord?&output=json&objName=Incidencia&useIds=false&Fecha="+fecha+"&Detalle="+comentariosIncidencias+"&Novedad_Conductor="+tipo_vehiculo+"&R6983225="+idOrdenS+"&sessionId="+sessionId;
  webMethod1 = encodeURI(webMethod1);

  await http.request({ url: webMethod1, method: "GET" }).then(function (response) {

    var obj = response.content.toJSON();
    idIncidencia = obj.id;


}, function (e) {

});
var webMethod3 = "https://www.impeltechnology.com/rest/api/createRecord?&output=json&objName=Incidencia_Documento&useIds=false&R7542506="+idIncidencia+"&sessionId="+sessionId;
webMethod3 = encodeURI(webMethod3);
await http.request({ url: webMethod3, method: "GET" }).then(function (response) {

  var obj = response.content.toJSON();
  idIncidenciaEvidencia = obj.id;     

}, function (e) {

});
if (base64String != ''){

  uploadIMG (base64String,sessionId,'Imagen_Incidencia');

} else {
  alert("Incidencia Cargada Satisfactoriamente");
  var topmost = frameModule.topmost(); 
  topmost.navigate("notificaciones/notificaciones-page");   
}

}
async function createEvidenciaIncidencia() {

}
function uploadIMG (base64String,sessionId,fielNameRemesa) {
    try {

      
      var loader = new LoadingIndicator();
      var options = {
          message: 'Cargando ...'
        };
      loader.show(options);  
        var xhr = new XMLHttpRequest();
        var url = "https://www.impeltechnology.com/rest/api/setBinaryData?sessionId=";
        var content = {
          "id": idIncidenciaEvidencia,
          "fieldName": fielNameRemesa,
          "fileName": 'imagen_incidencia.jpg',
          "contentType": 'jpg',
          "value": base64String
        };   
        var params = buildUrlParams(content);
        xhr.open("POST", url + sessionId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = async function () {
          try {
          if (xhr.readyState == 4 && xhr.status == 200) {
            loader.hide();
              alert(" Incidencia y evidencia cargada satisfactoriamente", "success");
              var topmost = frameModule.topmost(); 
              topmost.navigate("notificaciones/notificaciones-page");             
    
          }
        } 
       catch (f) {
          alert("f " + f);
      } }
        var eqd = encodeQueryData(content);
    
        xhr.onprogress = function (e) {
          try {
            if (e.lengthComputable) {
              var percentComplete = (e.loaded / e.total) * 100;
              //document.getElementById('porcentaje').innerHTML = percentComplete + '% uploaded';
            }
          } catch (f) {
            alert("f " + f);
          }
        };
    
        xhr.onload = function () {
          try {
            if (this.status == 200) {
              //document.getElementById('porcentaje').innerHTML = "Imagen cargada satisfactoriamente";
            };
          } catch (m) {
            alert("m " + m);
          }
        };
        xhr.onerror = function () {
          alert("error");
        };
        xhr.onabort = function () {
          alert("abort");
        };
        xhr.ontimeout = function () {
          alert("timeout");
        };
        xhr.onloadstart = function () {
          //document.getElementById('porcentaje').innerHTML = 'Cargando imagen';
        };
        xhr.onloadend = function () {
          //document.getElementById('porcentaje').innerHTML = 'Imagen cargada';
        };
      
      xhr.send(eqd);         
    } catch (error) {
        console.log(error);
    } 
}
function buildUrlParams(object) {
    try {
      var urlParams = [];
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          urlParams.push(key + "=" + object[key]);
        }
      }
      return urlParams.join('&');
    } catch (r) {
      alert(r);
    }
  }
  function encodeQueryData(data) {
    try {
      var ret = [];
      for (var d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      return ret.join('&');
    } catch (s) {
      alert("s " + s);
    }
  }
exports.createEvidenciaIncidencia = createEvidenciaIncidencia;
exports.crearIncidencia = crearIncidencia;
exports.encodeQueryData = encodeQueryData;  
exports.buildUrlParams = buildUrlParams;  
exports.fotoRemesa1 = fotoRemesa1;
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
exports.uploadIMG = uploadIMG;