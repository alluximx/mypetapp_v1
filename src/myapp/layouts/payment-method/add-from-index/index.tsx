import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {StyleService} from '@ui-kitten/components';
// My components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
// Hooks
import useGetPaymentMethod from '../../../hooks/payment-method/useGetPaymentMethod';
import useSavePaymentMethod from '../../../hooks/payment-method/useSavePaymentMethod';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// Global Styles
import globalColors from '../../../styles/colors';
// Types
import {ErrorResponse} from '../../../types/models';
import CustomSpinner from '../../../components/custom-spinner';

const initialErrors = {
  card: {
    cvc: '',
    number: '',
    exp_year: '',
    exp_month: '',
  },
};

export default ({navigation, route}): React.ReactElement => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const addCardQuery = useSavePaymentMethod();
  const paymentQuery = useGetPaymentMethod();

  const [form, setForm] = useState({
    name: '',
    number: '',
    expiration_date: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
    screenToReturn: 'PaymentMethod',
    screenFrom: 'AddPaymentMethodFromIndex',
  });

  useEffect(() => {
    if (paymentQuery.data) {
      setPaymentMethods(paymentQuery.data.data);
    }
  }, [paymentQuery.data]);

  const onSavePress = () => {
    setHasError(true);
    setErrors(initialErrors);

    addCardQuery.mutate(form, {
      onError: (error: ErrorResponse) => {
        const requestErrors = error.response.data;
        setErrors(requestErrors);
        setIsLoading(false);
        setHasError(true);
      },
    });
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

  return paymentQuery.isLoading || isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Método de pago</TitleHeader>
      <ScrollView>
        {paymentMethods.length > 2 && (
          <DefaultText style={styles.message}>
            Solo puedes guardar 3 métodos de pago
          </DefaultText>
        )}
        <UserInput
          placeholder="Nombre del tarjetahabiente"
          value={form.name}
          onChangeText={(value: string) => {
            setForm({...form, name: value});
          }}
        />
        <UserInput
          error={errors?.card?.number}
          isNumeric={true}
          maxLength={19}
          onChangeText={(value: string) => {
            let result = value.split(' ').join('');

            if (result.length > 4 && result.length <= 8) {
              result = [result.slice(0, 4), result.slice(4)].join(' ');
            } else if (result.length > 8 && result.length <= 12) {
              result = [
                result.slice(0, 4),
                result.slice(4, 8),
                result.slice(8),
              ].join(' ');
            } else if (result.length > 12) {
              result = [
                result.slice(0, 4),
                result.slice(4, 8),
                result.slice(8, 12),
                result.slice(12, 16),
              ].join(' ');
            }

            setForm({...form, number: result});
          }}
          placeholder="Número de tarjeta"
          value={form.number}
        />

        <View style={styles.horizontalContainer}>
          <UserInput
            error={errors?.card?.exp_month || errors?.card?.exp_year}
            isNumeric={true}
            maxLength={5}
            onChangeText={(value: string) => {
              let result = value.replace('/', '');

              if (result.length > 2) {
                result = [result.slice(0, 2), '/', result.slice(2)].join('');
              }

              const exp_month = result.substring(0, 2);
              const exp_year = result.substring(3, 5);

              setForm({...form, expiration_date: result, exp_month, exp_year});
            }}
            placeholder="Expiración"
            style={styles.UserInputContainer}
            value={form.expiration_date}
          />
          <UserInput
            error={errors?.card?.cvc}
            isNumeric={true}
            maxLength={4}
            onChangeText={(value: string) => {
              setForm({...form, cvc: value});
            }}
            placeholder="CVV "
            style={styles.UserInputContainer}
            value={form.cvc}
          />
        </View>
        {hasError && (
          <DefaultText style={styles.message}>
            Los datos ingresados son incorrectos. Por favor verifícalos y vuelve
            a intentarlo.
          </DefaultText>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  title: {
    marginBottom: 16,
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
