import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {List, StyleService} from '@ui-kitten/components';
// My components
import TitleHeader from '../../../components/texts/title-header';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import UserInput from '../../../components/inputs/user-input';
import ReminderInput from '../../../components/inputs/reminder-input';
// Hooks
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// Global Styles
import globalColors from '../../../styles/colors';

export default ({navigation, route}): React.ReactElement => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    number: '',
    expiration_date: '',
    cvv: '',
    is_saved: false,
  });

  const changeValue = () => {
    setIsReminderActive(!isReminderActive);
    setForm({...form, is_saved: !isReminderActive});
  };

  useEffect(() => {
    !isReminderActive && setForm({...form, is_saved: isReminderActive});
  }, [isReminderActive]);

  useEffect(() => {
    paymentMethods.length > 2 && setIsDisable(true);
  }, [paymentMethods.length]);

  const onSavePress = () => {
    // Aqui hay que guardar
  };

  const isDisabled =
    form.name === '' ||
    form.number === '' ||
    form.expiration_date === '' ||
    form.cvv === '' ||
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
          <DefaultText style={styles.subtitle}>Aqui va una lista</DefaultText>
        ) : (
          <DefaultText style={styles.subtitle}>
            No hay métodos de pago guardados
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
          onChangeText={(value: string) => {
            setForm({...form, number: value});
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
            value={form.cvv}
            isNumeric={true}
            maxLength={3}
            onChangeText={(value: string) => {
              setForm({...form, cvv: value});
            }}
            style={styles.UserInputContainer}
          />
        </View>
        <ReminderInput
          isActive={isReminderActive}
          setIsActive={changeValue}
          setValue={null}
          value={null}
          text={'Guardar método de pago'}
          isDisable={isDisable}
          isNotReminder={true}
        />
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
    alignItems: 'stretch',
  },
  UserInputContainer: {
    flexBasis: 185,
    height: 60,
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    marginBottom: 16,
  },
  datePickerContainer: {
    height: 62,
    minWidth: 190,
  },
  arrowIconStyle: {
    top: -7,
    right: 0,
    left: -29,
  },
});
