import React from 'react';
import {ScrollView, StyleSheet, View, Dimensions, Image} from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import RatingCard from '../../../components/cards/rating-card';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const data = route.params.data;
  const {
    availability,
    colony,
    distance,
    exterior_number,
    logo,
    name,
    rating,
    street,
    zipcode,
  } = data;

  const nameState = data.state.name;
  const municipality = data.municipality.name;
  const address = `${street} #${exterior_number}, ${colony},\n${zipcode} ${municipality}, ${nameState}.`;
  return (
    <>
      <View style={styles.containerImage}>
        <Image
          source={{
            uri: logo,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.titleCard}>
        <TitleHeader style={styles.bottomSpace}>{name}</TitleHeader>
      </View>
      <ScrollView>
        <DefaultLayout
          statusBarTranslucent
          statusBarStyle={'light-content'}
          statusBarBackgroundColor={'transparent'}
          style={styles.container}>
          <DefaultText style={styles.subtitle}>{address}</DefaultText>
          <DefaultText style={styles.subtitle2}>{availability}</DefaultText>
          <RatingCard rating={rating} distance={distance} />
          <DefaultText style={styles.consult}>{'Consulta'}</DefaultText>
          <TitleHeader
            style={[globalStyles.highlightedText, {marginBottom: 32}]}>
            {'$' + 200}
          </TitleHeader>
          <NavigateButton destination="Home" placeholder="Generar Cita" />
        </DefaultLayout>
      </ScrollView>
    </>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height * 0.55,
  },
  subtitle: {
    marginTop: -8,
    marginBottom: 24,
  },
  subtitle2: {
    marginBottom: 24,
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
    height: height * 0.5,
    marginBottom: '-20%',
  },
  image: {
    width: width,
    height: height * 0.45,
    resizeMode: 'cover',
  },
});
