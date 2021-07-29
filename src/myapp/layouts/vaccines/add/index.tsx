import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
// Constants.
import {reminderOptions} from '../../../constants';
// Hooks.
import useSaveVaccine from '../../../hooks/vaccines/useSaveVaccine';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    user_pet: route.params.petId,
    vaccine_registered: '',
    vaccine_date: '',
    next_vaccine_date: '',
    reminderKey: '1',
    reminder: null,
  });

  const vaccinesQuery = useGetVaccines();
  const saveVaccineQuery = useSaveVaccine();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const isDisabled =
          form.vaccine_registered === '' ||
          form.vaccine_date === '' ||
          form.next_vaccine_date === '' ||
          isLoading;

        return (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isDisabled}
            onPress={() => {
              setIsLoading(true);
              saveVaccineQuery.mutate(form, {
                onSuccess: () => {
                  console.log('SAVED!!!');
                  navigation.navigate('VaccinesIndex');
                },
              });
            }}>
            Guardar
          </AnchorText>
        );
      },
    });
  }, [navigation, form, isLoading]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Nueva Vacuna</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccine_registered}
        data={
          vaccinesQuery.isLoading
            ? []
            : vaccinesQuery.data?.data.map((vaccine) => {
                return {value: vaccine.id, label: vaccine.vaccine_name};
              })
        }
        placeholder="Tipo de vacuna"
        setCurrentValue={(vaccine_registered) => {
          console.log(vaccine_registered);
          setForm({...form, vaccine_registered});
        }}
      />
      <DatepickerInput
        currentValue={form.vaccine_date}
        onSelect={(vaccine_date) => {
          setForm({...form, vaccine_date});
        }}
        placeholder="Fecha de aplicación"
      />
      <DatepickerInput
        currentValue={form.next_vaccine_date}
        onSelect={(next_vaccine_date) => {
          setForm({...form, next_vaccine_date});
        }}
        placeholder="Fecha de expiración"
      />
      <ReminderInput
        isActive={isActive}
        setIsActive={setIsActive}
        setValue={(reminderKey) => {
          const reminderOption = reminderOptions.find(
            (option) => option.key == reminderKey,
          );

          if (form.next_vaccine_date !== '') {
            const dateToRemind = moment(form.next_vaccine_date)
              .subtract(reminderOption.delay.amount, reminderOption.delay.unit)
              .format('YYYY-MM-DD');

            console.log(dateToRemind);
            // Aplicación única esta.
            // Abrir y descargar las imágenes.
            setForm({...form, reminder: dateToRemind});
          } else {
            setForm({...form, reminder: null});
          }

          setForm({...form, reminderKey});
        }}
        value={form.reminderKey}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
});
