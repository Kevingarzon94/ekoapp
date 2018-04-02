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
const LoginViewModel = require("./login-view-model");
const frameModule = require("ui/frame");
const loginViewModel = new LoginViewModel();
var appSettings = require('application-settings');
const http = require("http");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;


function onNavigatingTo(args) {
    const page = args.object;

    page.addCssFile("css/style.css");

    page.bindingContext = loginViewModel;
}
async function onSigninButtonTap (args) {
    const button = args.object;
    const bindingContext = button.bindingContext;
    var loader = new LoadingIndicator();
    var options = {
        message: 'Cargando ...'
      };
    loader.show(options);  
    
    
    var sessionId = await sessionIdreturn();
    var email = bindingContext.email;
    var pass = bindingContext.password;
    var login = await loginValidation(sessionId,email,pass);

    appSettings.setString('email', sessionId);
    loader.hide();

}

async function sessionIdreturn () {

    var user = "ekokarga.movil";
    var pass = "qwerty123";
    var result;
    var sessionId;


    
    console.log("SessionIdreturn");
    
    var webMethod = "https://www.impeltechnology.com/rest/api/login?loginName="+ user +"&password="+ pass +"&output=json";
    var sessionId;

    await http.request({
        url: webMethod,
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }).then(function (response) {
    result = response.content.toJSON();
    sessionId = result.sessionId;
    appSettings.setString('sessionId', sessionId);

    //console.log(sessionId);


    }, function (e) {
        console.log("Error occurred " + e);
    });

    return sessionId;
}

async function loginValidation(sessionId,email,pass){

    var webMethod = "https://www.impeltechnology.com/rest/api/selectQuery?query=select loginName,nombre,R6919788,nit,id from Proveedor where Login_Conductor = '" + email + "' and Clave_Conductor = '"+pass+"'&sessionId="+ sessionId +"&output=json&maxRows=3000";
    webMethod = encodeURI(webMethod);
    var query;
    var topmost = frameModule.topmost();
    await http.request({ url: webMethod, method: "GET" }).then(function (response) {

        var obj = response.content.toJSON();

        if (obj.length > 0) {
            
            appSettings.setString('nombreprov', obj[0][1]);
//          appSettings.setNumber('idVehiculo', obj[0][2]);
            appSettings.setString('nit', obj[0][3]);
            appSettings.setNumber('id', obj[0][4]);

            topmost.navigate("placas/placas-page");
            
        }else {
            alert("Usuario o contraseña Incorrecto");
        }

   }, function (e) {

   });

}


/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onSigninButtonTap = onSigninButtonTap;
exports.loginValidation = loginValidation;
exports.sessionIdreturn = sessionIdreturn;


