import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
// Global styles
import globalColors from '../../styles/colors';

const SplashScreen = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./assets/logo-splash.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
});

export default SplashScreen;
