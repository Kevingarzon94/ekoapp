const HomeViewModel = require("./home-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
const homeViewModel = new HomeViewModel();
const geoLocation = require("nativescript-geolocation");


function onNavigatingTo(args) {

    const page = args.object;
    page.addCssFile("css/style.css");
    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = homeViewModel;
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/

function onMapReady(args) {
    var mapView = args.object;

    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
    marker.title = "Sydney";
    marker.snippet = "Australia";
    marker.userData = { index : 1};
    mapView.addMarker(marker);
    
    // Disabling zoom gestures
    mapView.settings.zoomGesturesEnabled = true;
    mapView.settings.myLocationButtonEnabled = true;
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