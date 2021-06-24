import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CloseButton from '../../../components/buttons/close-button';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
// Global styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Context
import {AuthContext, AuthContextType} from '../../../context/AuthContext';
// Types
import {SignInErrors, SignInFormFields} from '../../../types/auth/sign-in';

export default ({navigation}): React.ReactElement => {
  // Default values for form fields.
  const defaultValues = {email: '', password: ''};
  // Default values for errors.
  const defaultErrors = {password: '', non_field_errors: '', detail: ''};

  const authContext = useContext<AuthContextType>(AuthContext);
  const [form, setForm] = useState<SignInFormFields>(defaultValues);
  const [errors, setErrors] = useState<SignInErrors>(defaultErrors);
  const [loading, setLoading] = useState<boolean>(false);

  // Has filled every field of the form...
  const formCompleted: boolean = form.email !== '' && form.password !== '';
  // Are there any errors...
  const hasErrors: boolean =
    errors.password !== '' ||
    errors.non_field_errors !== '' ||
    errors.detail !== '';

  /**************
   *** Events ***
   **************/
  const onChangeInputText = ({name, value}): void =>
    setForm({...form, [name]: value});

  const onSignUpTextPress = (): void =>
    navigation && navigation.navigate('SignUp');

  const onSignInButtonPress = async (): Promise<void> => {
    // Show spinner.
    setLoading(true);
    // Clear errors.
    setErrors(defaultErrors);

    // If the form is filled...
    if (formCompleted) {
      const response = await authContext.signIn({
        username: form.email,
        password: form.password,
      });

      // If there are no errors...
      if (response.status) {
        navigation && navigation.navigate('Home');
      } else {
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
          <CloseButton navigation={navigation} />
          <TitleHeader>Inicia Sesión</TitleHeader>
          <View style={styles.form}>
            <UserInput
              placeholder="Correo"
              value={form.email}
              onChangeText={(value: string) => {
                onChangeInputText({name: 'email', value});
              }}
              error={errors.non_field_errors}
            />
            <UserInput
              placeholder="Contraseña"
              value={form.password}
              onChangeText={(value: string) => {
                onChangeInputText({name: 'password', value});
              }}
              error={errors.password !== '' || errors.non_field_errors}
              isPassword={true}
            />
            {hasErrors &&
              // Map errors...
              Object.entries(errors).map(([, value]) => {
                return (
                  value !== '' && (
                    <Text style={styles.errorMessage}>{value}</Text>
                  )
                );
              })}
            <CustomButton
              style={styles.signInButton}
              appearance="control"
              onPress={onSignInButtonPress}
              isDisabled={formCompleted}
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
