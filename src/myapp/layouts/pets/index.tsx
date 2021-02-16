import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from '../auth/sign-up/extra/profile-avatar.component';
import {EyeOffIcon, PlusIcon} from '../auth/sign-up/extra/icons';
import {EyeIcon, PersonIcon} from '../auth/sign-in/extra/icons';
import {EmailIcon} from '../auth/forgot-password/extra/icons';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onAddButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onBackButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfileAvatar
          style={styles.profileAvatar}
          resizeMode="center"
          editButton={renderEditAvatarButton}
          source={require('../home/assets/image-pet-1.jpg')}
        />
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="Nombre"
          icon={PersonIcon}
          value={userName}
          onChangeText={setUserName}
        />
      </Layout>
      <Button
        style={styles.signUpButton}
        size="giant"
        onPress={onAddButtonPress}>
        AGREGAR
      </Button>
      <Button
        style={styles.signInButton}
        appearance="ghost"
        status="basic"
        onPress={onBackButtonPress}>
        ¿No necesitas agregar una mascota?
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'color-primary-default',
    tintColor: 'color-primary-default',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
