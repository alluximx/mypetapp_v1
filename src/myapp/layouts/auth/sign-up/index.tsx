import React from 'react';
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
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';

export default ({navigation}): React.ReactElement => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const formCompleted =
    form.name !== '' && form.email !== '' && form.password !== '';

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSignUpButtonPress = (): void => {
    console.log(formCompleted);

    // Move forward
    if (formCompleted) {
      navigation && navigation.goBack();
    } else {
      setErrors({
        name: form.name === '' && 'El campo Nombre es requerido',
        email: form.name === '' && 'El campo Correo es requerido',
        password: form.name === '' && 'El campo Contraseña es requerido',
      });
    }
  };

  const onSignInTextPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onTermsTextPress = (): void => {
    navigation && navigation.navigate('Terms');
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
              <UserInput
                placeholder="Nombre"
                value={form.name}
                onChangeText={(value: string) => {
                  onChange({name: 'name', value});
                }}
                error={errors.name}
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
                value={form.password}
                onChangeText={(value: string) => {
                  onChange({name: 'password', value});
                }}
                error={errors.password}
              />
              {/* <Text style={styles.errorMessage}>{errors.name}</Text> */}
            </View>
            <CustomButton
              style={styles.signUpButton}
              appearance="control"
              onPress={onSignUpButtonPress}
              isDisabled={formCompleted}>
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
  errorMessage: {
    color: globalColors.red,
    fontFamily: globalVars.fontRegular,
  },
});
