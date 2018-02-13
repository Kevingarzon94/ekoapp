const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");
const frameModule = require("ui/frame");


function PagosViewModel() {
    const viewModel = observableModule.fromObject({

        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
        
    });
    return viewModel;
}

module.exports = PagosViewModel;
