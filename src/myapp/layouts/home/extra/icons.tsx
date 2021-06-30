import React from 'react';
import {ImageStyle, StyleSheet} from 'react-native';
import {Icon, IconElement, useTheme} from '@ui-kitten/components';
import globalColors from '../../../styles/colors';

export const AddIcon = (style: ImageStyle): IconElement => (
  <Icon style={styles.addIcon} name="plus-outline" />
);

export const PersonAddIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person-add" />
);

export const PinIcon = (): IconElement => {
  const theme = useTheme();
  return (
    <Icon width={16} height={16} fill={theme['text-hint-color']} name="pin" />
  );
};

const styles = StyleSheet.create({
  addIcon: {
    height: 25,
    width: 25,
    tintColor: globalColors.white,
  },
});
