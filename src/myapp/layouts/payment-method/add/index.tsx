import React, {useState, useEffect} from 'react';
import {List, StyleService} from '@ui-kitten/components';
// My components
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
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

  const {screenToReturn, screenFrom} = route.params ?? {};

  const [form, setForm] = useState({
    name: '',
    number: '',
    expiration_date: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
    screenToReturn: '',
    screenFrom: '',
  });

  useEffect(() => {
    if (paymentQuery.data) {
      setPaymentMethods(paymentQuery.data.data);
    }
  }, [paymentQuery.data]);

  useEffect(() => {
    const screen = screenToReturn ?? 'PaymentSummary';
    setForm({...form, screenToReturn: screen, screenFrom: screenFrom});
  }, [screenToReturn, screenFrom]);

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

  /************************
   *** Render functions ***
   ************************/

  const renderPaymentMethod = ({item}) => {
    const cardBrand = item.brand;
    const cardId = item.id;
    const cardLabel = '****' + item.last4;

    const auxData = {cardBrand, cardId, cardLabel};

    return (
      <NavigateButton
        data={{paymentMethod: auxData, screenFrom: screenFrom}}
        destination={screenToReturn ?? 'PaymentSummary'}
        subtitle={cardLabel}
        title={cardBrand}
      />
    );
  };

  const renderHeader = (
    <TitleHeader style={styles.subtitle}>Métodos de pago guardados</TitleHeader>
  );

  const renderEmpty = (
    <DefaultText style={styles.subtitle}>
      No hay métodos de pago guardados
    </DefaultText>
  );

  const renderFooter = (
    <>
      {paymentMethods.length > 2 && (
        <DefaultText style={styles.message}>
          Solo puedes guardar 3 métodos de pago
        </DefaultText>
      )}

      <TitleHeader style={styles.subtitle}>Nuevo método de pago</TitleHeader>

      <PaymentMethodForm
        errors={errors}
        form={form}
        hasError={hasError}
        setForm={setForm}
      />
    </>
  );

  return paymentQuery.isLoading || isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader>Método de pago</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={paymentMethods}
        ListHeaderComponent={renderHeader}
        renderItem={renderPaymentMethod}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
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
