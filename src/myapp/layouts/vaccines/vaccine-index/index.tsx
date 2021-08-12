import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
//My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import VaccineCard from '../../../components/cards/vaccine-index-card';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
//Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
//UI Kitten
import {List} from '@ui-kitten/components';
// Hook.
import useGetVaccineIndex from '../../../hooks/vaccines/useGetVaccineIndex';

export default ({navigation, route}): React.ReactElement => {
  const [vaccines, setVaccines] = useState([]);
  const vaccinesQuery = useGetVaccineIndex(route.params.pet.id);

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
        if (obj.is_vaccine) {
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

  const renderVaccine = (service) => {
    const is_unique = service.item.is_unique;
    const next_vaccine_date = new Date(service.item.next_vaccine_date);
    const notification = new Date(service.item.reminder);
    const substrac = next_vaccine_date.getTime() - notification.getTime();
    const notificationDays = Math.round(substrac / (1000 * 60 * 60 * 24) + 1);
    const auxData = {
      id: service.item.id_record,
      petId: route.params.pet.id,
      name: service.item.name,
      validity: is_unique ? 'Única' : service.item.vaccine_date,
      notification:
        !is_unique && service.item.reminder ? notificationDays : null,
      status:
        is_unique || next_vaccine_date > new Date() ? 'Activa' : 'Vencida',
      vaccineDates: service.item.vaccines,
    };

    return (
      <VaccineCard navigation={navigation} vaccine={true} data={auxData} />
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
          onAdd={() =>
            navigation.navigate('AddVaccine', {petId: route.params.pet.id})
          }
        />
      ),
    });
  }, [navigation]);

  return vaccinesQuery.isLoading ? (
    <CustomSpinner />
  ) : vaccines.length > 0 ? (
    <DefaultLayout>
      <TitleHeader style={styles.listTitle}>Vacunas</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={vaccines}
        renderItem={renderVaccine}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../assets/pet-vaccine.png')}
      />
      <TitleHeader style={styles.center}>Vacunas</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        Aún no has agregado vacunas para tu {'\n'}mascota.
      </DefaultText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
  },
  listTitle: {
    marginBottom: 8,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: globalVars.fontBold,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
