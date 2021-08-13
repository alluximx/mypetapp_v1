import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Image, Dimensions} from 'react-native';
//My Components.
import AddButton from '../../../components/buttons/add-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VaccineCard from '../../../components/cards/vaccine-index-card';
//UI kitten
import {Layout, StyleService, List} from '@ui-kitten/components';
//Global Styles
import globalColors from '../../../styles/colors';
// Hook.
import useGetVaccineIndex from '../../../hooks/vaccines/useGetVaccineIndex';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;

  const [dewormings, setDewormings] = useState([]);
  const dewormingQuery = useGetVaccineIndex(id);

  useEffect(() => {
    if (dewormingQuery.data) {
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
      dewormingQuery.data.data.sort(sortByDate);
      const groupVaccines = dewormingQuery.data.data.reduce((acc, obj) => {
        if (!obj.is_vaccine) {
          const id = obj.vaccine_registered.id;
          const formatedDeworming = {id: obj.id, date: obj.vaccine_date};
          if (!acc[id]) {
            acc[id] = {
              id_deworming: id,
              id_record: obj.id,
              name: obj.vaccine_registered.vaccine_name,
              reminder: obj.reminder,
              is_unique: obj.vaccine_registered.is_unique,
              next_deworming_date: obj.next_vaccine_date,
              deworming_date: obj.vaccine_date,
              dewormings: [formatedDeworming],
            };
          } else {
            acc[id].dewormings.push(formatedDeworming);
          }
        }
        return acc;
      }, {});

      const formatedArray: any = [];
      const claves = Object.keys(groupVaccines);

      claves.forEach((element) => {
        formatedArray.push(groupVaccines[element]);
      });

      setDewormings(formatedArray);
    }
  }, [dewormingQuery.data]);

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

  dewormings.sort(customSort);

  const renderServiceItem = (service) => {
    const is_unique = service.item.is_unique;
    const next_vaccine_date = new Date(service.item.next_deworming_date);
    const notification = new Date(service.item.reminder);
    const substrac = next_vaccine_date.getTime() - notification.getTime();
    const notificationDays = Math.round(substrac / (1000 * 60 * 60 * 24) + 1);
    const auxData = {
      name: service.item.name,
      validity: is_unique ? 'Unica' : service.item.deworming_date,
      notification: !is_unique ? notificationDays : null,
      status:
        is_unique || next_vaccine_date > new Date() ? 'Activa' : 'Vencida',
      vaccineDates: service.item.dewormings,
    };
    return (
      <VaccineCard navigation={navigation} vaccine={false} data={auxData} />
    );
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
          onAdd={() => navigation.navigate('AddDeworming', {})}
        />
      ),
    });
  }, [navigation]);

  return dewormingQuery.isLoading ? (
    <CustomSpinner />
  ) : dewormings.length > 0 ? (
    <DefaultLayout>
      <TitleHeader children="Desparasitaciones" />
      <List
        style={styles.servicesContainer}
        data={dewormings}
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
          source={require('../../../assets/images/pets/deworminPetImage.png')}
        />
        <TitleHeader children="Desparasitaciones" style={styles.center} />
        <DefaultText
          children="Aún no has agregado desparasitaciones"
          style={[styles.center, {fontFamily: 'Montserrat-Bold'}]}
        />
        <DefaultText
          children="para tumascota."
          style={[styles.center, {fontFamily: 'Montserrat-Bold'}]}
        />
      </Layout>
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
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
  center: {
    alignSelf: 'center',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
