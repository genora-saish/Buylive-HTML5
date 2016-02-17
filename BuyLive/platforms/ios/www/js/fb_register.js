 // GLOBAL VARS
 var social_login_id
 var my_client_id = "106448310962", // YOUR APP ID
	my_secret = "ffa3e179717af5466940731a1328e71e", // YOUR APP SECRET 
	my_redirect_uri = "www.genorainfotech.com", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
	
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var cb;
var client_browser;
           
        var Facebook = {
	init:function(){
		
		// Begin Authorization
		var authorize_url = "https://graph.facebook.com/oauth/authorize?";
		 authorize_url += "client_id=" + my_client_id;
		 authorize_url += "&redirect_uri=" + my_redirect_uri;
		 authorize_url += "&display=" + my_display;
		 authorize_url += "&scope=publish_stream,user_photos,email,user_online_presence,offline_access"
		 authorize_url +="&auth_type=reauthenticate"
		 // Open Child browser and ask for permissions
	/* client_browser = ChildBrowser.install();
		window.plugins.childBrowser.onLocationChange = function(loc){
			 Facebook.facebookLocChanged(loc);
		 };*/
		 cb=window.open(authorize_url,'_blank', 'location=no');
		 cb.addEventListener('loadstart', function(loc) { Facebook.facebookLocChanged(loc.url,cb);});
	/*	 if (client_browser != null) {
			window.plugins.childBrowser.showWebPage(authorize_url);
		 }*/ 
//window.plugins.childBrowser.showWebPage(authorize_url);
	},
	facebookLocChanged:function(loc){

		// When the childBrowser window changes locations we check to see if that page is our success page.
		if (loc.indexOf("http://websitedevelopmentindia.org/integrate/facebook.html") >= 0) {
		
			var fbCode = loc.match(/code=(.*)$/)[1]
			console.log('https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&redirect_uri='+my_redirect_uri+'&client_secret='+my_secret+'&code='+fbCode);
			$.ajax({
				url:'https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&redirect_uri='+my_redirect_uri+'&client_secret='+my_secret+'&code='+fbCode,
				data: {},
				dataType: 'text',
				type: 'GET',
				success: function(data, status){
					
					
					// We store our token in a localStorage Item called facebook_token
					localStorage.setItem("facebook_token", data.split("=")[1]);
					var fb_token = localStorage.getItem("facebook_token");
		
				var accessToken = data.split("=")[1];
				console.log(accessToken);

$.ajax({
    url: "https://graph.facebook.com/me?access_token="+data.split("=")[1],
        data: {},
		dataType: 'text',
		type: "GET",
		contentType:'json',
		success: function (response, textStatus) { 
		var dat=jQuery.parseJSON(response);
		//console.log(dat['id']);
		//alert('fbdata'+dat);
		//alert(dat['email']);
		//alert(str);
		var str = dat['email'].replace("u0040","@");
		localStorage.setItem('reg_flag',1);
		localStorage.setItem('username_fb',dat['username']);
		localStorage.setItem('fname_fb',dat['first_name']);
		localStorage.setItem('lname_fb',dat['last_name']);
		localStorage.setItem('email_fb',dat['email']);
		
		cb.close();
		ok();
									
										

    },
    error: function (jqXHR, textStatus, errorThrown) 
	{
	alert("error");
	cb.close();
    }
});

					//app.init();
				},
				error: function(error) {
					
					cb.close();
					//window.plugins.childBrowser.close();
				}
			});
			// Set the access token here

		}
	},
	share:function(url){
		
		// Create our request and open the connection
		var req = new XMLHttpRequest(); 
		req.open("POST", url, true);
		
		
		req.send(null); 
		return req;
	},
	post:function(_fbType,params){
			
		// Our Base URL which is composed of our request type and our localStorage facebook_token
		var url = 'https://graph.facebook.com/me/'+_fbType+'?access_token='+localStorage.getItem(facebook_token);
		
		// Build our URL
		for(var key in params){
			if(key == "message"){
				
				// We will want to escape any special characters here vs encodeURI
				url = url+"&"+key+"="+escape(params[key]);
			}
			else {
				url = url+"&"+key+"="+encodeURIComponent(params[key]);
			}
		}
		
		var req = Facebook.share(url);
		
		// Our success callback
		req.onload = Facebook.success();
	},
	success:function(){
	
		$("#statusTXT").show();
		$("#statusBTN").show();
					
		// hide our info
		$("#info").hide();
		
		// reset our field
		$("#statusTXT").val('');
		
		console.log("DONE!");
		
	}
};


function ok()
{
	location.href='registration_facebook.html';
}

