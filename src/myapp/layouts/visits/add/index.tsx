import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

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
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Datepicker
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
          placeholder="Fecha de Visita"
          filter={filter}
          {...filterPickerState}
        />
        <Input
          autoCapitalize="none"
          placeholder="Motivo"
          value={userName}
          onChangeText={setUserName}
        />
        <Input
          multiline={true}
          autoCapitalize="none"
          placeholder="Notas"
          value={userName}
          maxLength={500}
          onChangeText={setUserName}
          textStyle={{minHeight: 104}}
          style={{minHeight: 300}}
        />
        <Button
          style={styles.signUpButton}
          size="medium"
          onPress={onAddButtonPress}>
          AGREGAR
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
