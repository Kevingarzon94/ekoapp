const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");
const frameModule = require("ui/frame");
const geoLocation = require("nativescript-geolocation");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({

        currentGeoLocation: null,

        enableLocationServices: function () {
          geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
              geoLocation.enableLocationRequest().then(() => this.showLocation());
            } else {
              this.showLocation();
            }
          });
        },
    
        showLocation: function () {
          geoLocation.watchLocation(location => {
            this.currentGeoLocation = location;
          }, error => {
            alert(error);
          }, {
              desiredAccuracy: 3,
              updateDistance: 10,
              minimumUpdateTime: 1000 * 1
            });
        },    

        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
        
        navigatetoOrdens: function () {
            var topmost = frameModule.topmost();
            topmost.navigate("ordenServicio/ordens-page");

        },
        navigatetoNotification: function (){
            var topmost = frameModule.topmost();
            topmost.navigate("notificaciones/notificaciones-page");           
        },
        navigatetoPayments: function (){
          var topmost = frameModule.topmost();
          topmost.navigate("pagos/pagos-page");           
      },
      navigatetoPerfil: function (){
        var topmost = frameModule.topmost();
        topmost.navigate("perfil/perfil-page");           
    },
    back: function (){
      var topmost = frameModule.topmost();
      topmost.navigate("login/login-page");           
    },    
      });
    return viewModel;
}

module.exports = HomeViewModel;
