import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
// Hooks.
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import useSaveVaccine from '../../../hooks/vaccines/useSaveVaccine';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useVaccineReminder from '../../../hooks/inputs/useVaccineReminder';
// Models.
import {Vaccine} from '../../../types/models';
// My Components.
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    user_pet: route.params.petId,
    vaccine_registered: '',
    vaccine_date: '',
    next_vaccine_date: '',
    reminder: null,
    is_vaccine: false,
  });

  const [
    isReminderActive,
    setIsReminderActive,
    reminderKey,
    onSelectReminder,
  ] = useVaccineReminder(form, setForm);

  const saveDewormingQuery = useSaveVaccine();
  const vaccinesQuery = useGetVaccines(false);

  const vaccinesData = vaccinesQuery.isLoading
    ? []
    : vaccinesQuery.data?.data.map((vaccine: Vaccine) => {
        return {value: vaccine.id, label: vaccine.vaccine_name};
      });

  const isDisabled =
    form.vaccine_registered === '' ||
    form.vaccine_date === '' ||
    form.next_vaccine_date === '' ||
    isLoading;

  const onSavePress = () => saveDewormingQuery.mutate(form);

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: form,
  });

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Nueva Desparasitación</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccine_registered}
        data={vaccinesData}
        placeholder="Tipo de desparasitación"
        setCurrentValue={(vaccine_registered) =>
          setForm({...form, vaccine_registered})
        }
      />
      <DatepickerInput
        currentValue={form.vaccine_date}
        onSelect={(vaccine_date) => setForm({...form, vaccine_date})}
        placeholder="Fecha de aplicación"
        minDate={new Date()}
      />
      <DatepickerInput
        currentValue={form.next_vaccine_date}
        disabled={form.vaccine_date === '' ? true : false}
        minDate={new Date(form.vaccine_date)}
        onSelect={(next_vaccine_date) => setForm({...form, next_vaccine_date})}
        placeholder="Fecha de expiración"
      />
      <ReminderInput
        isActive={isReminderActive}
        setIsActive={setIsReminderActive}
        setValue={onSelectReminder}
        value={reminderKey}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
});
