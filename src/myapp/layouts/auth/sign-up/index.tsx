import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  Text,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  PlusIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import DefaultLayout from '../../../components/default-layout';
import CloseButton from '../../../components/buttons/close-button';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

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
              <Text category="h2">Regístrate ahora</Text>
              <Text category="s1">
                Regístrate para tener acceso a todas las funciones y poder darle
                el mejor cuidado a tu mascota.
              </Text>
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
            <Button
              style={styles.signInButton}
              appearance="ghost"
              status="basic"
              onPress={onSignInButtonPress}>
              ¿Ya tienes una cuenta? Inicia Sesión
            </Button>
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
    paddingTop: 32,
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
  termsCheckBoxText: {
    color: 'text-hint-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
