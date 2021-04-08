// Sample React Native App
// https://github.com/facebook/react-native
// @format
// @flow strict-local

import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Linking} from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: null,
});
const App = () => {
  // [viewLocation, isViewLocation] = useState([]);

  // const [tweet, setTweet] = useState([
  //   viewLocation.longitude,
  //   viewLocation.latitude,
  // ]);

  // const tweetLocation = () => {
  //   let twitterParams = [];

  //   try {
  //     if (tweet) twitterParams.push({tweet});
  //     const url = 'https://twitter.com/intent/tweet?' + twitterParams.join('&');
  //     Linking.openURL(url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const permissionHandle = async () => {
    console.log('here');

    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
      },
    });

    console.log('here2');
    console.log(permission);
    let location;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
    } else {
      console.log('Here 7');
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
      // isViewLocation(location);
      // setTweet([viewLocation.longitude, viewLocation.latitude]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={permissionHandle} />
      </View>
      <Text>Latitude: </Text>
      <Text>Longitude: </Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
