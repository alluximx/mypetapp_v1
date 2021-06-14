import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const AnchorText = (props): React.ReactElement => {
  return (
    <Text style={[styles.anchorText, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  anchorText: {
    color: globalColors.greenSecondary,
    fontSize: 16,
    fontFamily: globalVars.fontBold,
  },
});

export default AnchorText;
