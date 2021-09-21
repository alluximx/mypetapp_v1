import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';
import GenericCard from '../../components/cards/generic-card';
import CustomSpinner from '../../components/custom-spinner';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Hook.
import useGetAddress from '../../hooks/address/useGetAddress';

export default ({navigation, route}): React.ReactElement => {
  const [addresses, setAddresses] = useState([]);
  const addressQuery = useGetAddress();

  useEffect(() => {
    if (addressQuery.data) {
      setAddresses(addressQuery.data.data);
    }
  }, [addressQuery.data]);

  const renderServiceItem = (service) => {
    const street = service.item.street;
    const number = service.item.number;
    const zipCode = service.item.zipcode;
    const city = service.item.city;
    const state = service.item.state.name;
    const title = service.item.user_address.name;

    const content =
      street + ' #' + number + '\n' + zipCode + ', ' + city + ' ' + state;

    const data = {
      buttonAlign: 'right',
      buttonColor: globalColors.red,
      buttonText: 'Eliminar',
      date: null,
      content: content,
      images: null,
      styleCard: {},
      title: title,
    };
    return (
      <GenericCard
        data={data}
        styleCard={{marginHorizontal: 0}}
        onClick={null}
      />
    );
  };

  return addressQuery.isLoading ? (
    <CustomSpinner />
  ) : addresses.length > 0 ? (
    <DefaultLayout>
      <TitleHeader>Direcciones</TitleHeader>
      <DefaultText style={{marginBottom: 16}}>
        Puedes guardar hasta 3 direcciones
      </DefaultText>
      <List
        style={styles.servicesContainer}
        data={addresses}
        renderItem={renderServiceItem}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../../assets/images/pets/petDirecciones.png')}
      />
      <TitleHeader style={styles.center}>Direcciones</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        No tienes Direcciones guardadas.
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
    padding: 10,
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
