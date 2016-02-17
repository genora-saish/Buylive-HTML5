var UploadImage = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.UploadImage", "UploadImages3", [resultType]);
    }
};