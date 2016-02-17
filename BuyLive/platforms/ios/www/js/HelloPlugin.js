

var HelloPlugin = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.HelloPlugin", "getImageFromS3", [resultType]);
    }
};