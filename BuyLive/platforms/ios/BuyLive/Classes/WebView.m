//
//  WebView.m
//  BuyzengaVendor
//
//  Created by Milind Prabhu on 10/3/13.
//  Copyright (c) 2013 Milind Prabhu. All rights reserved.
//

#import "WebView.h"


@interface WebView ()

@end

@implementation WebView

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    HUD = [[MBProgressHUD showHUDAddedTo:self.view animated:YES] retain];
    HUD.delegate = self;
    HUD.dimBackground = YES;
    HUD.labelText = @"Please Wait";
    [webView setDelegate:self];
    NSString *webUrl=[NSString stringWithFormat:@"http://mycredit.dnb.com/search-for-duns-number/"];
    NSLog(@"loading webview with url:%@",webUrl);
    NSURL *url = [NSURL URLWithString:webUrl];
    NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
    webView.scalesPageToFit = YES;
    [webView loadRequest:requestObj];
    
      
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(IBAction)Back:(id)sender
{
    //Profile *profile=[[Profile alloc]init];
    //[self presentViewController:profile animated:YES completion:nil];
    [self dismissViewControllerAnimated:YES completion:nil];
    
}
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [HUD hide:YES];
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    [HUD hide:YES];
    UIAlertView * alert = [[UIAlertView alloc] initWithTitle:@"Message"
                                                     message:@"Network Issue.Please Try Again."
                                                    delegate:self
                                           cancelButtonTitle:@"OK"
                                           otherButtonTitles:nil, nil];
    [alert setTag:1];
    [alert show];
    [alert release];
   
}
-(void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    if (alertView.tag==1) {
        if (buttonIndex == 0) {
            //Profile *profile=[[Profile alloc]init];
            //[self presentViewController:profile animated:YES completion:nil];
            [self dismissViewControllerAnimated:YES completion:nil];
        }
    }
}


@end
