import React, {useContext, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Input, StyleService, useStyleSheet} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {ErrorMessage} from '../../../components/error-message';
import {AuthContext} from '../../../context/AuthContext';
// import AwesomeAlert from 'react-native-awesome-alerts';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CloseButton from '../../../components/buttons/close-button';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';

export default ({navigation, error}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [alert, setAlert] = React.useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const styles = useStyleSheet(themedStyles);
  const passwordRef = useRef<Input>(null);
  // const {signIn} = useContext(AuthContext);

  const showAlert = () => {
    setAlert(true);
  };

  const hideAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const login = async () => {
    navigation && navigation.navigate('Home');

    const authenticateParams = {
      email: email,
      password: password,
    };

    // setEmailError(authenticateParams.email === '');

    // setPasswordError(authenticateParams.password === '');

    // if (authenticateParams.email !== '' || authenticateParams.password !== '') {
    //   let response = await signIn(authenticateParams);
    //   if (!response) {
    //     showAlert();
    //   }
    //   return response;
    // }
    return false;
  };

  const onSignUpTextPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const onForgotPasswordTextPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <View>
          <CloseButton navigation={navigation} />
          <TitleHeader>Inicia Sesión</TitleHeader>
          <View style={styles.form}>
            <UserInput placeholder="Correo" />
            <UserInput placeholder="Contraseña" isPassword={true} />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <CustomButton
              style={styles.signInButton}
              appearance="control"
              onPress={onSignInButtonPress}
              isDisabled={true}>
              Iniciar Sesión
            </CustomButton>
          </View>
          <AnchorText
            style={styles.forgotPasswordLink}
            onPress={onForgotPasswordTextPress}>
            ¿Olvidaste tu contraseña?
          </AnchorText>
          <View style={styles.signUpTextContainer}>
            <DefaultText>¿Aún no tienes cuenta?</DefaultText>
            <AnchorText style={styles.signUpLink} onPress={onSignUpTextPress}>
              Regístrate
            </AnchorText>
          </View>
        </View>

        {/* <AwesomeAlert
        show={alert}
        showProgress={false}
        label="Iniciar Sesión"
        message="Contraseña o usuario incorrecto, revisa que hayas ingresado tus datos correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert();
        }}
      /> */}
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  form: {
    marginTop: 16,
  },
  signInButton: {
    marginTop: 40,
  },
  forgotPasswordLink: {
    marginTop: 32,
    textAlign: 'center',
  },
  signUpTextContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLink: {marginLeft: 5},
});
