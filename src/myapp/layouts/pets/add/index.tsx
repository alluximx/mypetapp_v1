import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  IndexPath,
} from '@ui-kitten/components';
import {ProfileAvatar} from '../../auth/sign-up/extra/profile-avatar.component';
import {PlusIcon} from '../../auth/sign-up/extra/icons';
// My Components
import DefaultLayout from '../../../components/default-layout';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return {date, onSelect: setDate};
  };
  const styles = useStyleSheet(themedStyles);
  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const [date, setDate] = React.useState(new Date());
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

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
  const data = ['Antirrabica', 'Tetanos', 'Parvovirus'];

  const displayValue = data[selectedIndex.row];
  const filterPickerState = useDatepickerState();

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode="center"
            editButton={renderEditAvatarButton}
            source={require('../../home/assets/image-pet-1.jpg')}
          />
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="Nombre"
            value={userName}
            onChangeText={setUserName}
          />
        </Layout>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="Raza"
            value={userName}
            onChangeText={setUserName}
          />
        </Layout>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="Sexo"
            value={userName}
            onChangeText={setUserName}
          />
        </Layout>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="Edad"
            value={userName}
            onChangeText={setUserName}
          />
        </Layout>
        <Layout style={styles.formContainer} level="1">
          <Datepicker
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            placeholder="Fecha de nacimiento"
            filter={filter}
            {...filterPickerState}
          />
        </Layout>
        <Layout style={styles.formContainer} level="1">
          <Button
            style={styles.signUpButton}
            size="medium"
            onPress={onAddButtonPress}>
            AGREGAR
          </Button>
        </Layout>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="basic"
          onPress={onBackButtonPress}>
          ¿No necesitas agregar una mascota?
        </Button>
      </KeyboardAvoidingView>
    </DefaultLayout>
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
