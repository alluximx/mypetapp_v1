import React, {useState, useEffect} from 'react';
import {StyleService} from '@ui-kitten/components';
import {ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
// My components
import DefaultLayout from '../../../components/layouts/default-layout';
// Hook.
import useGetAddresses from '../../../hooks/address/useGetAddresses';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSaveAddress from '../../../hooks/address/useSaveAddress';
// Global Styles
import globalColors from '../../../styles/colors';
import AddressForm from '../../../components/addresses/address-form';

export default ({navigation, route}): React.ReactElement => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    if (addressQuery.data) {
      setAddresses(addressQuery.data.data);
    }
  }, [addressQuery.data]);

  const onSavePress = () =>
    addAddressQuery.mutate(form, {
      onSuccess: () => {
        navigation.goBack();
      },
    });

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

  return (
    <DefaultLayout>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          contentContainerStyle={styles.container}>
          <AddressForm addresses={addresses} form={form} setForm={setForm} />
        </KeyboardAvoidingView>
      </ScrollView>
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
