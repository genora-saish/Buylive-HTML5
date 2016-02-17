//
//  MyWebView.m
//  UIWebView-Call-ObjC
//
//  Created by NativeBridge on 02/09/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "MyWebView.h"

#import "HomePage.h"




#import <AWSS3/AWSS3.h>
#import "Constants.h"
#import "AmazonKeyChainWrapper.h"
#import "Response.h"
#import "AmazonClientManager.h"








@implementation MyWebView

- (id)init
{
   

   self = [super init];
    // Set delegate in order to "shouldStartLoadWithRequest" to be called
    self.delegate = self;
    // Set non-opaque in order to make "body{background-color:transparent}" working!
    self.opaque = NO;
    
    // Instanciate JSON parser library
    json = [ SBJSON new ];
    
    // load our html file
   NSString *path = [[NSBundle mainBundle] pathForResource:@"try" ofType:@"html"inDirectory:@"www/ios"];
   [self loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
     
      
 
    
    
  return self;
}


// This selector is called when something is loaded in our webview
// By something I don't mean anything but just "some" :
//  - main html document
//  - sub iframes document
//
// But all images, xmlhttprequest, css, ... files/requests doesn't generate such events :/
- (BOOL)webView:(UIWebView *)webView2 
	      shouldStartLoadWithRequest:(NSURLRequest *)request 
	      navigationType:(UIWebViewNavigationType)navigationType {
  NSLog(@"setBackgroundColor wait exactly 3 arguments!");
	NSString *requestString = [[request URL] absoluteString];
  

  
  if ([requestString hasPrefix:@"js-frame:"]) {
    

   
   // [self handleCall:function callbackId:callbackId args:args];
     [self getImageFromS3:@"images/r/qwe.jpg" :@"qwe.jpg"];
    return NO;
  }
  
    return YES;
}

// Call this function when you have results to send back to javascript callbacks
// callbackId : int comes from handleCall function
// args: list of objects to send to the javascript callback
- (void)returnResult:(NSString*)imagePath

{
    UIWebView * webView2 ;
 
     NSLog(@"image path '%@'",imagePath);

    NSString * jsCallBack = [NSString stringWithFormat:@"NativeBridge.resultForCallback('%@')",imagePath];
    [webView2 stringByEvaluatingJavaScriptFromString:jsCallBack];
  
  // We need to perform selector with afterDelay 0 in order to avoid weird recursion stop
  // when calling NativeBridge in a recursion more then 200 times :s (fails ont 201th calls!!!)
// [self performSelector:@selector(returnResultAfterDelay:) withObject:[NSString stringWithFormat:@"NativeBridge.resultForCallback(%s,%@);",imagePath]];
}

-(void)returnResultAfterDelay:(NSString*)str {
  // Now perform this selector with waitUntilDone:NO in order to get a huge speed boost! (about 3x faster on simulator!!!)
  [self performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:str waitUntilDone:NO];
}

// Implements all you native function in this one, by matching 'functionName' and parsing 'args'
// Use 'callbackId' with 'returnResult' selector when you get some results to send back to javascript
- (void)handleCall:(NSString*)functionName callbackId:(int)callbackId args:(NSArray*)args
{
  if ([functionName isEqualToString:@"setBackgroundColor"]) {
    
    if ([args count]!=3) {
      NSLog(@"setBackgroundColor wait exactly 3 arguments!");
      return;
    }
    NSNumber *red = (NSNumber*)[args objectAtIndex:0];
    NSNumber *green = (NSNumber*)[args objectAtIndex:1];
    NSNumber *blue = (NSNumber*)[args objectAtIndex:2];
    NSLog(@"setBackgroundColor(%@,%@,%@)",red,green,blue);
    self.backgroundColor = [UIColor colorWithRed:[red floatValue] green:[green floatValue] blue:[blue floatValue] alpha:1.0];
    [self returnResult:callbackId args:nil];
    
  } else if ([functionName isEqualToString:@"prompt"]) {
    
    if ([args count]!=1) {
      NSLog(@"prompt wait exactly one argument!");
      return;
    }
        
    NSString *message = (NSString*)[args objectAtIndex:0];
    
    alertCallbackId = callbackId;
    UIAlertView *alert=[[UIAlertView alloc] initWithTitle:nil message:message delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Ok", nil] ;
    [alert show];
    
  } else {
    NSLog(@"Unimplemented method '%@'",functionName);
  }
}

// Just one example with AlertView that show how to return asynchronous results
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
  if (!alertCallbackId) return;
  
  NSLog(@"prompt result : %d",buttonIndex);
  
  BOOL result = buttonIndex==1?YES:NO;
  [self returnResult:alertCallbackId args:[NSNumber numberWithBool:result],nil];
  
  alertCallbackId = nil;
}
-(void)getImageFromS3:(NSString*)imageUrl :(NSString*)imageName
    {
       
        
        @try{
            
            S3GetObjectRequest *getObjectRequest = [[S3GetObjectRequest alloc] initWithKey:imageUrl withBucket:@"buylive"];
           
            S3GetObjectResponse *response = [[AmazonClientManager s3] getObject:getObjectRequest];
            NSLog(@"aws response:image function ");
            if (response.error == nil)
            {
                if (response.body != nil)
                {
                    UIImage *image = [UIImage imageWithData:response.body];
                    // NSString *label= response.;
                    // NSLog(@"LABEL=%@",label);
                    //ImageView.image=image;
                    NSData *imgData = UIImageJPEGRepresentation(image, 1.0);
                    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
                    NSString *imagePath = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",imageName]];
                    
                    NSLog(@"saved imaged path: %@",imagePath);
                    
                    //Writing  the image file
                    [imgData writeToFile:imagePath atomically:YES];
                    [self returnResult:imagePath];
                    NSLog(@"IMAGE IS WRITTEN TO THE DOCUMENTS DIRECTORY");            }
                else{
                    NSLog(@"There was no value in the response body");
                    //return nil;
                }
            }
            else if (response.error != nil)
            {
                NSLog(@"There was an error in the response while getting image: %@",response.error.description);
            }
        }
        
        @catch (NSException *exception) {
            NSLog(@"There was an exception when connecting to s3: %@",exception.description);
        }
         
        
    }
@end
