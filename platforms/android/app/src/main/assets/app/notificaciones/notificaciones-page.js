
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

function onNavigatingTo(args) {

    const page = args.object;
    
    page.addCssFile("css/style.css");

    page.bindingContext = notificacionesViewModel;
}

function onBack(){
    var topmost = frameModule.topmost(); 
    topmost.navigate("detalleos/detalle-page");     
  
}
async function fotoRemesa1 () {
    try {
    var base64String;
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
            
            base64String = base64String;
              //var webMethod = "https://www.impeltechnology.com/rest/api/setBinaryData?id="+idOrdenS+"&fieldName=Imagen_Remesa_1&fileName=fotoRemesa1.jpg&contentType=jpg&value="+base64String+"&sessionId="+ sessionId ;
              
            uploadIMG (idOrdenS,base64String,sessionId,fielNameRemesa);

        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    } catch (f) {
        alert(f);
    }

}
async function fotoRemesa2 () {
  try {
  var base64String;
  var fielNameRemesa = "Imagen_Remesa_2";
  var sessionId = appSettings.getString('sessionId', 'defaultValue');
  var idOrdenS = appSettings.getNumber('nOrdenConfirmada', 123);
  camera.requestPermissions();        
  var imageModule = require("ui/image");
  camera.takePicture()   
      .then(function (imageAsset) {
          
          var img = imageAsset;
        
          var imgLocal = imageSource.fromFile(img._android);
          base64String = imgLocal.toBase64String("jpg",10);
          base64String = base64String;
            //var webMethod = "https://www.impeltechnology.com/rest/api/setBinaryData?id="+idOrdenS+"&fieldName=Imagen_Remesa_1&fileName=fotoRemesa1.jpg&contentType=jpg&value="+base64String+"&sessionId="+ sessionId ;
            
          uploadIMG (idOrdenS,base64String,sessionId,fielNameRemesa);

      }).catch(function (err) {
          console.log("Error -> " + err.message);
      });
  } catch (f) {
      alert(f);
  }

}
async function fotoRemesa3 () {
  try {
  var base64String;
  var fielNameRemesa = "Imagen_Remesa_3";
  var sessionId = appSettings.getString('sessionId', 'defaultValue');
  var idOrdenS = appSettings.getNumber('nOrdenConfirmada', 123);
  camera.requestPermissions();        
  var imageModule = require("ui/image");
  camera.takePicture()   
      .then(function (imageAsset) {
          
          var img = imageAsset;
        
          var imgLocal = imageSource.fromFile(img._android);
          base64String = imgLocal.toBase64String("jpg",10);
          base64String = base64String;
            //var webMethod = "https://www.impeltechnology.com/rest/api/setBinaryData?id="+idOrdenS+"&fieldName=Imagen_Remesa_1&fileName=fotoRemesa1.jpg&contentType=jpg&value="+base64String+"&sessionId="+ sessionId ;
            
          uploadIMG (idOrdenS,base64String,sessionId,fielNameRemesa);

      }).catch(function (err) {
          console.log("Error -> " + err.message);
      });
  } catch (f) {
      alert(f);
  }

}
function uploadIMG (idOrdenS,base64String,sessionId,fielNameRemesa) {
    try {
      var loader = new LoadingIndicator();
      var options = {
          message: 'Cargando ...'
        };
      loader.show(options);  
        var xhr = new XMLHttpRequest();
        var url = "https://www.impeltechnology.com/rest/api/setBinaryData?sessionId=";
        var content = {
          "id": idOrdenS,
          "fieldName": fielNameRemesa,
          "fileName": 'fotoRemesa.png',
          "contentType": 'png',
          "value": base64String
        };   
        var params = buildUrlParams(content);
        xhr.open("POST", url + sessionId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", params.length);
        xhr.setRequestHeader("Connection", "close");
        
        xhr.onreadystatechange = async function () {
          try {
          if (xhr.readyState == 4 && xhr.status == 200) {
            loader.hide();
              alert(" Imagen cargada satisfactoriamente", "success");
    
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

function goNovedades () {
    var topmost = frameModule.topmost(); 
    topmost.navigate("novedades/notificaciones-page");     
  
}
exports.goNovedades = goNovedades;
exports.encodeQueryData = encodeQueryData;  
exports.buildUrlParams = buildUrlParams;  
exports.fotoRemesa1 = fotoRemesa1;
exports.fotoRemesa2 = fotoRemesa2;
exports.fotoRemesa3 = fotoRemesa3;
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
exports.uploadIMG = uploadIMG;