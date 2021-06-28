import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';

const CloseButton = (props): React.ReactElement => {
  return (
    <Icon
      height={35}
      width={35}
      style={[styles.closeButton, props.style]}
      onPress={props.navigation.goBack}
      fill={globalColors.greenSecondary}
      name="close-outline"
    />
  );
};

const styles = StyleSheet.create({
  closeButton: {
    marginVertical: 10,
  },
});

export default CloseButton;
