import React from 'react';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import {
  IndexPath,
  Select,
  SelectGroup,
  SelectItem,
  Text,
  Datepicker,
  CheckBox,
  Toggle,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';

export default ({navigation}): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [date, setDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const useCheckboxState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return {checked, onChange: setChecked};
  };
  const primaryCheckboxState = useCheckboxState();

  const styles = useStyleSheet(themedStyles);

  const data = ['Antirrabica', 'Tetanos', 'Parvovirus'];
  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => <SelectItem title={title} />;

  const onAddButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Layout style={styles.formContainer}  level="1">
        <Select
          style={styles.select}
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Datepicker date={date} onSelect={(nextDate) => setDate(nextDate)} />
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Text category="h6">Fotografía de la etiqueta</Text>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Datepicker date={date} onSelect={(nextDate) => setDate(nextDate)} />
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
        <Toggle checked={checked} onChange={onCheckedChange}>
          {'Agregar recordatorio'}
        </Toggle>
        <Layout style={styles.formContainer} level="2">
          <CheckBox
            style={styles.checkbox}
            status="primary"
            {...primaryCheckboxState}>
            1 dia antes
          </CheckBox>
          <CheckBox
            style={styles.checkbox}
            status="primary"
            {...primaryCheckboxState}>
            1 semana antes
          </CheckBox>
          <CheckBox
            style={styles.checkbox}
            status="primary"
            {...primaryCheckboxState}>
            2 semanas antes
          </CheckBox>
        </Layout>
      </Layout>

    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  checkbox: {
    margin: 2,
  },
  select: {
    flex: 1,
    margin: 2,
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
