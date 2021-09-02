import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {AnchorTextProps} from '../../types/components/texts';

const AnchorText = (props: AnchorTextProps): React.ReactElement => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled ?? false}
      activeOpacity={0.8}
      onPress={props.onPress}>
      <Text
        style={[
          styles.anchorText,
          props.isDisabled && styles.disabledText,
          props.style,
        ]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  anchorText: {
    color: globalColors.greenSecondary,
    fontSize: 16,
    fontFamily: globalVars.fontBold,
    fontWeight: 'bold',
  },
  disabledText: {
    color: globalColors.lightGray,
  },
});

export default AnchorText;
