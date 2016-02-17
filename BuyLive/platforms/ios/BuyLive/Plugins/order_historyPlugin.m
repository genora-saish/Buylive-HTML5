//
//  HelloPlugin.m
//  BuyLive
//
//  Created by Rahul on 1/25/14.
//
//

#import "order_historyPlugin.h"
//#import "HomePage.h"
#import <AWSS3/AWSS3.h>
#import "Constants.h"
#import "AmazonKeyChainWrapper.h"
#import "Response.h"
#import "AmazonClientManager.h"

@implementation order_historyPlugin
/*
- (void) getImageFromS3:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    
    NSString *callbackId = [arguments pop];
    
    NSMutableArray *imagePathArray=[[NSMutableArray alloc]init];
   
    
    
          imagePathArray=[arguments objectAtIndex:0];
 
    
    for(int i=0;i<[imagePathArray count];i++){
        
        NSString *imageObj=[imagePathArray objectAtIndex:i];
        
      
        NSArray* foo = [imageObj componentsSeparatedByString:@"/"];
        NSString *image_name=[foo objectAtIndex: [foo count]-1];
        
      
        @try{
           
            NSString *imagePath=@"";
            NSData *imgData;
            
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
            NSString *imgPathRetrieve = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",image_name]];
           
            NSData *pngData = [NSData dataWithContentsOfFile:imgPathRetrieve];
            UIImage *image = [UIImage imageWithData:pngData];
            
          
            S3GetObjectRequest *getObjectRequest = [[S3GetObjectRequest alloc] initWithKey:imageObj withBucket:@"buylive"];
            
            response = [[AmazonClientManager s3] getObject:getObjectRequest];
          
            
            if (response.error == nil)
            {
                if (response.body != nil)
                {
                    UIImage *image = [UIImage imageWithData:response.body];
                    
                    imgData = UIImageJPEGRepresentation(image, 1.0);
                    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
                    imagePath = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",image_name]] ;
                    
                   
                    
                   
                    [imgData writeToFile:imagePath atomically:YES];
                    
                  
                  
                    
                    
               }
                else{
                  
                }
            }
            else if (response.error != nil)
            {
               
                
            }
            
        }
        
        @catch (NSException *exception) {
            
        }

       
       
    }
   
    NSString *returnString = [NSString stringWithFormat:@"%@,%@",@"1",@"abc"];
   result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: returnString];
    [self.commandDelegate:[result toSuccessCallbackString:callbackId]];
    
}*/


- (void) getImageFromS3:(CDVInvokedUrlCommand *)command {
    NSLog(@"this is native getImageS3");
    
    // NSString *callbackId = [command pop];
    CDVPluginResult* pluginResult = nil;
    
    NSMutableArray *imagePathArray=[[NSMutableArray alloc]init];
    
    
    
    imagePathArray=[command.arguments objectAtIndex:0];
    
    
    for(int i=0;i<[imagePathArray count];i++){
        
        NSString *imageObj=[imagePathArray objectAtIndex:i];
        NSLog(@"this is native for loop imageObj: %@",imageObj);
        
        NSArray* foo = [imageObj componentsSeparatedByString:@"/"];
        NSString *image_name=[foo objectAtIndex: [foo count]-1];
        NSLog(@"this is native for loop image_name: %@",image_name);
        
        @try{
            
            NSString *imagePath=@"";
            NSData *imgData;
            
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
            NSString *imgPathRetrieve = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",image_name]];
            
            NSData *pngData = [NSData dataWithContentsOfFile:imgPathRetrieve];
            UIImage *image = [UIImage imageWithData:pngData];
            
            
            S3GetObjectRequest *getObjectRequest = [[S3GetObjectRequest alloc] initWithKey:imageObj withBucket:@"buylive"];
            [AmazonLogger verboseLogging];
            
            response  = [[AmazonClientManager s3] getObject:getObjectRequest];
            
            
            if (response.error == nil)
            {
                if (response.body != nil)
                {
                    UIImage *image = [UIImage imageWithData:response.body];
                    
                    imgData = UIImageJPEGRepresentation(image, 1.0);
                    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
                    imagePath = [[paths objectAtIndex:0]stringByAppendingString:[NSString stringWithFormat:@"/%@",image_name]] ;
                    
                    
                    
                    
                    [imgData writeToFile:imagePath atomically:YES];
                    
                    
                    
                    
                    
                }
                else{
                   NSLog(@"this is native response.body: %@",response.body);
                }
            }
            else if (response.error != nil)
            {
                NSLog(@"this is native response.error: %@",response.error);
                
            }
            
        }
        
        @catch (NSException *exception) {
            NSLog(@"%@ %@", exception.name, exception.reason);
        }
        
        
        
    }
    
    NSString *returnString = [NSString stringWithFormat:@"%@,%@",@"1",@"abc"];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: returnString];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

@end