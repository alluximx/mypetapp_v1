import React from 'react';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/default-layout';
import {Dimensions, Image} from 'react-native';
import globalColors from '../../../styles/colors';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  return (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <Image
        style={styles.imagePort}
        source={require('../assets/adoprion.png')}
      />
      <Layout style={styles.layoutPort}>
        <Text style={styles.textTitle}>Adopciones</Text>
        <Text style={styles.textContent}>
          Haz un nuevo amigo y dale un hogar a quién más lo necesita.
        </Text>
      </Layout>
    </DefaultLayout>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  imagePort: {
    width: width,
    height: 320,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 12,
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  textContent: {
    lineHeight: 24,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: globalColors.darkGray,
  },
});
