import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';

const BackButton = (props): React.ReactElement => {
  return (
    <Icon
      style={[styles.backButton, props.style]}
      height={35}
      onPress={props.navigation.goBack}
      width={35}
      fill={props.isWhite ? globalColors.white : globalColors.greenSecondary}
      name="arrow-back-outline"
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginVertical: 10,
  },
});

export default BackButton;
