const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");


function ordensViewModel() {

    const viewModel = observableModule.fromObject({

        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
      
    });
    return viewModel;
}

module.exports = ordensViewModel;
