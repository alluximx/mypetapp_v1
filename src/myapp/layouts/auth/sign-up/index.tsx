import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import DefaultLayout from '../../../components/default-layout';
import CloseButton from '../../../components/buttons/close-button';
import CustomButton from '../../../components/buttons/custom-button';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import AnchorText from '../../../components/texts/anchor-text';
import UserInput from '../../../components/inputs/user-input';
// Global Styles
import globalColors from '../../../styles/colors';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInTextPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onTermsTextPress = (): void => {
    navigation && navigation.navigate('Terms');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View>
            <CloseButton navigation={navigation} />
            <View>
              <TitleHeader>Regístrate ahora</TitleHeader>
              <DefaultText>
                Regístrate para tener acceso a todas las funciones y poder darle
                el mejor cuidado a tu mascota.
              </DefaultText>
            </View>
            <View style={styles.formContainer}>
              <UserInput placeholder="Nombre" />
              <UserInput placeholder="Correo" />
              <UserInput placeholder="Contraseña" isPassword={true} />
            </View>
            <CustomButton
              style={styles.signUpButton}
              appearance="control"
              onPress={onSignUpButtonPress}>
              Registrarme
            </CustomButton>
            <View style={styles.mixedTextContainer}>
              <DefaultText style={styles.defaultText}>
                Si ya tienes cuenta
              </DefaultText>
              <AnchorText style={styles.link} onPress={onSignInTextPress}>
                Inicia Sesión
              </AnchorText>
            </View>
          </View>
          <View style={styles.mixedTextContainer}>
            <DefaultText style={styles.defaultText}>
              Al registrarte confirmas que leíste y aceptas los
            </DefaultText>
            <AnchorText style={styles.link} onPress={onTermsTextPress}>
              Términos y Condiciones
            </AnchorText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    paddingTop: 24,
  },
  signUpButton: {
    marginTop: 56,
  },
  mixedTextContainer: {
    marginVertical: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  defaultText: {
    textAlign: 'center',
  },
  link: {
    paddingLeft: 5,
  },
});
