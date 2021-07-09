import React, {useContext, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text} from 'react-native';
// Global Styles.
import globalStyles from '../../../../styles/style';
// My Components
import DefaultLayout from '../../../../components/default-layout';
import OptionSelect from '../../../../components/inputs/option-select';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';

const data = [
  {
    key: 'M',
    value: 'Macho',
  },
  {
    key: 'H',
    value: 'Hembra',
  },
];

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);

  useLayoutEffect(() => {
    const isDisabled = form.sex === '' || form.birthday === '';

    navigation.setOptions({
      headerRight: () => route.params.renderButtonNext(isDisabled, () => {}),
      headerLeft: () =>
        route.params.renderButtonBack(() => {
          navigation.goBack();
        }),
    });
  }, [navigation, form]);

  return (
    <DefaultLayout style={styles.container}>
      <KeyboardAvoidingView>
        <TitleHeader style={styles.bottomSpace}>
          ¿Qué sexo es{' '}
          <TitleHeader style={globalStyles.highlightedText}>
            {form.name}
          </TitleHeader>
          ?
        </TitleHeader>
        <OptionSelect
          currentValue={form.sex}
          setCurrentValue={(sex) => setForm({...form, sex})}
          horizontal={true}
          data={data}
        />
        <TitleHeader style={styles.bottomSpace}>
          ¿Cuándo cumple años?
        </TitleHeader>
        <UserInput
          placeholder="DD/MM/AAAA"
          value={form.birthday}
          onChangeText={(value: string) => {
            setForm({...form, birthday: value});
          }}
        />
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  bottomSpace: {
    marginBottom: 24,
  },
});
