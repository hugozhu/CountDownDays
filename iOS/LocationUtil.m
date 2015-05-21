//
//  LocationUtil.m
//  CountDownDays
//
//  Created by Hugo Zhu on 5/18/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "LocationUtil.h"
#import <CoreLocation/CoreLocation.h>

@implementation LocationUtil


- (void)test:(NSInteger) x
{
  CLGeocoder *geocoder = [[CLGeocoder alloc] init];
  double lati = 45.46433;
  double longi = 9.18839;
  
  CLLocation *location = [[CLLocation alloc] initWithCoordinate:CLLocationCoordinate2DMake(lati, longi)
                                                       altitude:0
                                             horizontalAccuracy:0
                                               verticalAccuracy:0
                                                      timestamp:[NSDate date]];
  
  [geocoder reverseGeocodeLocation:location completionHandler:
   ^(NSArray *placemarks, NSError *error)
   {
     CLPlacemark *placemark = [placemarks lastObject];
     if (error || !placemark)
       return;
     
     NSString *city = placemark.locality;
     if (!city)
       city = placemark.subAdministrativeArea;
     
     NSLog(@"City for location: %@", city);
   }];
  
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(helloworld:(NSString *)greeting
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  NSLog(@"%@ %@", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
  
  successCallback(@[@"Write method called"]);
}


@end
