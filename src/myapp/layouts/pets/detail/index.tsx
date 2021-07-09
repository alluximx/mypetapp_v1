import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../../styles/colors';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import PetDataCard from '../../../components/cards/pet-data-card';
import TitleHeader from '../../../components/texts/title-header';

const servicesList = [
  {
    serviceName: 'Visitas',
    icon: require('../../../assets/images/menu/vets.png'),
  },
  {
    serviceName: 'Vacunas',
    icon: require('../../../assets/images/menu/pet-stylists.png'),
  },
  {
    serviceName: 'Desparaci...',
    icon: require('../../../assets/images/menu/products.png'),
  },
];

export default ({navigation, route}): React.ReactElement => {
  const {bread, image, name, sex} = route.params.pet;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText
          style={styles.headerRight}
          onPress={() =>
            navigation.navigate('EditPet', {pet: route.params.pet})
          }>
          Editar
        </AnchorText>
      ),
    });
  }, [navigation]);

  const renderServiceItem = (service) => (
    <View style={styles.serviceContainer}>
      <Card activeOpacity={0.8} style={styles.serviceIconContainer}>
        <Image style={styles.serviceIcon} source={service.item.icon} />
      </Card>
      <DefaultText style={styles.serviceNameText}>
        {service.item.serviceName}
      </DefaultText>
    </View>
  );

  return (
    <DefaultLayout style={styles.container}>
      <View style={styles.petImageContainer}>
        <Image
          style={styles.petImage}
          source={require('../../home/assets/image-pet-1.jpg')}
        />
        <View style={styles.petDataContainer}>
          <TitleHeader style={styles.whiteText}>{name}</TitleHeader>
          <DefaultText style={styles.whiteText}>Beagle</DefaultText>
        </View>
      </View>
      <View style={styles.petDataCards}>
        <PetDataCard title="Macho" subtitle="Sexo" />
        <PetDataCard title="3 Años" subtitle="Edad" />
      </View>
      <DefaultLayout
        statusBarBackgroundColor={globalColors.greenSecondary}
        statusBarStyle="light-content"
        style={styles.cardSection}>
        <TitleHeader style={styles.bottomSpace}>Historial Clínico</TitleHeader>
        <List
          style={styles.servicesContainer}
          contentContainerStyle={styles.servicesContentContainer}
          horizontal={true}
          data={servicesList}
          renderItem={renderServiceItem}
        />
      </DefaultLayout>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.greenSecondary,
    paddingTop: 32,
    paddingHorizontal: 0,
  },
  headerRight: {
    color: globalColors.white,
    marginRight: 12,
  },
  whiteText: {
    color: globalColors.white,
  },
  petDataCards: {
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  petImageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  petDataContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardSection: {
    marginTop: 32,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: 32,
  },
  bottomSpace: {
    marginBottom: 24,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
  },
  servicesContentContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  serviceContainer: {
    marginRight: 33,
    alignItems: 'center',
  },
  serviceIconContainer: {
    borderRadius: 16,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  serviceIcon: {
    height: 55,
    width: 55,
  },
  serviceNameText: {
    color: globalColors.black,
    fontSize: 14,
    textAlign: 'center',
  },
});
