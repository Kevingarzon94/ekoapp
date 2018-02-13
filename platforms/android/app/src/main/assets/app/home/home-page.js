const HomeViewModel = require("./home-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const homeViewModel = new HomeViewModel();
var geolocation = require("nativescript-geolocation");


function onNavigatingTo(args) {


    const page = args.object;
    page.addCssFile("css/style.css");
    

    page.bindingContext = homeViewModel;
}

function onMapReady(args) {
    geolocation.isEnabled().then(function (isEnabled) {
        if (!isEnabled) {
            geolocation.enableLocationRequest().then(function () {
            }, function (e) {
                console.log("Error: " + (e.message || e));
            });
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });

    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {
        
        if (loc) {
            console.log("Current location is: " + loc);
        }
    
        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(loc.latitude, loc.longitude);
        marker.title = "Colombia";
        marker.snippet = "Bogota";
        marker.userData = { index : 1};
        mapView.addMarker(marker);
        
        // Disabling zoom gestures
        mapView.zoom = 15;
        mapView.latitude = loc.latitude;
        mapView.longitude = loc.longitude;
        mapView.settings.zoomGesturesEnabled = true;
        mapView.settings.myLocationButtonEnabled = true;

    }, function(e){
        console.log("Error: " + e.message);
    });

    var mapView = args.object;


  }
  function onMarkerSelect(args) {
     console.log("Clicked on " +args.marker.title);
  }
  
  function onCameraChanged(args) {
      console.log("Camera changed: " + JSON.stringify(args.camera)); 
  }
exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onNavigatingTo = onNavigatingTo;
