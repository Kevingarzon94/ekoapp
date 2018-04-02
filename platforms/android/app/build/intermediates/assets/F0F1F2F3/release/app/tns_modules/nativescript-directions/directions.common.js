"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionsCommon = (function () {
    function DirectionsCommon() {
    }
    DirectionsCommon.getFromToQuerystring = function (options) {
        var dest = undefined, source = null, qs = "?saddr=";
        if (options.from) {
            if (options.from.address) {
                source = options.from.address;
            }
            else if (options.from.lat && options.from.lng) {
                source = options.from.lat + "," + options.from.lng;
            }
        }
        if (source) {
            qs += encodeURIComponent(source);
        }
        if (!options.to) {
            throw new Error("Set 'to', please.");
        }
        var toArray = options.to instanceof Array ? options.to : [options.to];
        for (var i = 0; i < toArray.length; i++) {
            var addressOptions = toArray[i];
            if (addressOptions.address) {
                dest = addressOptions.address;
            }
            else if (addressOptions.lat && addressOptions.lng) {
                dest = addressOptions.lat + "," + addressOptions.lng;
            }
            else {
                throw new Error("Either set 'address' or 'lat' and 'lng'.");
            }
            qs += (i === 0 ? "&daddr=" : "+to:") + encodeURIComponent(dest);
        }
        return qs;
    };
    return DirectionsCommon;
}());
exports.DirectionsCommon = DirectionsCommon;
//# sourceMappingURL=directions.common.js.map