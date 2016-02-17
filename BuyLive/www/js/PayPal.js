var PayPal = {
    
    callNativeFunction: function (success, fail, resultType) {
        //alert('result tpye'+resultType);
        return Cordova.exec(success, fail, "com.example.html5.PayPal", "makePayment", [resultType]);
    }
};

