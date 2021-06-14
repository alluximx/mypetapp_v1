import React from 'react';
import {View} from 'react-native';
import {StyleService, Button, Input, Text, Layout} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import BackButton from '../../../components/buttons/back-button';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';

export default ({navigation}): React.ReactElement => {
  const onResetPasswordButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <BackButton navigation={navigation} />
        <View>
          <TitleHeader>Recuperar Contraseña</TitleHeader>
          <DefaultText style={styles.subtitle}>
            Ingresa el correo registrado en Dogit y te enviaremos instrucciones
            para recuperar tu contraseña.
          </DefaultText>
          <UserInput placeholder="Correo" />
        </View>
        <CustomButton
          style={styles.button}
          onPress={onResetPasswordButtonPress}>
          Enviar
        </CustomButton>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  subtitle: {
    marginBottom: 24,
  },
  button: {
    marginTop: 40,
  },
});
