

var order_historyPlugin2 = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.order_historyPlugin2", "getImageFromS3", [resultType]);
    }
};