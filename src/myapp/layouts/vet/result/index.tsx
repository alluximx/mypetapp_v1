import React from 'react';
import {Layout, StyleService, useStyleSheet, List} from '@ui-kitten/components';
import {Dimensions, Image, Platform, TouchableOpacity} from 'react-native';
// Env
import environments from '../../../environments';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import GenericCard from '../../../components/cards/generic-card';
import RatingCard from '../../../components/cards/rating-card';

export default ({navigation, route}): React.ReactElement => {
  const stateName = route.params.filter.stateName;
  const townName = route.params.filter.townName;
  const styles = useStyleSheet(themedStyles);
  const data = route.params.data;
  if (data.length > 0) {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VetMaps');
          }}>
          <Image
            style={styles.locationImage}
            source={require('../../../assets/images/icons/location.png')}
          />
        </TouchableOpacity>
      ),
    });
  }

  const renderServiceItem = (services) => {
    const vet = services.item;
    const name = services.item.name;
    const address = services.item.address;
    const rating = services.item.rating;
    const distance = services.item.distance;
    const image = services.item.image;
    return (
      <GenericCard
        contentTextStyle={styles.subtitleCard}
        coverImageStyle={styles.coverImage}
        styleCard={{marginHorizontal: 0}}
        data={{
          additionalContent: [
            <RatingCard
              rating={rating}
              distance={distance}
              styleCard={{marginTop: 8}}
            />,
          ],
          content: address,
          coverImage: image,
          title: name,
        }}
        onClick={() => {
          navigation.navigate('VetDetail', {data: vet});
        }}
      />
    );
  };

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      {data.length > 0 ? (
        <>
          <TitleHeader>{data.length} Resultados</TitleHeader>
          <DefaultText>
            {townName}, {stateName}.
          </DefaultText>
          <List
            style={styles.servicesContainer}
            horizontal={false}
            data={data}
            renderItem={renderServiceItem}
          />
        </>
      ) : (
        <Layout style={{backgroundColor: globalColors.backgroundDefault}}>
          <Image
            style={styles.dogImage}
            source={require('../../../assets/images/pets/petDirecciones.png')}
          />
          <Layout style={styles.layoutPort}>
            <TitleHeader style={styles.title}>
              No se encontraron resultados
            </TitleHeader>
            <DefaultText style={styles.subtitle}>
              Al parecer aún no hay veterinarias disponibles por tu zona.
            </DefaultText>
          </Layout>
        </Layout>
      )}
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 45,
    backgroundColor: globalColors.backgroundDefault,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 320,
    maxHeight: width,
    marginVertical: 5,
  },
  locationImage: {
    height: 40,
    width: 40,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 15,
    marginTop: 24,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  subtitleCard: {
    fontSize: 14,
    marginTop: 0,
  },
  coverImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
});
