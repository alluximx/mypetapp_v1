import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';

const BackButton = (props): React.ReactElement => {
  return (
    <View style={[styles.backButton, props.style]}>
      <Icon
        height={35}
        onPress={props.navigation.goBack}
        width={35}
        fill={props.isWhite ? globalColors.white : globalColors.greenSecondary}
        name="arrow-back-outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginVertical: 10,
  },
});

export default BackButton;
