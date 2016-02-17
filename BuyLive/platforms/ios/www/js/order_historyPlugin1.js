

var order_historyPlugin1 = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.order_historyPlugin1", "getImageFromS3", [resultType]);
    }
};