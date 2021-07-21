import {
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  List,
  Spinner,
} from '@ui-kitten/components';
import React, {useLayoutEffect} from 'react';
import {Image, Dimensions, View} from 'react-native';
import DefaultLayout from '../../../components/layouts/default-layout';
import globalColors from '../../../styles/colors';
import AddButton from '../../../components/buttons/add-button';
import GenericCard from '../../../components/cards/generic-card';
import useVisitsInformation from '../../../hooks/visits/useVisitsInformation';
import {useEffect} from 'react';
export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;
  const data = useVisitsInformation();
  const [visits, setVisits] = React.useState([]);
  useEffect(() => {
    if (data.data) {
      setVisits(data.data.data);
    }
  }, [data.data]);
  const styles = useStyleSheet(themedStyles);
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
          onAdd={() => navigation.navigate('AddVisit', {})}
        />
      ),
    });
  }, [navigation]);
  const renderServiceItem = (service) => {
    const auxData = {
      date:
        service.item.visit_date == null
          ? null
          : new Date(service.item.visit_date),
      title: service.item.title,
      content: service.item.details,
      buttonText: 'Editar',
      buttonAlign: 'right',
      images: [],
      styleCard: {},
    };
    return <GenericCard data={auxData} />;
  };
  return data.isLoading ? (
    <View style={styles.viewContainer}>
      <Spinner size="large" status="success" />
    </View>
  ) : visits.length > 0 ? (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <Layout
        style={[
          styles.formContainer,
          {backgroundColor: globalColors.backgroundDefault},
        ]}>
        <Text style={styles.title}>Visitas Veterinario</Text>
        <List
          style={styles.servicesContainer}
          data={visits}
          renderItem={renderServiceItem}
        />
      </Layout>
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
          source={require('../assets/dog-visit.png')}
        />
        <Text style={styles.h1}>Visitas Veterinario.</Text>
        <Text style={styles.textLabel} category="label">
          Aún no has agregado visitas al
        </Text>
        <Text style={styles.textLabel} category="label">
          veterinario para tu mascota
        </Text>
      </Layout>
    </DefaultLayout>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
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
  h1: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    lineHeight: 24,
    color: '#707070',
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
  },
  cardSection: {
    marginTop: 32,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: 32,
  },
  headerRight: {
    color: globalColors.black,
    marginRight: 12,
  },
  h1Card: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
  },
  title: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 24,
  },
  labelCard: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#707070',
    marginTop: 8,
  },
  cardStyle: {
    marginLeft: 24,
    marginTop: 24,
    marginRight: 24,
  },
  addButton: {
    height: 40,
    width: 40,
    minWidth: 0,
    minHeight: 0,
    borderRadius: 40,
    backgroundColor: globalColors.greenSecondary,
    borderWidth: 0,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    width: width,
    marginTop: 10,
  },
  servicesContentContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    backgroundColor: 'transparent',
    width: width,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
