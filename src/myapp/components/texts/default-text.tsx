import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';

const DefaultText = (props): React.ReactElement => {
  if (props.wrapText) {
    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.defaultText, props.style]}
        category="s1">
        {props.children}
      </Text>
    );
  } else {
    return (
      <Text style={[styles.defaultText, props.style]} category="s1">
        {props.children}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  defaultText: {
    color: globalColors.darkGray,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DefaultText;
