const PagosViewModel = require("./pagos-view-model");
const pagosViewModel = new PagosViewModel();
var appSettings = require('application-settings');
const frameModule = require("ui/frame");
const http = require("http");
var view = require("ui/core/view");


function onNavigatingTo(args) {

    var sessionId = appSettings.getString('sessionId', 'defaultValue');
    var placa = appSettings.getNumber('idVehiculo', 123);
    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select R6797131,SUM (Valor_a_Pagar) from Manifiesto where R6934255 = " + placa + " group by R6797131&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    const page = args.object;
    var bindig = page.bindingContext;

    http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();
        var items = [];

        for (var i = 0; i < obj.length; i++) {
        
            var nomMa = "No de Pago: " + obj[i][0];
            var money = "Valor: $" + obj[i][1];
            items.push({ Nomanifest: nomMa, money: money});    
        
        }
        
        var listview = view.getViewById(page, "listview");
        listview.items = items;

    }, function (e) {

    });
   
    

    page.bindingContext = pagosViewModel;

}


function onBack(){
    var topmost = frameModule.topmost(); 
    topmost.navigate("home/home-page");     
  
  }
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
