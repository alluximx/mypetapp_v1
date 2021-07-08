import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
import CustomModal from '../../../components/modals/custom-modal';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Context
import {AuthContext} from '../../../context/AuthContext';
// Types
import {
  SignUpErrors,
  SignUpFormFields,
} from '../../../types/screens/auth/sign-up';

// Default values for form fields.
const defaultValues = {
  username: '',
  name: '',
  password: '',
};
// Default values for errors.
const defaultErrors = {
  username: '',
  name: '',
  password: '',
};

export default ({navigation}): React.ReactElement => {
  // Context.
  const authContext = useContext(AuthContext);
  // Form fields...
  const [form, setForm] = useState<SignUpFormFields>(defaultValues);
  const [errors, setErrors] = useState<SignUpErrors>(defaultErrors);
  // Modal and spinner.
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // If there is no empty field...
  const hasCompletedForm =
    form.username !== '' && form.name !== '' && form.password !== '';
  // Are there any errors...
  const hasErrors = errors.password !== '' || errors.username !== '';
  // Conditional styles.
  const buttonMargin = hasErrors ? {marginTop: 10} : {marginTop: 56};

  /*****************
   * Event Methods *
   *****************/

  const onSignUpButtonPress = async (): Promise<void> => {
    // Show spinner
    setLoading(true);
    // Clear errors
    setErrors(defaultErrors);

    if (hasCompletedForm) {
      const newForm = {
        ...form,
        email: form.username,
      };
      const response = await authContext.signUp(newForm);

      if (response.status) {
        setIsModalVisible(true);
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

  const onChange = ({name, value}): void => setForm({...form, [name]: value});

  const onSignInTextPress = (): void =>
    navigation && navigation.navigate('SignIn');

  const onTermsTextPress = (): void =>
    navigation && navigation.navigate('Terms');

  const onModalAccept = (): void => {
    setIsModalVisible(false);
    navigation && navigation.navigate('SignIn');
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <CustomModal
          visible={isModalVisible}
          title="Registro Exitoso"
          text="Se ha enviado un correo de confirmación a la dirección que indicaste en tu registro."
          onAccept={onModalAccept}
          onCancel={null}
          showCancel={false}
          labelAccept="Entendido"
        />
        <View style={styles.container}>
          <View>
            <View>
              <TitleHeader>Regístrate ahora</TitleHeader>
              <DefaultText>
                Regístrate para tener acceso a todas las funciones y poder darle
                el mejor cuidado a tu mascota.
              </DefaultText>
            </View>
            <View style={styles.formContainer}>
              <UserInput
                autoCapitalize={true}
                onChangeText={(value: string) => {
                  onChange({name: 'name', value});
                }}
                placeholder="Nombre"
                value={form.name}
              />
              <UserInput
                error={errors.username}
                onChangeText={(value: string) => {
                  onChange({name: 'username', value});
                }}
                placeholder="Correo"
                value={form.username}
              />
              <UserInput
                error={errors.password}
                isPassword={true}
                onChangeText={(value: string) => {
                  onChange({name: 'password', value});
                }}
                placeholder="Contraseña"
                value={form.password}
              />
              {hasErrors &&
                // Map errors...
                Object.entries(errors).map(([_, value], idx) => {
                  return (
                    value !== '' && (
                      <Text key={idx} style={styles.errorMessage}>
                        {value}
                      </Text>
                    )
                  );
                })}
            </View>
            <CustomButton
              style={buttonMargin}
              onPress={onSignUpButtonPress}
              isDisabled={!hasCompletedForm}
              isLoading={loading}>
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
              Al registrarte confirmas que leíste y aceptas los{' '}
              <AnchorText style={styles.link} onPress={onTermsTextPress}>
                Términos y Condiciones
              </AnchorText>
            </DefaultText>
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
  errorMessage: {
    color: globalColors.red,
    fontFamily: globalVars.fontRegular,
  },
});
