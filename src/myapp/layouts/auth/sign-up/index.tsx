import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Input,
  Layout,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import DefaultLayout from '../../../components/default-layout';
import CloseButton from '../../../components/buttons/close-button';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  // const renderEditAvatarButton = (): React.ReactElement => (
  //   // <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  // );

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
              <Input
                autoCapitalize="none"
                placeholder="Nombre"
                value={userName}
                onChangeText={setUserName}
              />
              <Input
                style={styles.emailInput}
                autoCapitalize="none"
                placeholder="Correo"
                // icon={EmailIcon}
                value={email}
                onChangeText={setEmail}
              />
              <Input
                style={styles.passwordInput}
                autoCapitalize="none"
                secureTextEntry={!passwordVisible}
                placeholder="Contraseña"
                // icon={passwordVisible ? EyeIcon : EyeOffIcon}
                value={password}
                onChangeText={setPassword}
                // onIconPress={onPasswordIconPress}
              />
            </View>

            <Button
              style={styles.signUpButton}
              size="giant"
              onPress={onSignUpButtonPress}>
              REGÍSTRARME
            </Button>
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

const themedStyles = StyleService.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    paddingTop: 24,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
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
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
