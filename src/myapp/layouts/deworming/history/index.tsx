import React, {useLayoutEffect} from 'react';
import {Image, Dimensions} from 'react-native';
// My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VaccineCard from '../../../components/cards/vaccine-index-card';
// UI kitten
import {Layout, StyleService, List} from '@ui-kitten/components';
// Global Styles
import globalColors from '../../../styles/colors';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;

  const dewormingQuery = [
    {
      id: '987e3a64-818b-4e46-8985-cf3b3297a27b',
      petId: '44e99a4c-eba2-4e9c-b763-0976857908ac',
      name: 'Interna',
      deworming_date: '2021-08-27',
      next_deworming_date: '2022-04-30',
      is_unique: false,
      reminder: '2022-04-23T09:00:00-05:00',
      status: 'Activa',
      dewormings: [
        {
          id: '987e3a64-818b-4e46-8985-cf3b3297a27b',
          date: '2021-08-27',
        },
      ],
    },
  ];

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
          onAdd={() =>
            navigation.navigate('AddDeworming', {petId: route.params.pet.id})
          }
        />
      ),
    });
  }, [navigation]);

  return dewormingQuery.length > 0 ? (
    <DefaultLayout>
      <TitleHeader children="Desparasitaciones" />
      <List
        style={styles.servicesContainer}
        data={dewormingQuery}
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
