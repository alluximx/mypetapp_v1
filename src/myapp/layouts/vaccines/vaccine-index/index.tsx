import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Image, Dimensions} from 'react-native';
//My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import VaccineCard from '../../../components/cards/vaccine-index-card';
//Global Styles
import globalColors from '../../../styles/colors';
//UI Kitten
import {Layout, Text, StyleService, List} from '@ui-kitten/components';
// Hook.
import useGetVaccineIndex from '../../../hooks/vaccines/useGetVaccineIndex';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;

  /* const vaccines = null;
  const vaccines2 = null; */

  const [vaccines, setVaccines] = useState([]);
  const vaccinesQuery = useGetVaccineIndex(id);
  //console.log('data');
  //console.log(vaccinesQuery.data);

  useEffect(() => {
    if (vaccinesQuery.data) {
      setVaccines(vaccinesQuery.data.data);
    }
  }, [vaccinesQuery.data]);

  console.log('VaccinesData');
  console.log(vaccines);

  const renderServiceItem = (service) => {
    console.log('Servicio');
    console.log(service);
    const auxData = {
      //name: service.item.id,
      name: 'ParaInfluenza',
      validity: service.item.vaccine_date,
      notification: '3 semana antes',
      status: 'Activa',
      vaccineDates: service.item.vaccineDates,
    };
    return <VaccineCard data={auxData} />;
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
          onAdd={() => navigation.navigate('AddVaccine', {})}
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
