import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {StyleService} from '@ui-kitten/components';
// My components
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import PaymentMethodForm from '../../../components/forms/payment-method-form';
import TitleHeader from '../../../components/texts/title-header';
// Hooks
import useGetPaymentMethods from '../../../hooks/payment-method/useGetPaymentMethods';
import useSavePaymentMethod from '../../../hooks/payment-method/useSavePaymentMethod';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// Global Styles
import globalColors from '../../../styles/colors';
// Types
import {ErrorResponse} from '../../../types/models';

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
  const paymentQuery = useGetPaymentMethods();

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
        <PaymentMethodForm
          errors={errors}
          form={form}
          hasError={hasError}
          setForm={setForm}
        />
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
