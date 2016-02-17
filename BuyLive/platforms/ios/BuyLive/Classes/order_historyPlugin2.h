//
//  HelloPlugin.h
//  BuyLive
//
//  Created by Rahul on 1/25/14.
//
//
#import <Cordova/CDV.h>
#import <AWSS3/AWSS3.h>

@interface order_historyPlugin2 : CDVPlugin
{
    
    CDVPluginResult *result;
    S3GetObjectResponse *response;
//    NSString *imagePath;
 //   NSMutableDictionary *data;
}

- (void) getImageFromS3:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
