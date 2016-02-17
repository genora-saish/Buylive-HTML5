

var order_historyPlugin = {
    
    callNativeFunction: function (success, fail, resultType) {
        
        return cordova.exec(success, fail, "order_historyPlugin", "getImageFromS3", [resultType]);
    }
};