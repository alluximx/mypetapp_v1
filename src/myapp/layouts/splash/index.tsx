import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
// Global styles
import globalColors from '../../styles/colors';

const SplashScreen = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/splash-screen.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default SplashScreen;
