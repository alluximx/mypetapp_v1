import React, {useState, useEffect} from 'react';
import {AxiosError} from 'axios';
import {List, StyleService} from '@ui-kitten/components';
// My components
import AddressForm from '../../../components/forms/address-form';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';
// Hook.
import useGetAddresses from '../../../hooks/address/useGetAddresses';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSaveAddress from '../../../hooks/address/useSaveAddress';
// Global Styles
import globalColors from '../../../styles/colors';

export default ({navigation, route}): React.ReactElement => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [saveAddressEnabled, setSaveAddressEnabled] = useState(false);
  const [nameState, setNameState] = useState('');
  const [nameMunicipality, setNameMunicipality] = useState('');
  const [error, setError] = useState();
  const addressQuery = useGetAddresses();
  const addAddressQuery = useSaveAddress();

  const [form, setForm] = useState({
    street: '',
    number: '',
    int_number: '',
    reference: '',
    colony: '',
    city: '',
    state: '',
    municipality: '',
    zipcode: '',
    is_saved: false,
  });

  useEffect(() => {
    if (addressQuery.isSuccess && addressQuery.data) {
      setAddresses(addressQuery.data.data);
    }
  }, [addressQuery.isSuccess]);

  const changeValue = () => {
    setSaveAddressEnabled(!saveAddressEnabled);
    setForm({...form, is_saved: !saveAddressEnabled});
  };

  useEffect(() => {
    !saveAddressEnabled && setForm({...form, is_saved: saveAddressEnabled});
  }, [saveAddressEnabled]);

  useEffect(() => {
    addresses.length > 2 && setIsDisable(true);
  }, [addresses.length]);

  const onSavePress = () => {
    const auxData = {
      city: form.city,
      colony: form.colony,
      int_number: form.int_number,
      is_saved: form.is_saved,
      municipality: {
        id_municipality: form.municipality,
        name_municipality: nameMunicipality,
      },
      number: form.number,
      reference: form.reference,
      state: {
        id_state: form.state,
        name_state: nameState,
      },
      street: form.street,
      zipcode: form.zipcode,
    };

    addAddressQuery.mutate(form, {
      onSuccess: (response) => {
        navigation.navigate('PaymentSummary', {
          data: {
            address: {
              ...auxData,
              addressId: response.data.id,
            },
          },
        });
      },
      onError: (responseError: AxiosError) => {
        setError(responseError.response.data);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const isDisabled =
    form.street === '' ||
    form.number === '' ||
    form.city === '' ||
    form.colony === '' ||
    form.state === '' ||
    form.zipcode === '' ||
    isLoading;

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: {...form},
  });

  /***************************
   *** Rendering functions ***
   ***************************/

  const renderAddress = ({item}) => {
    const street = item.street;
    const number = item.number;
    const zipcode = item.zipcode;
    const city = item.city;
    const state = item.state.name;
    const title = item.user_address.name;

    const auxData = {
      city,
      colony: item.colony,
      int_number: item.int_number,
      addressId: item.id,
      is_saved: item.is_saved,
      municipality: {
        id_municipality: item.municipality.id,
        name_municipality: item.municipality.name,
      },
      number,
      reference: item.reference,
      state: {
        id_state: item.state.id,
        name_state: state,
      },
      street,
      zipcode,
    };

    const content =
      street + ' #' + number + '\n' + zipcode + ', ' + city + ' ' + state;

    return (
      <NavigateButton
        title={title}
        subtitle={content}
        destination={'PaymentSummary'}
        data={{address: auxData}}
      />
    );
  };

  const renderHeader = (
    <TitleHeader style={styles.subtitle}>Direcciones guardadas</TitleHeader>
  );

  const renderFooter = (
    <>
      <TitleHeader style={styles.subtitle}>Nueva dirección</TitleHeader>
      <AddressForm
        error={error}
        form={form}
        setForm={setForm}
        setNameMunicipality={setNameMunicipality}
        setNameState={setNameState}
      />
      {addresses.length > 2 && (
        <DefaultText style={styles.message}>
          Solo puedes guardar 3 direcciones
        </DefaultText>
      )}
      <ReminderInput
        isActive={saveAddressEnabled}
        setIsActive={changeValue}
        setValue={null}
        value={null}
        text={'Guardar dirección'}
        isDisable={isDisable}
        isNotReminder={true}
      />
    </>
  );

  const renderEmpty = (
    <DefaultText style={styles.subtitle}>
      No hay direcciones guardadas
    </DefaultText>
  );

  return addressQuery.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>Envío</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={addresses}
        ListHeaderComponent={renderHeader}
        renderItem={renderAddress}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  subtitle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: globalColors.red,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    marginTop: 15,
    height: 100,
  },
  container: {
    flex: 1,
  },
});
