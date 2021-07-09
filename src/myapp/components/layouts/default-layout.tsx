import React from 'react';
import {StatusBarStyle, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
// My components
import FocusAwareStatusBar from '../focus-aware-status-bar';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

interface DefaultLayoutProps {
  style?: {};
  children: React.ReactFragment;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}

const DefaultLayout = (props: DefaultLayoutProps): React.ReactElement => {
  const barStyle = props.statusBarStyle ?? 'dark-content';
  const backgroundColor =
    props.statusBarBackgroundColor ?? globalColors.backgroundDefault;

  return (
    <Layout style={[style.defaultLayout, props.style]} level="1">
      <FocusAwareStatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />
      {props.children}
    </Layout>
  );
};

const style = StyleSheet.create({
  defaultLayout: {
    paddingHorizontal: globalVars.outsidePadding,
    backgroundColor: globalColors.backgroundDefault,
    flex: 1,
    paddingTop: 10,
  },
});

export default DefaultLayout;
