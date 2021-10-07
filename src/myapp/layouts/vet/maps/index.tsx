import React from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Dimensions, Platform} from 'react-native';
// Env
import environments from '../../../environments';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <DefaultText style={styles.subtitle}>
        Al parecer aún no hay veterinarias disponibles por tu zona.
      </DefaultText>
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});
