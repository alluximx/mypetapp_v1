import React, {useLayoutEffect} from 'react';
import {Image, Dimensions} from 'react-native';
//My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import VaccineCard from '../../../components/cards/vaccine-index-card';

//Global Styles
import globalColors from '../../../styles/colors';
//UI Kitten
import {Layout, Text, StyleService, List} from '@ui-kitten/components';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;

  /* const vaccines = null;
  const vaccines2 = null; */

  const vaccines = [
    {
      name: 'Parainfluenza',
      validity: '28/02/2021',
      notification: '2 dias antes',
      status: 'Vencida',
      vaccineDates: ['28/02/2021', '28/02/2021', '28/02/2021'],
    },
    {
      name: 'Parvovirus',
      validity: 'Única',
      notification: '1 semana antes',
      status: 'Activa',
      vaccineDates: ['28/02/2021', '28/02/2021'],
    },
    {
      name: 'Polivalente',
      validity: '28/02/2022',
      notification: '2 semanas antes',
      status: 'Activa',
      vaccineDates: ['28/02/2021', '28/02/2021', '28/02/2021', '28/02/2021'],
    },
    {
      name: 'Parainfluenza',
      validity: '28/02/2021',
      notification: '2 dias antes',
      status: 'Vencida',
      vaccineDates: ['28/02/2021', '28/02/2021', '28/02/2021'],
    },
    {
      name: 'Bordetella',
      validity: 'Única',
      notification: '1 semana antes',
      status: 'Activa',
      vaccineDates: ['28/02/2021', '28/02/2021', '28/02/2021'],
    },
  ];

  const renderServiceItem = (service) => {
    const auxData = {
      name: service.item.name,
      validity: service.item.validity,
      notification: service.item.notification,
      status: service.item.status,
      vaccineDates: service.item.vaccineDates,
    };
    return <VaccineCard navigation={navigation} data={auxData} />;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          style={{backgroundColor: globalColors.backgroundDefault}}
          iconStyle={{
            tintColor: globalColors.greenSecondary,
            height: 35,
            width: 35,
          }}
          onAdd={() => navigation.navigate('AddVaccine', {petId: id})}
        />
      ),
    });
  }, [navigation]);

  return vaccines !== null ? (
    <DefaultLayout>
      <Text style={styles.titleh1}>Vacunas</Text>
      <List
        style={styles.servicesContainer}
        data={vaccines}
        renderItem={renderServiceItem}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <Layout
        style={[
          styles.formContainer,
          {backgroundColor: globalColors.backgroundDefault},
        ]}>
        <Image
          style={styles.dogImage}
          source={require('../assets/pet-vaccine.png')}
        />
        <Text style={styles.h1}>Vacunas</Text>
        <Text style={styles.textLabel} category="label">
          Aún no has agregado vacunas para tu
        </Text>
        <Text style={styles.textLabel} category="label">
          mascota.
        </Text>
      </Layout>
    </DefaultLayout>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
    width: width,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    lineHeight: 24,
    color: '#707070',
  },
  h1: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
  },
  titleh1: {
    color: globalColors.black,
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    paddingBottom: 10,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
