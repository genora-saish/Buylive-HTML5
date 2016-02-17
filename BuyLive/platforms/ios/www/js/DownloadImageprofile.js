var DownloadImageprofile = {
    
    callNativeFunction: function (success, fail, resultType) {
        return Cordova.exec(success, fail, "com.example.html5.DownloadImageprofile", "downloadImages3", [resultType]);
    }
};