//
//  WebView.h
//  BuyzengaVendor
//
//  Created by Milind Prabhu on 10/3/13.
//  Copyright (c) 2013 Milind Prabhu. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MBProgressHUD.h"

@interface WebView : UIViewController<UIWebViewDelegate,MBProgressHUDDelegate>{
   IBOutlet UIWebView *webView;
   MBProgressHUD *HUD;
}
-(IBAction)Back:(id)sender;

@end
