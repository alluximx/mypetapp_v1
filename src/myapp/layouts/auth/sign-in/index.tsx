import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
// Global styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Context
import {AuthContext, AuthContextType} from '../../../context/AuthContext';
// Types
import {
  SignInErrors,
  SignInFormFields,
} from '../../../types/screens/auth/sign-in';
// To reset Navigate
import {CommonActions} from '@react-navigation/native';

// Default values for form fields.
const defaultValues = {username: '', password: ''};
// Default values for errors.
const defaultErrors = {non_field_errors: ''};

export default ({navigation}): React.ReactElement => {
  // To reset navigate
  useEffect(() => {
    navigation.dispatch(insertBeforeLast('Start'));
  }, []);

  const insertBeforeLast = (routeName) => (state) => {
    const exists = state.routes.find((obj) => obj.name === 'Start');
    let routes = [];
    if (!exists) {
      routes = [
        ...state.routes.slice(0, -1),
        {name: routeName},
        state.routes[state.routes.length - 1],
      ];
    } else {
      routes = state.routes;
    }
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  };

  const authContext = useContext<AuthContextType>(AuthContext);
  const [form, setForm] = useState<SignInFormFields>(defaultValues);
  const [errors, setErrors] = useState<SignInErrors>(defaultErrors);
  const [loading, setLoading] = useState(false);
  // Are there empty fields...
  const hasCompletedForm = form.username !== '' && form.password !== '';
  // Are there any errors...
  const hasErrors = errors.non_field_errors !== '';

  /**************
   *** Events ***
   **************/

  const onChange = ({name, value}): void => setForm({...form, [name]: value});

  const onSignUpTextPress = (): void =>
    navigation && navigation.navigate('SignUp');

  const onSignInButtonPress = async (): Promise<void> => {
    // Show spinner.
    setLoading(true);
    // Clear errors.
    setErrors(defaultErrors);

    if (hasCompletedForm) {
      const response = await authContext.signIn(form);
      // If there are no errors...
      if (!response.status) {
        // Update errors.
        setErrors({...defaultErrors, ...response.data});
      }
    }

    // Hide spinner.
    setLoading(false);
  };

  const onForgotPasswordTextPress = (): void =>
    navigation &&
    navigation.navigate('ForgotPassword', {isSettingPassword: false});

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <View>
          <TitleHeader>Inicia Sesión</TitleHeader>
          <View style={styles.form}>
            <UserInput
              error={errors.non_field_errors}
              onChangeText={(value: string) => {
                onChange({name: 'username', value});
              }}
              placeholder="Correo"
              value={form.username}
            />
            <UserInput
              error={errors.non_field_errors}
              isPassword={true}
              onChangeText={(value: string) => {
                onChange({name: 'password', value});
              }}
              placeholder="Contraseña"
              value={form.password}
            />
            {hasErrors &&
              // Map errors...
              Object.entries(errors).map(([, value], index) => {
                return (
                  value !== '' && (
                    <Text key={index} style={styles.errorMessage}>
                      {value}
                    </Text>
                  )
                );
              })}
            <CustomButton
              style={styles.signInButton}
              onPress={onSignInButtonPress}
              isDisabled={!hasCompletedForm}
              isLoading={loading}>
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
  errorMessage: {
    color: globalColors.red,
    fontFamily: globalVars.fontRegular,
  },
});
