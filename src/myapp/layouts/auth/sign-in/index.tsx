import React, {useContext, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {ErrorMessage} from '../../../components/error-message';
import {AuthContext} from '../../../context/AuthContext';
import AwesomeAlert from 'react-native-awesome-alerts';

export default ({navigation, error}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const styles = useStyleSheet(themedStyles);
  const passwordRef = useRef<Input>(null);
  const {signIn} = useContext(AuthContext);

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
    const authenticateParams = {
      email: email,
      password: password,
    };

    setEmailError(authenticateParams.email === '');

    setPasswordError(authenticateParams.password === '');

    if (authenticateParams.email !== '' || authenticateParams.password !== '') {
      let response = await signIn(authenticateParams);
      if (!response) {
        showAlert();
      }
      return response;
    }
    return false;
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  // const onLoginButtonPress = (): void => {
  //   navigation && navigation.navigate('Home');
  // };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          MyPetApp
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Inicia sesión en tu cuenta
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Correo"
          icon={PersonIcon}
          value={email}
          onChangeText={(nextValue) => {
            setEmailError(false);
            setEmail(nextValue);
          }}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Contraseña"
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={(nextValue) => {
            setPasswordError(false);
            setPassword(nextValue);
          }}
          onSubmitEditing={login}
          onIconPress={onPasswordIconPress}
          ref={passwordRef}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}>
            ¿Olvidaste tu contraseña?
          </Button>
        </View>
      </Layout>

      <Button onPress={login} style={styles.signInButton} size="giant">
        INICIA SESIÓN
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}>
        ¿Aún no tienes una cuenta? Regístrate
      </Button>
      <AwesomeAlert
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
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
