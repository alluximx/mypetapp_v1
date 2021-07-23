import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// Constants.
import {vaccineTypes} from '../../../constants';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    vaccineType: '',
    applicationDate: '',
    expirationDate: '',
    ettiquete: '',
    reminder: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText
          style={styles.headerRight}
          isDisabled={isLoading}
          onPress={() => {
            setIsLoading(true);
            console.log('Saving...');
          }}>
          Guardar
        </AnchorText>
      ),
    });
  }, [navigation, form, isLoading]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Nueva Vacuna</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccineType}
        data={vaccineTypes.map((option) => {
          return {value: option.key, label: option.value};
        })}
        placeholder="Tipo de vacuna"
        setCurrentValue={(vaccineType) => {
          setForm({...form, vaccineType});
        }}
      />
      <DatepickerInput
        currentValue={form.applicationDate}
        onSelect={(applicationDate) => {
          setForm({...form, applicationDate});
        }}
        placeholder="Fecha de aplicación"
      />
      <DatepickerInput
        currentValue={form.expirationDate}
        onSelect={(expirationDate) => {
          setForm({...form, expirationDate});
        }}
        placeholder="Fecha de expiración"
      />
      <ReminderInput
        isActive={isActive}
        setIsActive={setIsActive}
        setValue={(reminder) => {
          setForm({...form, reminder});
        }}
        value={form.reminder}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
});
