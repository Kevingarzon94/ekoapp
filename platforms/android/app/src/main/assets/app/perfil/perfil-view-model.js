const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");
const frameModule = require("ui/frame");
const geoLocation = require("nativescript-geolocation");

function PerfilViewModel() {
    const viewModel = observableModule.fromObject({
        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
      });
    return viewModel;
}

module.exports = PerfilViewModel;
