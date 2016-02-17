//
//  HomePage.m
//  BuyZengaAPP
//
//  Created by Blackhole on 6/3/13.
//  Copyright (c) 2013 __MyCompanyName__. All rights reserved.
//

#import "HomePage.h"
#import "Accounts.h"
#import "Inventory.h"
#import "Profile.h"
#import "Orders.h"
#import "EditStore.h"
#import "CompletedOrders.h"
#import "Help.h"
#import <QuartzCore/QuartzCore.h>
#import <AWSS3/AWSS3.h>
#import "Constants.h"
#import "AmazonKeyChainWrapper.h"
#import "Response.h"
#import "AmazonClientManager.h"
#include "TBXML.h"
#import "DBManager.h"



@implementation HomePage
@synthesize responseId;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}
-(IBAction)logOut:(id)sender
{
    Accounts *accounts =[[Accounts alloc ]init];
   [self presentViewController:accounts animated:YES completion:nil];
}
#pragma mark - View lifecycle

- (void)viewDidLoad
{
    DBManager *dbObject;   //Get Profile Data From DBMANAGER
    dbObject= [[DBManager alloc] init];
    NSArray *StoreData = [[NSMutableArray alloc]init];
    StoreData=[dbObject getStoreData:0];
   
    if([StoreData count]>0){
        NSString *storename=[StoreData objectAtIndex:2];
        storeName.text=storename;
        storeAddress.text=[NSString stringWithFormat:@"%@  %@ %@ %@ - %@",StoreData[7],StoreData[8],StoreData[9],StoreData[10],StoreData[11]];
        
    }
    
    NSArray* image_name = [StoreData[3] componentsSeparatedByString: @"/"];
    NSLog(@"image name : %@", image_name[[image_name count]-1]);
    store_image_url= image_name[[image_name count]-1];
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    imgPath_retrieve = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",store_image_url]];
    NSLog(@"IMAGE IS WRITTEN TO THE DOCUMENTS DIRECTORY %@",imgPath_retrieve);
    // CODE TO RETRIEVE IMAGE FROM THE DOCUMENT DIRECTORY
    NSData *pngData = [NSData dataWithContentsOfFile:imgPath_retrieve];
    UIImage *image1 = [UIImage imageWithData:pngData];
    ImageView.image=image1;
    
    if(ImageView.image == nil){
        ImageView.image = [UIImage imageNamed:@"upload.png"];
    }
    [ImageView.layer setCornerRadius: 10.0];
    [ImageView.layer setBorderColor: [[UIColor lightGrayColor] CGColor]];
    [ImageView.layer setBorderWidth: 2.5];
    [ImageView.layer setShadowColor:[UIColor grayColor].CGColor];
    [ImageView.layer setShadowOffset:CGSizeMake(0, 0)];
    [ImageView.layer setShadowOpacity:0.7];
    [ImageView.layer setShadowRadius:2.5];
    ImageView.layer.masksToBounds = YES;
    
    [view1.layer setCornerRadius:10.0f];
    [view1.layer setBorderColor:[UIColor lightGrayColor].CGColor];
    [view1.layer setShadowColor:[UIColor grayColor].CGColor];
    [view1.layer setShadowOffset:CGSizeMake(0, 0)];
    [view1.layer setShadowOpacity:0.7];
    [view1.layer setShadowRadius:2.5];
    view1.layer.borderWidth = 2.0f;
    view1.layer.borderWidth = 2.0f;
    
    [self.view addSubview:view1];
   
    [super viewDidLoad];
    
}



- (void)viewDidUnload
{
    

    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	return YES;
}

-(IBAction)goAccount:(id)sender
{
    Accounts *account=[[Accounts alloc]init];
    [self presentViewController:account animated:YES completion:nil];
}

-(IBAction)goInventory:(id)sender
{
    Inventory *inventory =[[Inventory alloc ]init];
    [self presentViewController:inventory animated:YES completion:nil];
}

-(IBAction)goOrders:(id)sender
{
    Orders *orders =[[Orders alloc ]init];
    [self presentViewController:orders animated:YES completion:nil];
}

-(IBAction)goProfile:(id)sender
{
    Profile *profile =[[Profile alloc ]init];
    [self presentViewController:profile animated:YES completion:nil];
}
-(IBAction)goStore:(id)sender
{
    EditStore *store =[[EditStore alloc ]init];
    [self presentViewController:store animated:YES completion:nil];
}
-(IBAction)goOrderHistory:(id)sender
{
    CompletedOrders *c_orders =[[CompletedOrders alloc ]init];
    [self presentViewController:c_orders animated:YES completion:nil];
}

-(IBAction)goHelp:(id)sender
{
    Help *hlp =[[Help alloc ]init];
    [self presentViewController:hlp animated:YES completion:nil];
    
    
}

@end
