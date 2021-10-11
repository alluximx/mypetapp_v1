import React from 'react';
import {ScrollView, StyleSheet, View, Dimensions, Image} from 'react-native';
// Env
import environments from '../../../environments';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import RatingCard from '../../../components/cards/rating-card';
import NavigateButton from '../../../components/buttons/navigate-button';

export default ({navigation, route}): React.ReactElement => {
  const data = route.params.data;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerImage}>
        <Image
          source={{
            uri: data.image,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.titleCard}>
        <TitleHeader style={styles.bottomSpace}>{data.name}</TitleHeader>
      </View>
      <ScrollView>
        <DefaultLayout
          statusBarTranslucent
          statusBarStyle={'light-content'}
          statusBarBackgroundColor={'transparent'}
          style={styles.container}>
          <DefaultText
            style={
              styles.subtitle
            }>{`${data.address}, ${data.address2}`}</DefaultText>
          <DefaultText style={styles.subtitle}>{data.schedule}</DefaultText>
          <RatingCard
            rating={data.rating}
            distance={data.distance}
            styleCard={{marginTop: 8}}
          />
          <DefaultText style={styles.consult}>{'Consulta'}</DefaultText>
          <TitleHeader
            style={[globalStyles.highlightedText, {marginBottom: 32}]}>
            {'$' + data.priceConsult}
          </TitleHeader>
          <NavigateButton
            destination="VetDate"
            placeholder="Generar Cita"
            data={{screenFrom: 'AestheticDate'}}
          />
        </DefaultLayout>
      </ScrollView>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: globalColors.backgroundDefault,
    height: '100%',
  },
  container: {
    height: '50%',
  },
  subtitle: {
    marginTop: -8,
    marginBottom: 32,
  },
  consult: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 18,
  },
  bottomSpace: {
    marginBottom: 5,
  },
  titleCard: {
    backgroundColor: globalColors.backgroundDefault,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingTop: 28,
    width: '100%',
  },
  containerImage: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: '50%',
    marginBottom: '-20%',
  },
  image: {
    width: width,
    height: height * 0.45,
    resizeMode: 'cover',
  },
});
