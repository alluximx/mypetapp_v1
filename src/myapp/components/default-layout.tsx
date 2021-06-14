import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
// Global styles.
import globalColors from '../styles/colors';
import globalVars from '../styles/vars';

const DefaultLayout = (props): React.ReactElement => {
  return (
    <Layout style={[style.defaultLayout, props.style]}>{props.children}</Layout>
  );
};

const style = StyleSheet.create({
  defaultLayout: {
    padding: globalVars.outsidePadding,
    backgroundColor: globalColors.backgroundDefault,
    flex: 1,
  },
});

export default DefaultLayout;
