var DownloadImage = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.DownloadImage", "downloadImages3", [resultType]);
    }
};