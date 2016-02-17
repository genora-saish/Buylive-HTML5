// GLOBAL VARS
 var social_login_id
 var my_client_id = "360777100733228", // YOUR APP ID
	my_secret = "ffa3e179717af5466940731a1328e71e", // YOUR APP SECRET 
	my_redirect_uri = "http://websitedevelopmentindia.org/integrate/facebook.html", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
	
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var cb;
var client_browser;
           
        var Facebook = {
	init:function(){
		
		// Begin Authorization
		var fb_token = localStorage.getItem('facebook_token');
		
		var authorize_url = "https://www.facebook.com/logout.php?next=http://websitedevelopmentindia.org&access_token="+fb_token
		 // Open Child browser and ask for permissions
	
		 cb=window.open(authorize_url,'_blank', 'location=yes');
		 cb.addEventListener('loadstart', function(loc) { cb.close();ok();});


	}
	};
	
	function ok()
{
	location.href='registration.html';
}
	