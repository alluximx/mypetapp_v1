import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from '../../auth/sign-up/extra/profile-avatar.component';
import {PlusIcon} from '../../auth/sign-up/extra/icons';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [date, setDate] = React.useState(new Date());
  const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return {date, onSelect: setDate};
  };
  const styles = useStyleSheet(themedStyles);
  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;

  const filterPickerState = useDatepickerState();

  const onAddButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onBackButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Layout style={styles.formContainer} level="1">
        <Datepicker
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
          placeholder="Fecha de Visita"
          filter={filter}
          {...filterPickerState}
        />
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="Motivo"
          value={userName}
          onChangeText={setUserName}
        />
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Input
          multiline={true}
          autoCapitalize="none"
          placeholder="Notas"
          value={userName}
          maxLength={500}
          onChangeText={setUserName}
          textStyle={{minHeight: 104}}
          style={{float: 'left', minHeight: 300}}
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
    width: 220,
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
