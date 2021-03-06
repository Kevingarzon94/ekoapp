"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directions_common_1 = require("./directions.common");
var application = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var com;
var Directions = (function (_super) {
    __extends(Directions, _super);
    function Directions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Directions.prototype.isPackageInstalled = function () {
        try {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://maps.google.com/maps"));
            var pm = com.tns.NativeScriptApplication.getInstance().getPackageManager();
            return intent.resolveActivity(pm) != null;
        }
        catch (e) {
        }
        return true;
    };
    Directions.prototype.available = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.isPackageInstalled());
        });
    };
    Directions.prototype.navigate = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var fromToQs = Directions.getFromToQuerystring(options);
                if (!_this.isPackageInstalled()) {
                    utils.openUrl("http://maps.google.com/maps" + fromToQs);
                }
                else {
                    var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://maps.google.com/maps" + fromToQs));
                    application.android.currentContext.startActivityForResult(intent, 0);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return Directions;
}(directions_common_1.DirectionsCommon));
exports.Directions = Directions;
//# sourceMappingURL=directions.js.map