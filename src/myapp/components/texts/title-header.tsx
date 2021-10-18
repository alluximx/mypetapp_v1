import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalVars from '../../styles/vars';
import globalColors from '../../styles/colors';

interface TitleHeaderProps {
  children: any;
  numberOfLines?: number;
  style?: any;
  wrapText?: boolean;
}

const TitleHeader = (props: TitleHeaderProps): React.ReactElement => {
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
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    color: globalColors.darkerGray,
    marginBottom: 8,
  },
});

export default TitleHeader;
