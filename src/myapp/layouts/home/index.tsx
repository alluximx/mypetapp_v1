import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, List, Text} from '@ui-kitten/components';
import {AddIcon} from './extra/icons';
// My Components
import DefaultLayout from '../../components/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';
// Services
import auth_service from '../../services/auth-service';
// Global styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const pets = [
  {
    name: 'Argos',
    imageUrl: require('./assets/image-pet-1.jpg'),
    age: 3,
  },
  {
    name: 'Valerio',
    imageUrl: require('./assets/image-pet-2.jpg'),
    age: 1,
  },
];

const servicesList = [
  {
    serviceName: 'Veterinaria',
    icon: require('../../assets/images/menu/vets.png'),
  },
  {
    serviceName: 'Estética',
    icon: require('../../assets/images/menu/pet-stylists.png'),
  },
  {
    serviceName: 'Productos',
    icon: require('../../assets/images/menu/products.png'),
  },
];

export default ({navigation}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const hasPets = pets.length != 0;

  useEffect(() => {
    const getMyInfo = async () => {
      const response = await auth_service.me();

      if (response.status) {
        setUser(response.data);
      } else {
        console.log('ERROR: ' + response.data);
        // Pregunar cómo se debe ver cuando entre como invitado.
      }
    };

    getMyInfo();
    setIsLoading(false);
  }, []);

  const onAddPetButtonPress = (pet) => {
    navigation &&
      navigation.navigate('AddPet', {
        pet: pet,
      });
  };

  const onDetailPetButtonPress = (pet) => {
    navigation &&
      navigation.navigate('DetailPet', {
        pet: pet,
        id: pet.id,
      });
  };

  const onServiceButtonPress = (service) => {
    navigation &&
      navigation.navigate('ProductList', {
        service: service,
      });
  };

  const renderHeader = () => (
    <View>
      <TitleHeader style={styles.greeting}>
        Hola{' '}
        <TitleHeader style={styles.highlightedText}>
          {user.username}
        </TitleHeader>
      </TitleHeader>
      {hasPets ? (
        <DefaultText>¿Cómo están tus mascotas hoy?</DefaultText>
      ) : (
        <DefaultText>Aún no tienes mascotas registradas</DefaultText>
      )}
    </View>
  );

  const renderPetButton = (pet) => (
    <Button
      activeOpacity={0.9}
      accessoryLeft={() => (
        <Image style={styles.dogProfileImage} source={pet.item.imageUrl} />
      )}
      accessoryRight={() => (
        <Text style={styles.ageText}>
          {pet.item.age} {pet.item.age == 1 ? 'año' : 'años'}
        </Text>
      )}
      style={styles.profileButton}
      onPress={(pet) => onDetailPetButtonPress(pet)}>
      {() => <Text style={styles.petNameText}>{pet.item.name}</Text>}
    </Button>
  );

  const renderAddPetButton = () => (
    <Button
      activeOpacity={0.8}
      style={styles.addButton}
      accessoryLeft={AddIcon}
      onPress={onAddPetButtonPress}
    />
  );

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
    <DefaultLayout style={{paddingRight: 0, paddingBottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <List
          style={styles.petButtonsContainer}
          contentContainerStyle={[
            styles.petButtonsContentContainer,
            !hasPets && styles.petButtonContentContainerEmpty,
          ]}
          horizontal={true}
          ListFooterComponent={renderAddPetButton}
          ListFooterComponentStyle={styles.addButtonContainer}
          data={pets}
          renderItem={renderPetButton}
          ListEmptyComponent={() => (
            <DefaultText style={styles.emptyText}>
              Agrega tu primera mascota
            </DefaultText>
          )}
        />

        <TitleHeader>
          ¿Qué necesitan tus{' '}
          <TitleHeader style={styles.highlightedText}>mascotas</TitleHeader>?
        </TitleHeader>

        <List
          style={styles.servicesContainer}
          contentContainerStyle={styles.servicesContentContainer}
          horizontal={true}
          data={servicesList}
          renderItem={renderServiceItem}
        />

        <Card activeOpacity={0.8} style={styles.adoptionBanner}>
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
  greeting: {
    marginBottom: 4,
  },
  highlightedText: {
    color: globalColors.greenPrimary,
  },
  profileButton: {
    backgroundColor: globalColors.greenSecondary,
    borderWidth: 0,
    flexDirection: 'column',
    borderRadius: 16,
    width: 128,
    paddingTop: 16,
    paddingBottom: 24,
    marginRight: 24,
  },
  petButtonsContainer: {
    backgroundColor: 'transparent',
    marginVertical: 24,
    paddingBottom: 8,
  },
  petButtonsContentContainer: {
    paddingBottom: 8,
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
  dogProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  petNameText: {
    fontFamily: globalVars.fontBold,
    color: globalColors.white,
    fontSize: 16,
    marginBottom: 4,
  },
  ageText: {
    color: globalColors.white,
    fontSize: 14,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: globalColors.greenSecondary,
  },
  addButtonContainer: {
    alignSelf: 'center',
    marginRight: 24,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginVertical: 16,
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
  adoptionBanner: {
    marginRight: globalVars.outsidePadding,
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
