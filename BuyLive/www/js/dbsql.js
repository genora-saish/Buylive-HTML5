function initDatabase() {
	
	try {
	    if (!window.openDatabase) {
	        alert('Databases are not supported in this browser.');
	    } else {
	        var shortName = 'BUYDEMO';
	        var version = '1.0';
	        var displayName = 'BUY Database';
	        var maxSize = 100000; //  bytes
	        BUYDEMO = window.openDatabase(shortName, version, displayName, maxSize);
			createtable();
	    }
	} catch(e) {
 
	    if (e == 2) {
	        
	        //console.log('Invalid database version.');
	    } else {
	        //console.log('Unknown error '+e+'.');
	    }
	    return;
	}
}


function custom_alert(message,title)
{
    navigator.notification.alert(
                                 message,  // message
                                 alertDismissed,         // callback
                                 title,            // title
                                 'OK'                  // buttonName
                                 );
}

function alertDismissed() {
    // do something
}
function createtable()
{
  
BUYDEMO.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  "login_user(ID INTEGER PRIMARY KEY ASC, emailid VARCHAR(50) , username VARCHAR(50))", []);
                  
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  "registered_user(ID INTEGER PRIMARY KEY ASC, emailid VARCHAR(50),username VARCHAR(50),fname VARCHAR(50),lname VARCHAR(50),phoneno VARCHAR(50),stno VARCHAR(50),stname VARCHAR(50),city VARCHAR(50),state VARCHAR(50),country VARCHAR(50),zipcode VARCHAR(50))", []);
    
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_products(store_id INTEGER PRIMARY KEY ASC, store_name VARCHAR(50),deliveryfee FLOAT(30),zip INTEGER(30)," +
            "store_img VARCHAR(50),category VARCHAR(50),phoneno INTEGER(10)," +
            "description  VARCHAR(50),website_url VARCHAR(50),streetno INTEGER(50),streetname VARCHAR(50)," +
            "city VARCHAR(50),state VARCHAR(50),country VARCHAR(50),miles VARCHAR(50))", []);
		
	tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_products_search(store_id INTEGER PRIMARY KEY ASC, store_name VARCHAR(50),zip INTEGER(30)," +
            "store_img VARCHAR(50),category VARCHAR(50),phoneno INTEGER(10)," +
            "description  VARCHAR(50),website_url VARCHAR(50),streetno INTEGER(50),streetname VARCHAR(50)," +
            "city VARCHAR(50),state VARCHAR(50),country VARCHAR(50),miles VARCHAR(50))", []);
    
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "favourites(ID INTEGER(30) PRIMARY KEY ASC, itemid INTEGER(30),store_id INTEGER(30),customerid INTEGER(30),store_name VARCHAR(50),category VARCHAR(50),description  VARCHAR(50),store_img VARCHAR(50),streetno INTEGER(10),streetname VARCHAR(50),city VARCHAR(40),state VARCHAR(20),website_url VARCHAR(50),phoneno INTEGER(10),country VARCHAR(50),miles VARCHAR(50))", []);

	 tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "customer_items(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, customerid INTEGER(30),storeid INTEGER(30),storename VARCHAR(50),storeimage VARCHAR(50),deliveryfee FLOAT(4))", []);
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                                  "customer_items_details(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, mainid INTEGER(30),itemid INTEGER(30),price FLOAT(50),quantity INTEGER(50),total FLOAT(50),itemname VARCHAR(50),itemimage VARCHAR(50),taxRate FLOAT(4),deliveryfee FLOAT(30),addn_fee FLOAT(30))", []);
    
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_items(ID INTEGER(30) PRIMARY KEY ASC, customerid INTEGER(30),storeid INTEGER(30) ,itemid INTEGER(30))", []);
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "reviews(ID INTEGER(30) PRIMARY KEY ASC, customerid INTEGER(30),storeid INTEGER(30) ,itemid INTEGER(30))", []);
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "customer_ordered_stores(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, customerid INTEGER(30),storeid INTEGER(30),storename varchar(50),storeURL varchar(50))", []);
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "customer_orders(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, mainstoreid INTEGER(30),orderid INTEGER(30),created_date varchar(50),status varchar(50), tax FLOAT(10),sub_total FLOAT(30),total FLOAT(30))", []);
	 tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "customer_orders_items(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, mainorderid INTEGER(30),itemid INTEGER(30),itemName varchar(50),price INTEGER(30),quantity INTEGER(50),imageURL varchar(50),taxRate FLOAT(10))", []);
  tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_deal(store_id INTEGER(30) PRIMARY KEY ASC,storeNumber INTEGER(30),storeName VARCHAR(50),deliveryfee FLOAT(30),storeimg VARCHAR(100),streetNumber INTEGER(10),streetName VARCHAR(50),city VARCHAR(40),state VARCHAR(20),zipCode INTEGER(9),country VARCHAR(30),category VARCHAR(20),description VARCHAR(80),phoneNumber INTEGER(15),website_url VARCHAR(50),miles VARCHAR(50))", []);
 tx.executeSql("CREATE TABLE IF NOT EXISTS " +
         "store_deal_item(itemid INTEGER(30) PRIMARY KEY ASC, storeid INTEGER(30),itemname VARCHAR(30),description VARCHAR(100),price FLOAT(30),category VARCHAR(30),review INTEGER(3),avg_rating INTEGER(3),imageurl VARCHAR(80),quantity INTEGER(6),taxRate INTEGER(4),delv_fee FLOAT(30),adl_fee FLOAT(30))", []);
   tx.executeSql("CREATE TABLE IF NOT EXISTS " +
         "store_deal_item_review(reviewid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, itemid INTEGER(30),reviewComments VARCHAR(80),rating INTEGER(3),user VARCHAR(30),review_id INTEGER(10))", []);    
   tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_deal_coupon(couponid INTEGER(30) PRIMARY KEY ASC, itemid INTEGER(30),couponnumber INTEGER(5),expirationdate VARCHAR(10),offer VARCHAR(150))", []);
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "store_item_images(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, itemid INTEGER(30),storeid INTEGER(30),imageURL VARCHAR(100))", []);
    

    });
}

 function insertid(data,id,username)
 {    
       BUYDEMO.transaction(function(tx) {
       
        tx.executeSql("DELETE  FROM login_user");
      
      tx.executeSql("INSERT INTO login_user(ID, emailid,username) VALUES ('"+id+"','"+data+"','"+username+"')") ;  

      
        
          
                 tx.executeSql("SELECT emailid FROM login_user", [], function (tx, results) {
  var len = results.rows.length, i;
 


       
  });
  });
  }

  
   function insert_reguser(data,id,username,fname,lname,stno,stname,city,state,country,zipcode)
 {    
       BUYDEMO.transaction(function(tx) {
   
    	   tx.executeSql("DELETE  FROM login_user");
    	      
    	      tx.executeSql("INSERT INTO login_user(ID, emailid,username) VALUES ('"+id+"','"+data+"','"+username+"')");  
    	  
      tx.executeSql("INSERT INTO registered_user(ID, emailid,username,fname,lname,stno,stname,city,state,country,zipcode) VALUES ('"+id+"','"+data+"','"+username+"','"+fname+"','"+lname+"','"+stno+"','"+stname+"','"+city+"','"+state+"','"+country+"','"+zipcode+"')") ;  

    
        
         
                 tx.executeSql("SELECT emailid FROM registered_user", [], function (tx, results) {
  var len = results.rows.length;



       
  });
  });
  }
   
 function insert_store(id,name,deliveryfee,zipcode,image,category,phoneno,desc,url,streetno,streetname,city,state,country)
 {
	 
	 BUYDEMO.transaction(function(tx) {
		 
                    
			 
	
                         
                     
                        var name1=name;
                        var image1=image;
                        var description=desc;
                   
                        name1 = name1.replace(/'/g, "''");
                        image1 = image1.replace(/'/g, "''");
                        description=description.replace(/'/g, "''");
                                                        
                    tx.executeSql("INSERT INTO store_products(store_id,store_name,deliveryfee,zip,store_img,category,phoneno,description,website_url,streetno,streetname,city,state,country) VALUES " +
                                                                                                                                         "('"+id+"','"+name1+"','"+deliveryfee+"','"+zipcode+"','"+image1+"','"+category+"','"+phoneno+"','"+description+"','"+url+"','"+streetno+"','"+streetname+"','"+city+"','"+state+"','"+country+"')") ;
                                                                                                                           
                                                                                                                           
                        

	
	  });
  
 }

 function insert_store_search(id,name,zipcode,image,category,phoneno,desc,url,streetno,streetname,city,state,country)
 {
	 
	 BUYDEMO.transaction(function(tx) {
		 
		
                         
        var name1=name;
        var image1=image;
        var description=desc;
                         
        name1 = name1.replace(/'/g, "''");
        image1 = image1.replace(/'/g, "''");
        description=description.replace(/'/g, "''");
                                        
	 tx.executeSql("INSERT INTO store_products_search(store_id,store_name,zip,store_img,category,phoneno,description,website_url,streetno,streetname,city,state,country) VALUES " +
	 		"('"+id+"','"+name1+"','"+zipcode+"','"+image1+"','"+category+"','"+phoneno+"','"+description+"','"+url+"','"+streetno+"','"+streetname+"','"+city+"','"+state+"','"+country+"')") ;
	 
	
	  });
 }
 
 function insert_store_deals(storeID,storeNumber,storeName,deliveryfee,storeimg,streetNumber,streetName,city,state,zipCode,country,category1,desc,phoneNumber,website_url)
 {
        var storenamedeal=storeName;
        var storeimagedeal=storeimg;
        var storedescriptiondeal=desc;
	 BUYDEMO.transaction(function(tx) {
		 
		
                         
            storenamedeal = storenamedeal.replace(/'/g, "''");
            storeimagedeal = storeimagedeal.replace(/'/g, "''");
            storedescriptiondeal=storedescriptiondeal.replace(/'/g, "''");
	 tx.executeSql("INSERT INTO store_deal(store_id,storeNumber,storeName,deliveryfee,storeimg,streetNumber,streetName,city,state,zipCode,country,category,description,phoneNumber,website_url) VALUES " +
			 		"('"+storeID+"','"+storeNumber+"','"+storenamedeal+"','"+deliveryfee+"','"+storeimagedeal+"','"+streetNumber+"','"+streetName+"','"+city+"','"+state+"','"+zipCode+"','"+country+"','"+category1+"','"+storedescriptiondeal+"','"+phoneNumber+"','"+website_url+"')") ;
					
				
	
	  });
 }
 
function insert_store_deal_item_homepage(itemid,storeid,itemname,description,price,category,review,imageurl,quantity,avg_rating,taxRate)
    {
                                                    
                                                    var dealitemname=itemname;
                                                    var dealimageurl=imageurl;
                                                    var dealimagedes=description;
                                                    var dealitemcategory=category;
                                                    
            BUYDEMO.transaction(function(tx) {
                                                                        
                       
                                                                        
                                                dealitemname = dealitemname.replace(/'/g, "''");
                                                dealimageurl = dealimageurl.replace(/'/g, "''");
                                                dealimagedes = dealimagedes.replace(/'/g, "''");
                                                dealitemcategory = dealitemcategory.replace(/'/g, "''");
                                                                                                                                                                                                                                
                                            tx.executeSql("INSERT INTO store_deal_item(itemid,storeid,itemname,description,price,category,review,imageurl,quantity,avg_rating,taxRate) VALUES " +
                                                                                                                                                                                                                                              "('"+itemid+"','"+storeid+"','"+dealitemname+"','"+dealimagedes+"','"+price+"','"+dealitemcategory+"','"+review+"','"+dealimageurl+"','"+quantity+"','"+avg_rating+"','"+taxRate+"')",[],function (tx, results) {
                                                                                                                                                                                                                                              
                                                          
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                              });	
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                });
                                                                                                                                                                                    }

                                                    
                                                    
                                                    
 function insert_store_deal_item(itemid,storeid,itemname,description,price,category,review,imageurl,quantity,avg_rating,taxRate,delv_fee,adnl_fee,count)
 {
    console.log("insert_store_deal_item: adl_fee:"+adnl_fee); 
    var dealitemname=itemname;
    var dealimageurl=imageurl;
    var dealimagedes=description;
    var dealitemcategory=category;                                   
	 BUYDEMO.transaction(function(tx) {
		 
                         
        dealitemname = dealitemname.replace(/'/g, "''");
        dealimageurl = dealimageurl.replace(/'/g, "''");
        dealimagedes = dealimagedes.replace(/'/g, "''");
        dealitemcategory = dealitemcategory.replace(/'/g, "''");
                                            
	 tx.executeSql("INSERT INTO store_deal_item(itemid,storeid,itemname,description,price,category,review,imageurl,quantity,avg_rating,taxRate,delv_fee,adl_fee) VALUES " +
                   "('"+itemid+"','"+storeid+"','"+dealitemname+"','"+dealimagedes+"','"+price+"','"+dealitemcategory+"','"+review+"','"+dealimageurl+"','"+quantity+"','"+avg_rating+"','"+taxRate+"','"+delv_fee+"','"+adnl_fee+"')",[],function (tx, results) {
                  var sizeitem=localStorage.getItem('itemsize');
                 
                   if(count==sizeitem)
                   {
                  // alert('in');
                  tx.executeSql('select * from store_deal where store_id="'+storeid+'"',[], function (tx, results_res) {
                                 var len_res = results_res.rows.length;
                                 
                                // alert(len_res);                            //var resultres = results_res.rows.item(0);
                                 
                                 
                                 //store(results_res.rows.item(0),storeid);
                               // store(results_res.rows.item(0),storeid);
                               // store_details(storeid);
                                 });
                   
                   }
                   
                   
                   
                   });	

	 
	
	  });
 }
 
 function insert_item_images(imgurl,itemid,storeid)
 {
	 
    var itemimgURL=imgurl;
    var storeitemId=itemid;
    var storeidVal=storeid;
                                                    
	 BUYDEMO.transaction(function(tx) {
		 
		
                         
        itemimgURL = itemimgURL.replace(/'/g, "''");
                                            
	tx.executeSql("INSERT INTO store_item_images(itemid,storeid,imageURL) VALUES " +
                   "('"+storeitemId+"','"+storeidVal+"','"+itemimgURL+"')",[],function (tx, results) {
        });	

	 
	
	  });
 }
                                            
  function displaystore(storeid)
  {
                                            //alert('in display store');
            tx.executeSql('select * from store_deal where store_id="'+storeid+'"',[], function (tx, results_res) {
                            var len_res = results_res.rows.length;
                                                          
                          alert(len_res);                            //var resultres = results_res.rows.item(0);
                                                          
                                                          
                                                          //store(results_res.rows.item(0),storeid);
                            store(results_res.rows.item(0),storeid);
                            store_details(storeid);
                        });
                                            
  }
 
 function insert_store_deal_coupon(couponid,itemid,couponnumber,expirationdate,offer)
 {
	 
	 BUYDEMO.transaction(function(tx) {
		 
	 		
		tx.executeSql("INSERT INTO store_deal_coupon(couponid,itemid,couponnumber,expirationdate,offer) VALUES " +
	 		"('"+couponid+"','"+itemid+"','"+couponnumber+"','"+expirationdate+"','"+offer+"')"); 
			
	 
	
	  });
 }
 
 function insert_store_deal_review(reviewid,itemid,reviewComments,rating,user)
  {
	 
	 BUYDEMO.transaction(function(tx) {
		 
		
	 		
		tx.executeSql("INSERT INTO store_deal_item_review(review_id,itemid,reviewComments,rating,user) VALUES " +
	 		"('"+reviewid+"','"+itemid+"','"+reviewComments+"','"+rating+"','"+user+"')"); 
	 
	
	  });
 }

 function del_storedeal()
 {
 	
 	 BUYDEMO.transaction(function(tx) {
		// alert('in storedeal');
 	tx.executeSql('DELETE from store_deal', [], function (tx, results) {
 	   	  var len = results.rows.length, i;
 	   	

 	   	       
 	   	  });	
 	
 });
 	
 }

 function del_store_deal_item()
 {
 	
 	 BUYDEMO.transaction(function(tx) {
		
 	tx.executeSql('DELETE from store_deal_item', [], function (tx, results) {
 	   	  var len = results.rows.length, i;
 	   


 	   	       
 	   	  });	
 	
 });
 	
 }

 function del_store_deal_coupon()
 {
 	
 	 BUYDEMO.transaction(function(tx) {
 	tx.executeSql('DELETE from store_deal_coupon', [], function (tx, results) {
 	   	  var len = results.rows.length, i;
 	   


 	   	       
 	   	  });	
 	
 });
 	
 }
 
  function del_store_deal_review()
 {
 	
 	 BUYDEMO.transaction(function(tx) {
 	tx.executeSql('DELETE from store_deal_item_review', [], function (tx, results) {
 	   	  var len = results.rows.length, i;
 	   	


 	   	       
 	   	  });	
 	
 });
 	
 }
 
 function select_email()
 {
	 
	 BUYDEMO.transaction(function(tx) {
		 
	
         tx.executeSql('SELECT * FROM login_user', [], function (tx, results) {
        	  var len = results.rows.length, i;
        	


        	       
        	  });
	 
	  });
 }
 function check_login(){
		
	 BUYDEMO.transaction(function(tx) {
	 tx.executeSql('SELECT * FROM login_user', [], function (tx, results) {
   	  var len = results.rows.length, i;
   	 


   	       
   	  });
	 
	 });
	}
 
function del_stores()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from store_products', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 


	   	       
	   	  });	
	
});
	
}

function del_stores_search()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from store_products_search', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 


	   	       
	   	  });	
	
});
	
}

function select_fav(id,userid,store_name,category,description,streetno,streetname,city,state,miles,imgurl)

{
	
	 BUYDEMO.transaction(function(tx) {
	
	
	 tx.executeSql("INSERT INTO favourites(store_id,customerid,store_name,category,description,streetno,streetname,city,state,miles,store_img) VALUES ('"+id+"','"+userid+"','"+store_name+"','"+category+"','"+description+"','"+streetno+"','"+streetname+"','"+city+"','"+state+"','"+miles+"','"+imgurl+"')") ;  

	 
	 tx.executeSql('SELECT * FROM favourites', [], function (tx, results) {
	   	  var len = results.rows.length, i;
		

	 });
	 
	 });
}

function unsele_fav(id,userid)
{
	
	 BUYDEMO.transaction(function(tx) {
	 tx.executeSql("DELETE from favourites where store_id='"+id+"' and customerid='"+userid+"'") ;  
	 
	 tx.executeSql('SELECT * FROM favourites', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	  
	 });
	 });
}


function insert_miles(miles,id,cnt,len)
{

	miles = miles.replace(/\s+/g, '');
	 BUYDEMO.transaction(function(tx) {
		 tx.executeSql("UPDATE store_products SET miles='"+miles+"' where store_id='"+id+"'") ;  
		 
		 
		 tx.executeSql('SELECT miles FROM store_products', [], function (tx, results) {
			 var resultres = results.rows.item(0);
			 
		 });
                         cnt=cnt+1;
			
		 });
}
function insert_miles_deal(miles,id,cnt,len)
{
	
	miles = miles.replace(/\s+/g, '');
	 BUYDEMO.transaction(function(tx) {
		 tx.executeSql("UPDATE store_deal SET miles='"+miles+"' where store_id='"+id+"'") ;  
		
		 
		 tx.executeSql('SELECT miles FROM store_deal', [], function (tx, results) {
			 var resultres = results.rows.item(0);
			 
		 });
                         cnt=cnt+1;
			
		 });
}


	
function insert_products(userid,menuid,unitprice,qty,totprice,actual_id,itemname,itemimage,storename,storeimage,taxrate,deliveryfee,addn_fee)
{
	//var lastInsertId;
	 BUYDEMO.transaction(function(tx) {
                         
        var itemname1=itemname;
        var itemimage1=itemimage;
        var storename1=storename;
        var storeimage1=storeimage;
                         
        itemname1=itemname1.replace(/'/g, "''");
        itemimage1=itemimage1.replace(/'/g, "''");
        storename1=storename1.replace(/'/g, "''");
        storeimage1=storeimage1.replace(/'/g, "''");
        
		  
		 tx.executeSql("INSERT INTO customer_items(customerid,storeid,storename,storeimage) VALUES ('"+userid+"','"+menuid+"','"+storename1+"','"+storeimage1+"')",[], function(tx, results)
		 {
			
			
			
			 tx.executeSql("INSERT INTO customer_items_details(mainid,itemid,price,quantity,total,itemname,itemimage,taxRate,deliveryfee,addn_fee) VALUES ('"+results.insertId+"','"+actual_id+"','"+unitprice+"','"+qty+"','"+totprice+"','"+itemname+"','"+itemimage+"','"+taxrate+"','"+deliveryfee+"','"+addn_fee+"')") ;
		 		  
		 
		 change_quantity();
		   
		   tx.executeSql('SELECT * FROM customer_items_details', [], function (tx, results2) {
			   var len1=results2.rows.length;
			  
			   var count;
			   for(var j=0;j<len1;j++)
				{
			 var resultres1 = results2.rows.item(j);
				
				 count=count+resultres1.quantity;
				 localStorage.setItem('totalcount',count);
				
				}
				
				
		 }) ;

		 });
		 
		
		
		 
		   
		
		 
		  
                      
		 });
}

function update_item(store_id,itemid,userid,unit_price,quantity,totalprice)
{
	
	BUYDEMO.transaction(function(tx) {
		
		tx.executeSql('SELECT customer_items_details.ID FROM customer_items inner join customer_items_details on customer_items.ID=customer_items_details.mainid where customer_items.customerid='+userid+' and customer_items.storeid='+store_id+' and customer_items_details.itemid='+itemid+'', [], function (tx, results) 
		 {
			var result = results.rows.item(0); 
                        
		tx.executeSql("UPDATE customer_items_details SET quantity=quantity+1 where mainid='"+result.ID+"'");  
		
		 });
		 
		 change_quantity();
		 var count;
		 tx.executeSql('SELECT * FROM customer_items_details', [], function (tx, results) {
		var len=results.rows.length;
			for(var j=0;j<len;j++)
			{
			 var resultres = results.rows.item(j);
			
			 count=count+resultres.quantity;
			 localStorage.setItem('totalcount',count);
			
			 
			}
			
			 
		 });
	});
}

function update_item_mobiscroll(store_id,itemid,userid,unit_price,quantity,totalprice)
{
	
	BUYDEMO.transaction(function(tx) {
		
		tx.executeSql('SELECT customer_items_details.ID FROM customer_items inner join customer_items_details on customer_items.ID=customer_items_details.mainid where customer_items.customerid='+userid+' and customer_items.storeid='+store_id+' and customer_items_details.itemid='+itemid+'', [], function (tx, results) 
		 {
			var result = results.rows.item(0); 
		
		tx.executeSql("UPDATE customer_items_details SET quantity='"+quantity+"' where mainid='"+result.ID+"'");  
		  
		
		 });
		 
		 change_quantity();
		 change_totals(itemid);
		 var count;
		 tx.executeSql('SELECT * FROM customer_items_details', [], function (tx, results) {
		var len=results.rows.length;
			for(var j=0;j<len;j++)
			{
			 var resultres = results.rows.item(j);
			
			 count=count+resultres.quantity;
			 localStorage.setItem('totalcount',count);
			
			 
			}
			
			 
		 });
	});
}

function load_data()
{
	
	var flag =0;
	BUYDEMO.transaction(function(tx) {
		
		
		 
		 tx.executeSql('SELECT miles FROM store_products', [], function (tx, results) {
			  var len = results.rows.length, i;
			   	if(len!=0)
			   		{
			   		$('#loadTry').popup("open");
					$("#loadTry").popup({dismissible:false});
			   	  select_products();
			   	  flag=0;
			   		}
			   	else
			   		{
			   		
			   		flag=1;
			   		sen_zip();
			   		}
		 });
                  
		 });


}

function del_items()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from store_items', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 
                  


	   	       
	   	  });	
	
});
	
}

 function insert_cust_store(id,storeid,customerid,storename,storeURL)
 {
	 
	 BUYDEMO.transaction(function(tx) {
                         
                         var storename1=storename;
                         var storeURL1=storeURL;
                         storename1=storename1.replace(/'/g, "''");
                         storeURL1=storeURL1.replace(/'/g, "''");
		
		
	 		
		tx.executeSql("INSERT INTO customer_ordered_stores(customerid,storeid,storename,storeURL) VALUES " +
	 		"('"+customerid+"','"+storeid+"','"+storename1+"','"+storeURL1+"')");

	
	  });
 }
 
 function insert_cust_order(mainstoreid,orderid,tax,sub_total,total,created_date,status)
 {
	 BUYDEMO.transaction(function(tx) 
	 {
			
		 	tx.executeSql("INSERT INTO customer_orders(mainstoreid,orderid,tax,sub_total,total,created_date,status) VALUES " +
	 		"('"+mainstoreid+"','"+orderid+"','"+tax+"','"+sub_total+"','"+total+"','"+created_date+"','"+status+"')"); 

	 });
	 
	 
					
 }
 
 function insert_cust_item(orderid,itemID,itemName,itemDescription,imageURL,price,qty,taxrate,counter)
 {
	
	 BUYDEMO.transaction(function(tx)
	 {
                         
            var itemName1=itemName;
            var itemDescription1=itemDescription;
            var imageURL1=imageURL;
            itemName1=itemName1.replace(/'/g, "''");
            itemDescription1=itemDescription1.replace(/'/g, "''");
            imageURL1=imageURL1.replace(/'/g, "''");
                                        
			
		 	tx.executeSql("INSERT INTO customer_orders_items(mainorderid,itemid,itemName,imageURL,price,quantity,taxRate) VALUES " +
	 		"('"+orderid+"','"+itemID+"','"+itemName1+"','"+imageURL1+"','"+price+"','"+qty+"','"+taxrate+"')");
                         var sizeitem=localStorage.getItem('itemsize1');
                         
                         if(counter==sizeitem)
                         {
                                        get_recent_orderhistory();
                         }

	 });
	 
	 
					
 }
 
 function del_cust_store()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from customer_ordered_stores', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 
                  


	   	       
	   	  });	
	
});
	
}

 function del_cust_order()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from customer_orders', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 
                  


	   	       
	   	  });	
	
});
	
}

 function del_cust_item()
{
	
	 BUYDEMO.transaction(function(tx) {
	tx.executeSql('DELETE from customer_orders_items', [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 
                  


	   	       
	   	  });	
	
});
	
}

function delete_shopped_items_details(store_id)
{

 BUYDEMO.transaction(function(tx) {
	tx.executeSql("DELETE from customer_items_details where mainid='"+store_id +"'", [], function (tx, results) {
	   	  var len = results.rows.length, i;
	   	 
                  


	   	       
	   	  });	
	
	


	   	  
});
}


function delete_shopped_items(store_id)
{
    
    BUYDEMO.transaction(function(tx)
                        {
                        tx.executeSql("DELETE from customer_items where storeid='"+store_id +"'", [], function (tx, results) {
                                      var len = results.rows.length, i;
                                     
                                      
                                      
                                      
                                      });
                        tx.executeSql("DELETE from customer_items_details where mainid='"+store_id +"'", [], function (tx, results) {
                                      var len = results.rows.length, i;
                                     
                                      
                                      location.href="order.html";
                                      
                                      
                                      });
                       
                        
                        
        });

}
