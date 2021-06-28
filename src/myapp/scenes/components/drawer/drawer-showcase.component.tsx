import React from 'react';
import {Button, ButtonElement, ButtonProps, Icon} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';

export const DrawerShowcase = (props?: ButtonProps): ButtonElement => {
  const DrawerIcon = () => (
    <Image
      style={styles.icon}
      source={require('../../../assets/images/drawer-icon.png')}
    />
  );

  return (
    <Button
      {...props}
      style={styles.button}
      accessoryLeft={DrawerIcon}
      appearance="ghost"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  button: {
    width: 40,
    height: 40,
    margin: 2,
    color: 'white',
  },
});
