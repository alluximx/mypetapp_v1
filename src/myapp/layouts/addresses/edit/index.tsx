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
import useEditAddress from '../../../hooks/address/useEditAddress';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editAddressQuery = useEditAddress();

  const {state, municipality} = route.params.data.addressData;

  const [form, setForm] = useState({
    ...route.params.data.addressData,
    state: state.id,
    municipality: municipality.id,
  });

  const onSavePress = () => {
    editAddressQuery.mutate(form, {
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
        <TitleHeader style={styles.title}>Editar dirección</TitleHeader>
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
