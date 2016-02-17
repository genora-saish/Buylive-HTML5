//
//  HelloPlugin.m
//  BuyLive
//
//  Created by Rahul on 1/25/14.
//
//

#import "order_historyPlugin2.h"
#import "HomePage.h"
#import <AWSS3/AWSS3.h>
#import "Constants.h"
#import "AmazonKeyChainWrapper.h"
#import "Response.h"
#import "AmazonClientManager.h"

@implementation order_historyPlugin2

- (void) getImageFromS3:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    //get the callback id
    NSString *callbackId = [arguments pop];
      NSLog(@"callbackId %@",callbackId);
    NSLog(@"Hello, this is a native function called from PhoneGap/Cordova!");
    
    NSString *resultType = arguments[0][0];
    NSString *resultimg = arguments[0][1];
    //NSString *resultid = @"1";
   NSString *resultid = arguments[0][2];
    //CDVPluginResult *result;
   // imagePath=@"";
     NSLog(@"result %@",resultType);
    
    //dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
       
    @try{
        NSString *rid=resultid;
        NSString *rname=resultimg;
        NSString *imagePath=@"";
        NSData *imgData;
        
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
        NSString *imgPathRetrieve = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",rname]];
        NSLog(@"imgPath_retrieve = %@",imgPathRetrieve);
        NSData *pngData = [NSData dataWithContentsOfFile:imgPathRetrieve];
        UIImage *image2 = [UIImage imageWithData:pngData];
       // if (!image2) {
        NSLog(@"\n rid %@ rname %@",rid,rname);
        S3GetObjectRequest *getObjectRequest = [[S3GetObjectRequest alloc] initWithKey:resultType withBucket:@"buylive"];
        
        response = [[AmazonClientManager s3] getObject:getObjectRequest];
        NSLog(@"aws response:image function ");
       // NSLog(@"responce %@",response);
      //  NSLog(@"responce erro r %@",response.error);
       // NSLog(@"responce body %@",response.body);
        if (response.error == nil)
        {
            if (response.body != nil)
            {
                UIImage *image = [UIImage imageWithData:response.body];
                // NSString *label= response.;
                // NSLog(@"LABEL=%@",label);
                //ImageView.image=image;
                imgData = UIImageJPEGRepresentation(image, 1.0);
                NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
                imagePath = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",rname]] ;
                
                NSLog(@"saved imaged path: %@",imagePath);
                
                //Writing  the image file
                [imgData writeToFile:imagePath atomically:YES];
              
                NSLog(@"IMAGE IS WRITTEN TO THE DOCUMENTS DIRECTORY");
               // result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"Success :)"];
               // [self writeJavascript:[result toSuccessCallbackString:callbackId]];
                dispatch_sync(dispatch_get_main_queue(), ^(void){
                    NSLog(@"\n rid %@ rname %@",rid,rname);
                    NSLog(@"returning path: %@",imagePath);
                    if (imgData!=nil&&![imagePath isEqualToString:@""])
                    {
                        
                        
                        NSString *returnString = [NSString stringWithFormat:@"%@,%@",rid,imagePath];
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: returnString];
                        [self writeJavascript:[result toSuccessCallbackString:callbackId]];
                    }
                });

               
            }
            else{
                NSLog(@"There was no value in the response body");
                //result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @"Image could not be downloaded"];
               // [self writeJavascript:[result toErrorCallbackString:callbackId]];
                //return nil;
            }
        }
        else if (response.error != nil)
        {
            NSLog(@"There was an error in the response while getting image: %@",response.error.description);
            //result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @"Image could not be downloaded"];
           // [self writeJavascript:[result toErrorCallbackString:callbackId]];
        }
    //}
    }
    @catch (NSException *exception) {
        NSLog(@"There was an exception when connecting to s3: %@",exception.description);
       // result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @"Image could not be downloaded"];
        //[self writeJavascript:[result toErrorCallbackString:callbackId]];
    }
           });
    
    
}

@end