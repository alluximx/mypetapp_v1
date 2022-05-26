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

const VaccineList = (props: VaccinesListProps): React.ReactElement => {
  const navigation = useNavigation();

  const [vaccines, setVaccines] = useState([]);

  const {data, isLoading} = useGetVaccineIndex(
    props.petId,
    'true',
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

  vaccines.sort(customSort);

  const renderVaccine = (service) => {
    const is_unique = service.item.is_unique;
    const next_vaccine_date = moment(service.item.next_vaccine_date).toDate();
    const notification = moment(service.item.reminder).toDate();
    const substrac = next_vaccine_date.getTime() - notification.getTime();
    const notificationDays = Math.round(substrac / (1000 * 60 * 60 * 24));
    const auxData = {
      id: service.item.id_record,
      petId: props.petId,
      name: service.item.name,
      validity: is_unique ? 'Única' : service.item.vaccine_date,
      notification:
        !is_unique && service.item.reminder ? notificationDays : null,
      status:
        is_unique || next_vaccine_date > moment().toDate()
          ? 'Activa'
          : 'Vencida',
      vaccineDates: service.item.vaccines,
    };

    return (
      <VaccineCard navigation={navigation} vaccine={true} data={auxData} />
    );
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <CustomSpinner />
    </View>
  ) : (
    <List
      style={styles.servicesContainer}
      data={vaccines}
      renderItem={renderVaccine}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.dogImage}
            source={require('./assets/pet-vaccine.png')}
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

export default VaccineList;
