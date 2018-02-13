const Observable = require("data/observable").Observable;
var appSettings = require('application-settings');
const observableModule = require("data/observable");


function ordensViewModel() {

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
      
    });
    return viewModel;
}

module.exports = ordensViewModel;
