import {List} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {StyleSheet, View, Image, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useGetVaccineIndex from '../../hooks/vaccines/useGetVaccineIndex';
// My Components.
import CustomSpinner from '../custom-spinner';
import VaccineCard from '../../components/cards/vaccine-index-card';
import TitleHeader from '../texts/title-header';
import DefaultText from '../texts/default-text';
import globalVars from '../../styles/vars';
// Types.
import {VaccinesListProps} from '../../types/components/vaccines';

const DewormingList = (props: VaccinesListProps): React.ReactElement => {
  const navigation = useNavigation();

  const [dewormings, setDewormings] = useState([]);

  const {data, isLoading} = useGetVaccineIndex(
    props.petId,
    'false',
    props.typeId ?? '',
    props.rangeDate ?? '',
  );

  useEffect(() => {
    if (data) {
      function sortByDate(a, b) {
        const Item1 = a.vaccine_date;
        const Item2 = b.vaccine_date;
        if (Item1 < Item2) {
          return 1;
        }
        if (Item1 > Item2) {
          return -1;
        }
        return 0;
      }
      data.data.sort(sortByDate);
      const groupVaccines = data.data.reduce((acc, obj) => {
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
  }, [data]);

  function customSort(a, b) {
    const Item1 = a.name;
    const Item2 = b.name;
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
    const next_vaccine_date = moment(service.item.next_deworming_date).toDate();
    const notification = moment(service.item.reminder).toDate();
    const substrac = next_vaccine_date.getTime() - notification.getTime();
    const notificationDays = Math.round(substrac / (1000 * 60 * 60 * 24));
    const auxData = {
      name: service.item.name,
      validity: is_unique ? 'Unica' : service.item.deworming_date,
      notification:
        !is_unique && service.item.reminder ? notificationDays : null,
      status:
        is_unique || next_vaccine_date > moment().toDate()
          ? 'Activa'
          : 'Vencida',
      vaccineDates: service.item.dewormings,
    };
    return (
      <VaccineCard navigation={navigation} vaccine={false} data={auxData} />
    );
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <CustomSpinner />
    </View>
  ) : (
    <List
      style={styles.servicesContainer}
      data={dewormings}
      renderItem={renderServiceItem}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.dogImage}
            source={require('./assets/deworminPetImage.png')}
          />
          <TitleHeader style={styles.center}>
            No se encontraron resultados
          </TitleHeader>
          <DefaultText style={[styles.center, styles.subtitle]}>
            Intenta cambiar las opciones de filtros para obtener mejores
            resultados.
          </DefaultText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexBasis: '50%',
  },
  container: {
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 16,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  emptyContainer: {
    padding: globalVars.outsidePadding,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
    padding: 10,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});

export default DewormingList;
