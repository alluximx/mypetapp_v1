import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalVars from '../../styles/vars';
import globalColors from '../../styles/colors';

const TitleHeader = (props): React.ReactElement => {
  if (props.wrapText) {
    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.titleHeader, props.style]}
        category="h1">
        {props.children}
      </Text>
    );
  } else {
    return (
      <Text style={[styles.titleHeader, props.style]} category="h1">
        {props.children}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: 20,
    fontFamily: globalVars.fontBold,
    color: globalColors.darkerGray,
    marginBottom: 8,
  },
});

export default TitleHeader;
