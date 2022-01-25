import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Card, List, Spinner} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
// My Components
import AddButton from '../../components/buttons/add-button';
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import DefaultText from '../../components/texts/default-text';
import PetCard from '../../components/cards/pet-card';
import TitleHeader from '../../components/texts/title-header';
// Global styles
import globalColors from '../../styles/colors';
import globalStyles from '../../styles/style';
import globalVars from '../../styles/vars';
// Hooks
import useMyNameAndPets from '../../hooks/user/useMyNameAndPets';
// Types
import {HomeRouteParams} from '../../types/navigation/home-navigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Pet} from '../../types/models';

const servicesList = [
  {
    disabled: false,
    icon: require('../../assets/images/menu/vets.png'),
    route: 'VetFilter',
    serviceName: 'Veterinaria',
  },
  {
    disabled: false,
    icon: require('../../assets/images/menu/pet-stylists.png'),
    route: 'AestheticFilter',
    serviceName: 'Estética',
  },
  {
    disabled: false,
    icon: require('../../assets/images/menu/products.png'),
    route: 'ProductList',
    serviceName: 'Productos',
  },
];

export default ({navigation}): React.ReactElement => {
  const route = useRoute<HomeRouteParams>();
  const data = useMyNameAndPets();
  const hasPets = data.pets.length !== 0;

  const onAddPetButtonPress = (pet) =>
    navigation && navigation.navigate('AddPet', {pet: pet});

  const onDetailPetButtonPress = (pet) =>
    navigation && navigation.navigate('DetailPet', {pet: pet});

  const renderHeader = () => (
    <View style={styles.centeredContainer}>
      <TitleHeader style={styles.greeting}>
        Hola{' '}
        <TitleHeader style={globalStyles.highlightedText}>
          {data.userName.split(' ')[0]}
        </TitleHeader>
      </TitleHeader>
      {hasPets && !route.params.isGuest ? (
        <DefaultText>¿Cómo están tus mascotas hoy?</DefaultText>
      ) : (
        <DefaultText>Aún no tienes mascotas registradas</DefaultText>
      )}
    </View>
  );

  const renderPetButton = ({item}: {item: Pet}) => (
    <PetCard pet={item} key={item.id} onPress={onDetailPetButtonPress} />
  );

  const renderServiceItem = (service) => (
    <TouchableOpacity
      disabled={service.disabled}
      key={service.serviceName}
      style={[
        styles.serviceContainer,
        service.disabled && {
          opacity: 0.3,
        },
      ]}
      onPress={() => navigation.navigate(service.route, {})}>
      <Card activeOpacity={0.8} style={styles.serviceIconContainer}>
        <Image style={styles.serviceIcon} source={service.icon} />
      </Card>
      <DefaultText style={styles.serviceNameText}>
        {service.serviceName}
      </DefaultText>
    </TouchableOpacity>
  );

  return data.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <List
          style={styles.petButtonsContainer}
          contentContainerStyle={[
            styles.petButtonsContentContainer,
            (!hasPets || route.params.isGuest) &&
              styles.petButtonContentContainerEmpty,
          ]}
          horizontal={true}
          ListFooterComponent={() => (
            <AddButton onAdd={onAddPetButtonPress} isSubmit />
          )}
          ListFooterComponentStyle={styles.addButtonContainer}
          data={data.pets}
          renderItem={renderPetButton}
          ListEmptyComponent={() => (
            <DefaultText key="empty-pet" style={styles.emptyText}>
              Agrega tu primera mascota
            </DefaultText>
          )}
        />

        <TitleHeader style={styles.centeredContainer}>
          ¿Qué necesitan tus{' '}
          <TitleHeader style={globalStyles.highlightedText}>
            mascotas
          </TitleHeader>
          ?
        </TitleHeader>

        <View style={styles.servicesContentContainer}>
          {servicesList.map((item) => {
            return renderServiceItem(item);
          })}
        </View>

        <Card
          activeOpacity={0.8}
          style={styles.adoptionBanner}
          onPress={() => {
            navigation.navigate('AdoptionFilter', {});
          }}>
          <TitleHeader style={styles.adoptionTitle}>
            ¡Haz un nuevo amigo!
          </TitleHeader>
          <DefaultText style={styles.adoptionText}>
            Adopta una mascota hoy
          </DefaultText>
          <Image
            style={[styles.paw, styles.pawLeft]}
            source={require('../../assets/images/paw.png')}
          />
          <Image
            style={[styles.paw, styles.pawRight]}
            source={require('../../assets/images/paw.png')}
          />
        </Card>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  centeredContainer: {
    marginHorizontal: globalVars.outsidePadding,
  },
  greeting: {
    marginBottom: 4,
  },
  petButtonsContainer: {
    backgroundColor: 'transparent',
    marginVertical: 24,
    paddingBottom: 8,
  },
  petButtonsContentContainer: {
    paddingBottom: 8,
    paddingHorizontal: globalVars.outsidePadding,
  },
  petButtonContentContainerEmpty: {
    flexDirection: 'column-reverse',
    width: '100%',
    paddingRight: globalVars.outsidePadding,
    paddingTop: 50,
    paddingBottom: 40,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
  },
  addButtonContainer: {
    alignSelf: 'center',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginVertical: 16,
    paddingBottom: 8,
  },
  servicesContentContainer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  serviceContainer: {
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
  adoptionBanner: {
    marginHorizontal: globalVars.outsidePadding,
    backgroundColor: globalColors.greenPrimary,
    borderRadius: 16,
    paddingVertical: 8,
  },
  adoptionTitle: {
    color: globalColors.white,
    zIndex: 10,
  },
  adoptionText: {
    color: globalColors.white,
    zIndex: 10,
  },
  paw: {
    position: 'absolute',
    height: 90,
    width: 82,
  },
  pawLeft: {
    top: -35,
    left: -15,
    transform: [{rotateZ: '-50deg'}],
  },
  pawRight: {
    right: 2,
    top: 5,
  },
});
