import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
// Global styles.
import globalColors from '../styles/colors';
import globalVars from '../styles/vars';

const DefaultLayout = (props): React.ReactElement => {
  return (
    <Layout style={[style.defaultLayout, props.style]} level="1">
      {props.children}
    </Layout>
  );
};

const style = StyleSheet.create({
  defaultLayout: {
    padding: globalVars.outsidePadding,
    paddingBottom: 0,
    backgroundColor: globalColors.backgroundDefault,
    flex: 1,
  },
});

export default DefaultLayout;
