import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const CustomButton = (props): React.ReactElement => {
  return props.type === 'primary' ? (
    // Light Button
    <Button
      appearance="ghost"
      style={[styles.button, styles.lightButton, props.style]}
      onPress={props.onPress}>
      {() => <Text style={styles.lightButtonText}>{props.children}</Text>}
    </Button>
  ) : (
    // Default Button...
    <Button
      style={[
        styles.button,
        props.isDisabled ? styles.defaultButtonDisabled : styles.defaultButton,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={!props.isDisabled}>
      {() => <Text style={styles.defaultButtonText}>{props.children}</Text>}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
  },
  lightButton: {
    backgroundColor: globalColors.white,
    paddingVertical: 13,
  },
  lightButtonText: {
    color: globalColors.greenSecondary,
    fontFamily: globalVars.fontBold,
    fontSize: 17,
  },
  defaultButton: {
    backgroundColor: globalColors.lightGray,
    borderWidth: 0,
  },
  defaultButtonText: {
    color: globalColors.white,
    fontFamily: globalVars.fontBold,
    fontSize: 17,
  },
  defaultButtonDisabled: {
    backgroundColor: globalColors.greenSecondary,
  },
});

export default CustomButton;
