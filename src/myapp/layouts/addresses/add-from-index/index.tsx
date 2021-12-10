import React, {useState, useEffect} from 'react';
import {AxiosError} from 'axios';
import {StyleService} from '@ui-kitten/components';
import {ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
// My components
import DefaultLayout from '../../../components/layouts/default-layout';
// Hook.
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSaveAddress from '../../../hooks/address/useSaveAddress';
// Global Styles
import AddressForm from '../../../components/addresses/address-form';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    is_saved: true,
  });

  const onSavePress = () => {
    addAddressQuery.mutate(form, {
      onSuccess: () => {
        navigation.goBack();
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

  return (
    <DefaultLayout>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          contentContainerStyle={styles.container}>
          <TitleHeader style={styles.title}>Nueva dirección</TitleHeader>
          <AddressForm error={error} form={form} setForm={setForm} />
        </KeyboardAvoidingView>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    marginBottom: 24,
  },
});
