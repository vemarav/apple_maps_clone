# apple maps ui clone

implemented pick location, travel time, travel distance, modifying checkpoints by drag gesture

## demo

android

https://user-images.githubusercontent.com/17309962/198101829-095f2b85-b60a-45a7-a0c9-9ed31818482b.mp4

ios

https://user-images.githubusercontent.com/17309962/198108937-616c14f9-79a4-4ab7-9c37-5a509eea08d7.mp4

tweaks to make it work
-

Get an API_KEY from https://console.cloud.google.com/google/maps-apis/credentials and follow instructions

In `ios/AppDelegate.m` replace api key

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"< GOOGLE_MAPS_API_KEY >"];
```

In `android/app/src/main/AndroidManifest.xml` replace api key

```
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="< GOOGLE_MAPS_API_KEY >"/>
```

Now, rename .env.sample.js to .env.js and replace api key.

make sure cocoapods installed then run `yarn install` and `yarn ios` or `yarn android`
