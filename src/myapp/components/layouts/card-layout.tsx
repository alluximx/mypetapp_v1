import React from 'react';
import {StatusBarStyle, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
// My components
import DefaultLayout from './default-layout';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

interface CardLayoutProps {
  style?: {};
  cardContent: React.ReactFragment;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}

const CardLayout = (props: CardLayoutProps): React.ReactElement => {
  const barStyle = props.statusBarStyle ?? 'dark-content';
  const backgroundColor =
    props.statusBarBackgroundColor ?? globalColors.backgroundDefault;

  return (
    <DefaultLayout
      statusBarStyle={barStyle}
      statusBarBackgroundColor={backgroundColor}>
      <DefaultLayout>{props.cardContent}</DefaultLayout>
    </DefaultLayout>
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

export default CardLayout;
