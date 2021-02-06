# mypetapp_v1

# React Native scaffold

After cloning this repo, you will need to install the dependencies:

`cd mypetapp_v1`

`npm install`

Then, you need to install the Podfile:

`cd ios`

`pod install`

Now set the correct environment for CI:

`npm run env dev`

# Running with React Native CLI

### Running android simulator

1. Activate android emulator following this [instructions](https://facebook.github.io/react-native/docs/running-on-device)
2. `react-native run-android` from project home folder

### Running iOS simulator

1. Go to `ios` folder and run `pod install` (if you don't have pod installed, follow this [instructions](https://guides.cocoapods.org/using/getting-started.html) )
2. Run `react-native run-ios` from project home folder.

If you find any compiling problems, try to clean your cache. From the home app folder run:

`cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../`

and

`cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../`