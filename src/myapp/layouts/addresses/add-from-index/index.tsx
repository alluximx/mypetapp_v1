import React, {useState} from 'react';
import {AxiosError} from 'axios';
import {ScrollView} from 'react-native';
import {StyleService} from '@ui-kitten/components';
// My components
import AddressForm from '../../../components/forms/address-form';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
// Hooks
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSaveAddress from '../../../hooks/address/useSaveAddress';

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
    <DefaultLayout style={styles.container}>
      <ScrollView>
        <TitleHeader style={styles.title}>Nueva dirección</TitleHeader>
        <AddressForm error={error} form={form} setForm={setForm} />
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
