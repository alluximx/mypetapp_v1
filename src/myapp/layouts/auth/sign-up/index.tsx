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
import CustomModal from '../../../components/modals/custom-modal';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Context
import {AuthContext} from '../../../context/AuthContext';

interface SignUpFormFields {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default ({navigation}): React.ReactElement => {
  // Context
  const authContext = useContext(AuthContext);
  // Default values for form fields.
  const defaultValues = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  // Form fields...
  const [form, setForm] = useState<SignUpFormFields>(defaultValues);
  const [errors, setErrors] = useState<SignUpFormFields>(defaultValues);
  // Modal and spinner.
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasCompletedForm =
    form.username !== '' && form.email !== '' && form.password1 !== '';
  // Are there any errors...
  const hasErrors =
    errors.username !== '' ||
    errors.email !== '' ||
    errors.password1 !== '' ||
    errors.password2 !== '';

  // Conditional styles
  const buttonMargin = hasErrors ? {marginTop: 10} : {marginTop: 56};

  /*****************
   * Event Methods *
   *****************/

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSignUpButtonPress = async (): Promise<void> => {
    // Show spinner
    setLoading(true);
    // Clear errors
    setErrors(defaultValues);

    if (hasCompletedForm) {
      const response = await authContext.signUp(form);

      if (response.status) {
        setIsModalVisible(true);
      } else {
        setErrors({
          ...defaultValues,
          ...response.data,
        });
      }
    } else {
      setErrors({
        username: form.username === '' && 'El campo Nombre es requerido',
        email: form.email === '' && 'El campo Correo es requerido',
        password1: form.password1 === '' && 'El campo Contraseña es requerido',
        password2: '',
      });
    }

    // Hide spinner
    setLoading(false);
  };

  const onSignInTextPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onTermsTextPress = (): void => {
    navigation && navigation.navigate('Terms');
  };

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
                placeholder="Nombre"
                value={form.username}
                onChangeText={(value: string) => {
                  onChange({name: 'username', value});
                }}
                error={errors.username}
              />
              <UserInput
                placeholder="Correo"
                value={form.email}
                onChangeText={(value: string) => {
                  onChange({name: 'email', value});
                }}
                error={errors.email}
              />
              <UserInput
                placeholder="Contraseña"
                isPassword={true}
                value={form.password1}
                onChangeText={(value: string) => {
                  setForm({...form, password1: value, password2: value});
                }}
                error={errors.password1}
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
