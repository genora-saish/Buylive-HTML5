//
//  HomePage.h
//  BuyZengaAPP
//
//  Created by Blackhole on 6/3/13.
//  Copyright (c) 2013 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AWSS3/AWSS3.h>

@interface HomePage : UIViewController<AmazonServiceRequestDelegate,NSXMLParserDelegate>
{
     IBOutlet UIView *view1;
     IBOutlet UIImageView *ImageView;
     NSString *imgPath;
     NSData *imgData;
    
     NSURLConnection *vendorConn,*storeConn,*prodConn;
     NSMutableData *vendorData,*storeData,*prodData;
    
     NSMutableString *nodecontent,*element;
     NSXMLParser *parser;
    
    IBOutlet UILabel *storeName, *storeAddress;
    
    NSString *getItem,*imgPath_retrieve, *store_image_url;
    BOOL found_item,found_store;
}

@property (nonatomic,retain) NSString *responseId;

-(IBAction)goAccount:(id)sender;

-(IBAction)goInventory:(id)sender;

-(IBAction)goOrders:(id)sender;

-(IBAction)goProfile:(id)sender;

-(IBAction)goStore:(id)sender;

-(IBAction)goOrderHistory:(id)sender;
-(IBAction)logOut:(id)sender;

-(IBAction)goHelp:(id)sender;


@end
