const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");
const frameModule = require("ui/frame");


function HomeViewModel() {
    const viewModel = observableModule.fromObject({

        nombreConductor: appSettings.getString('nombreprov', 'defaultValue'),
        
        navigatetoOrdens: function () {
            var topmost = frameModule.topmost();
            topmost.navigate("ordenServicio/ordens-page");

        },
    });
    return viewModel;
}

module.exports = HomeViewModel;
