import {useEffect} from 'react';
import React, {useLayoutEffect} from 'react';
import {Image, Dimensions, View, StyleSheet, Platform} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks.
import useVisitsInformation from '../../../hooks/visits/useVisitsInformation';
import useVetVisitsInformation from '../../../hooks/visits/useVetVisitsInformation';
// Models.
import {Visit} from 'src/myapp/types/models';
import {VisitsIntegrated} from 'src/myapp/types/models';
// My components.
import AddButton from '../../../components/buttons/add-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VisitCardImg from '../../../components/Visit/visit-Image';
import VisitCardRecipe from '../../../components/Visit/visit-recipe-vet';

export default ({navigation, route}): React.ReactElement => {
  const {id} = route.params.pet;

  const {
    data: vetVisitsData,
    isLoading: isVetVisitsLoading,
    isFetched: isVetVisitsFetched,
  } = useVetVisitsInformation(id);
  const [visits, setVisits] = React.useState([]);

  useEffect(() => {
    if (vetVisitsData) {
      const sortedData = vetVisitsData.data.sort(
        (a: VisitsIntegrated, b: VisitsIntegrated) =>
          a.visit_date < b.visit_date ? 1 : -1,
      );
      setVisits(sortedData);
    }
  }, [vetVisitsData, isVetVisitsFetched]);

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
          isSubmit
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({item}) =>
    !item.added_by_admin ? (
      <VisitCardImg
        data={item}
        key={item.id}
        navigation={navigation}
        route={route}
      />
    ) : (
      <VisitCardRecipe
        data={item}
        key={item.id}
        navigation={navigation}
        route={route}
      />
    );

  return isVetVisitsLoading ? (
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
          renderItem={renderItem}
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
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
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
