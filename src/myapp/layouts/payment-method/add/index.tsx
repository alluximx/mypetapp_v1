import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {List, StyleService} from '@ui-kitten/components';
// My components
import TitleHeader from '../../../components/texts/title-header';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import UserInput from '../../../components/inputs/user-input';
import NavigateButton from '../../../components/buttons/navigate-button';
// Hooks
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSavePaymentMethod from '../../../hooks/payment-method/useSavePaymentMethod';
import useGetPaymentMethod from '../../../hooks/payment-method/useGetPaymentMethod';
// Global Styles
import globalColors from '../../../styles/colors';
import paymentMethod from '..';

export default ({navigation, route}): React.ReactElement => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addCardQuery = useSavePaymentMethod();
  const paymentQuery = useGetPaymentMethod();

  const [form, setForm] = useState({
    name: '',
    number: '',
    expiration_date: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
  });

  useEffect(() => {
    if (paymentQuery.data) {
      setPaymentMethods(paymentQuery.data.data);
    }
  }, [paymentQuery.data]);

  const onSavePress = () => {
    addCardQuery.mutate(form);
  };

  const renderServiceItem = (service) => {
    const brand = service.item.brand;
    const content = '****' + service.item.last4;

    const auxData = {
      brand: brand,
      last4: service.item.last4,
    };

    return (
      <NavigateButton
        navigation={navigation}
        title={brand}
        subtitle={content}
        destination={'MyProfile'}
        data={auxData}
      />
    );
  };

  const isDisabled =
    paymentMethods.length > 2 ||
    form.name === '' ||
    form.number === '' ||
    form.expiration_date === '' ||
    form.cvc === '' ||
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
      <TitleHeader>Método de pago</TitleHeader>
      <ScrollView>
        <TitleHeader style={styles.subtitle}>
          Métodos de pago guardados
        </TitleHeader>
        {paymentMethods && paymentMethods.length > 0 ? (
          <List
            style={styles.servicesContainer}
            data={paymentMethods}
            renderItem={renderServiceItem}
          />
        ) : (
          <DefaultText style={styles.subtitle}>
            No hay métodos de pago guardados
          </DefaultText>
        )}

        {paymentMethods.length > 2 && (
          <DefaultText style={styles.message}>
            Solo puedes guardar 3 métodos de pago
          </DefaultText>
        )}

        <TitleHeader style={styles.subtitle}>Nueva dirección</TitleHeader>
        <UserInput
          placeholder="Nombre de tarjetahabiente"
          value={form.name}
          onChangeText={(value: string) => {
            setForm({...form, name: value});
          }}
        />
        <UserInput
          placeholder="Número de tarjeta"
          value={form.number}
          isNumeric={true}
          maxLength={19}
          onChangeText={(value: string) => {
            if (
              (value.length + 1) % 5 === 0 &&
              value.length > 1 &&
              value.length < 19
            ) {
              setForm({...form, number: (value += ' ')});
            } else {
              setForm({...form, number: value});
            }
          }}
        />

        <View style={styles.horizontalContainer}>
          <UserInput
            placeholder="Expriación "
            value={form.expiration_date}
            isNumeric={true}
            maxLength={5}
            onChangeText={(value: string) => {
              value.length === 2 && value.length < 3
                ? (value += '/')
                : (value = value);
              setForm({...form, expiration_date: value});
            }}
            style={styles.UserInputContainer}
          />
          <UserInput
            placeholder="CVV "
            value={form.cvc}
            isNumeric={true}
            maxLength={3}
            onChangeText={(value: string) => {
              setForm({...form, cvc: value});
            }}
            style={styles.UserInputContainer}
          />
        </View>
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
  horizontalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  UserInputContainer: {
    flexBasis: '48%',
    height: 60,
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    marginBottom: 16,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: globalColors.red,
  },
});
