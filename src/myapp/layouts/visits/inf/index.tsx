import {useEffect} from 'react';
import React, {useLayoutEffect} from 'react';
import {Image, Dimensions, View, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks.
import useVisitsInformation from '../../../hooks/visits/useVisitsInformation';
// Models.
import {Visit} from 'src/myapp/types/models';
// My components.
import AddButton from '../../../components/buttons/add-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VisitCardImg from '../../../components/Visit/visit-Image';

export default ({navigation, route}): React.ReactElement => {
  const {id} = route.params.pet;
  const {data: visitsData, isLoading, isFetched} = useVisitsInformation(id);
  const [visits, setVisits] = React.useState([]);

  useEffect(() => {
    if (visitsData) {
      const sortedData = visitsData.data.sort((a: Visit, b: Visit) =>
        a.visit_date < b.visit_date ? 1 : -1,
      );
      setVisits(sortedData);
    }
  }, [visitsData, isFetched]);

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
            navigation.navigate('NewVisitMedical', {
              pet: route.params.pet,
              visit: {
                idVisit: '',
                title: '',
                details: '',
                date: '',
                images: [],
              },
              isEdit: false,
            })
          }
        />
      ),
    });
  }, [navigation]);

  const renderServiceItem = (service) => (
    <VisitCardImg data={service.item} navigation={navigation} route={route} />
  );

  return isLoading ? (
    <CustomSpinner />
  ) : visits.length > 0 ? (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <View
        style={[
          styles.formContainer,
          {backgroundColor: globalColors.backgroundDefault},
        ]}>
        <TitleHeader style={styles.title}>Visitas Veterinario</TitleHeader>
        <List
          style={styles.servicesContainer}
          data={visits}
          renderItem={renderServiceItem}
        />
      </View>
    </DefaultLayout>
  ) : (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <View
        style={[
          styles.formContainer,
          {backgroundColor: globalColors.backgroundDefault},
        ]}>
        <Image
          style={styles.dogImage}
          source={require('../assets/dog-visit.png')}
        />
        <TitleHeader style={styles.h1}>Visitas Veterinario</TitleHeader>
        <DefaultText style={styles.textLabel}>
          Aún no has agregado visitas al {'\n'}
          veterinario para tu mascota.
        </DefaultText>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
  },
  h1: {
    textAlign: 'center',
  },
  textLabel: {
    fontFamily: globalVars.fontBold,
    textAlign: 'center',
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
  },
  title: {
    marginLeft: 24,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 10,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
