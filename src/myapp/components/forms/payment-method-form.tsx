import React from 'react';
import {StyleSheet, View} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
// My Components
import UserInput from '../inputs/user-input';
import DefaultText from '../texts/default-text';
// Types
import {PaymentMethodFormProps} from '../../types/components/forms';

const PaymentMethodForm = (
  props: PaymentMethodFormProps,
): React.ReactElement => {
  return (
    <>
      <UserInput
        placeholder="Nombre del tarjetahabiente"
        value={props.form.name}
        onChangeText={(value: string) => {
          props.setForm({...props.form, name: value});
        }}
      />
      <UserInput
        error={props.errors?.card?.number}
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

          props.setForm({...props.form, number: result});
        }}
        placeholder="Número de tarjeta"
        value={props.form.number}
      />

      <View style={styles.horizontalContainer}>
        <UserInput
          error={props.errors?.card?.exp_month || props.errors?.card?.exp_year}
          isNumeric={true}
          maxLength={5}
          onChangeText={(value: string) => {
            let result = value.replace('/', '');

            if (result.length > 2) {
              result = [result.slice(0, 2), '/', result.slice(2)].join('');
            }

            const exp_month = result.substring(0, 2);
            const exp_year = result.substring(3, 5);

            props.setForm({
              ...props.form,
              expiration_date: result,
              exp_month,
              exp_year,
            });
          }}
          placeholder="Expiración"
          style={styles.userInputContainer}
          value={props.form.expiration_date}
        />
        <UserInput
          error={props.errors?.card?.cvc}
          isNumeric={true}
          maxLength={4}
          onChangeText={(value: string) => {
            props.setForm({...props.form, cvc: value});
          }}
          placeholder="CVV "
          style={styles.userInputContainer}
          value={props.form.cvc}
        />
      </View>
      {props.hasError && (
        <DefaultText style={styles.message}>
          Los datos ingresados son incorrectos. Por favor verifícalos y vuelve a
          intentarlo.
        </DefaultText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  userInputContainer: {
    flexBasis: '48%',
    height: 60,
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    marginBottom: 16,
  },

  message: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: globalColors.red,
  },
});

export default PaymentMethodForm;
