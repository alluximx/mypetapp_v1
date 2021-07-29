import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Image, Dimensions} from 'react-native';
//My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import VaccineCard from '../../../components/cards/vaccine-index-card';
import CustomSpinner from '../../../components/custom-spinner';
//Global Styles
import globalColors from '../../../styles/colors';
//UI Kitten
import {Layout, Text, StyleService, List} from '@ui-kitten/components';
// Hook.
import useGetVaccineIndex from '../../../hooks/vaccines/useGetVaccineIndex';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;

  const [vaccines, setVaccines] = useState([]);
  const vaccinesQuery = useGetVaccineIndex(id);

  useEffect(() => {
    if (vaccinesQuery.data) {
      function sortByDate(a, b) {
        var Item1 = a.vaccine_date;
        var Item2 = b.vaccine_date;
        if (Item1 < Item2) {
          return 1;
        }
        if (Item1 > Item2) {
          return -1;
        }
        return 0;
      }
      vaccinesQuery.data.data.sort(sortByDate);
      const groupVaccines = vaccinesQuery.data.data.reduce((acc, obj) => {
        const id = obj.vaccine_registered.id;
        const formatedVaccine = {id: obj.id, date: obj.vaccine_date};
        if (!acc[id]) {
          acc[id] = {
            id_vaccine: id,
            id_record: obj.id,
            name: obj.vaccine_registered.vaccine_name,
            reminder: obj.reminder,
            is_unique: obj.vaccine_registered.is_unique,
            next_vaccine_date: obj.next_vaccine_date,
            vaccine_date: obj.vaccine_date,
            vaccines: [formatedVaccine],
          };
        } else {
          acc[id].vaccines.push(formatedVaccine);
        }
        return acc;
      }, {});

      const formatedArray: any = [];
      const claves = Object.keys(groupVaccines);

      claves.forEach((element) => {
        formatedArray.push(groupVaccines[element]);
      });

      setVaccines(formatedArray);
    }
  }, [vaccinesQuery.data]);

  function customSort(a, b) {
    var Item1 = a.name;
    var Item2 = b.name;
    if (Item1 > Item2) {
      return 1;
    }
    if (Item1 < Item2) {
      return -1;
    }
    return 0;
  }

  vaccines.sort(customSort);

  const renderServiceItem = (service) => {
    const is_unique = service.item.is_unique;
    const next_vaccine_date = new Date(service.item.next_vaccine_date);
    const notification = new Date(service.item.reminder);
    const substrac = next_vaccine_date.getTime() - notification.getTime();
    const notificationDays = Math.round(substrac / (1000 * 60 * 60 * 24) + 1);
    const auxData = {
      name: service.item.name,
      validity: is_unique ? 'Unica' : service.item.vaccine_date,
      notification: !is_unique ? notificationDays : null,
      status:
        is_unique || next_vaccine_date > new Date() ? 'Activa' : 'Vencida',
      vaccineDates: service.item.vaccines,
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

  return vaccinesQuery.isLoading ? (
    <CustomSpinner />
  ) : vaccines.length > 0 ? (
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
