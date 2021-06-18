import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {ErrorMessage} from '../../../components/error-message';
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
import {AuthContext} from '../../../context/AuthContext';

interface SignInFormFields {
  username: string;
  email: string;
  password: string;
}

export default ({navigation, error}): React.ReactElement => {
  // Context
  const authContext = useContext(AuthContext);
  // Default values for form fields.
  const defaultValues = {
    username: '',
    email: '',
    password: '',
    non_field_errors: '',
  };

  // Form fields...
  const [form, setForm] = useState<SignInFormFields>(defaultValues);
  const [errors, setErrors] = useState<SignInFormFields>({
    username: '',
    email: '',
    password: '',
    non_field_errors: '',
  });

  const [loading, setLoading] = useState(false);
  // Has filled every field...
  const formCompleted = form.email !== '' && form.password !== '';
  // Are there any errors...
  const hasErrors =
    errors.email !== '' ||
    errors.password !== '' ||
    errors.non_field_errors !== '';

  /*****************
   * Event Methods *
   *****************/

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSignUpTextPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onSignInButtonPress = async (): Promise<void> => {
    // Show spinner
    setLoading(true);
    // Clear errors
    setErrors(defaultValues);

    if (formCompleted) {
      const response = await authContext.signIn(form);

      if (response.status) {
        navigation && navigation.navigate('Home');
      } else {
        setErrors({
          ...defaultValues,
          ...response.data,
        });
      }
    }

    // Hide spinner
    setLoading(false);
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
            <UserInput
              placeholder="Correo"
              value={form.email}
              onChangeText={(value: string) => {
                // onChange({name: 'email', value});
                setForm({...form, email: value, username: value});
              }}
              error={errors.email}
            />
            <UserInput
              placeholder="Contraseña"
              value={form.password}
              onChangeText={(value: string) => {
                onChange({name: 'password', value});
              }}
              error={errors.password}
              isPassword={true}
            />
            {hasErrors &&
              // Map errors...
              Object.entries(errors).map(([key, value]) => {
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
