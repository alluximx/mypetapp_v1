import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {ErrorMessage} from '../../../components/error-message';
import {AuthContext} from '../../../context/AuthContext';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CloseButton from '../../../components/buttons/close-button';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';

export default ({navigation, error}): React.ReactElement => {
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  // const emailRef = useRef<any>(null);
  // const passwordRef = useRef<Input>(null);
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
      email: data.email,
      password: data.password,
    };

    setErrors({
      emailError: authenticateParams.email === '',
      passwordError: authenticateParams.password === '',
    });

    if (!errors.emailError && !errors.passwordError) {
      // let response = await signIn(authenticateParams);
      // if (!response) {
      //   showAlert();
      // }
      // return response;
      console.log('success');
    }
    return false;
  };

  /**************
   * Navigation *
   **************/

  const onSignUpTextPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const onForgotPasswordTextPress = (): void => {
    navigation &&
      navigation.navigate('ForgotPassword', {isSettingPassword: false});
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
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
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
