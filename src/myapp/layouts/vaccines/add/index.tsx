import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
// Constants.
import {reminderOptions} from '../../../constants';
// Hooks.
import useSaveVaccine from '../../../hooks/vaccines/useSaveVaccine';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// My Components.
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';
import VisitsImgCard from '../../../components/cards/image-input-card';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    user_pet: route.params.petId,
    vaccine_registered: '',
    vaccine_date: '',
    next_vaccine_date: '',
    reminder: null,
  });
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [reminderKey, setReminderKey] = useState('1');
  const [etiquetteImage, setEtiquetteImage] = useState(null);

  const vaccinesQuery = useGetVaccines();
  const saveVaccineQuery = useSaveVaccine();
  const vaccinesData = vaccinesQuery.isLoading
    ? []
    : vaccinesQuery.data?.data.map((vaccine) => {
        return {value: vaccine.id, label: vaccine.vaccine_name};
      });

  const isDisabled =
    form.vaccine_registered === '' ||
    form.vaccine_date === '' ||
    form.next_vaccine_date === '' ||
    isLoading;

  const onSelectReminder = (reminderKey: string) => {
    if (form.next_vaccine_date === '') {
      setForm({...form, reminder: null});
    } else {
      const reminderOption = reminderOptions.find(
        (option) => option.key == reminderKey,
      );

      const dateToRemind = moment(form.next_vaccine_date)
        .subtract(reminderOption.delay.amount, reminderOption.delay.unit)
        .format('YYYY-MM-DD 09:00:00');

      setForm({...form, reminder: dateToRemind});
    }

    setReminderKey(reminderKey);
  };

  const onSavePress = () => saveVaccineQuery.mutate(form);

  /***************
   *** EFFECTS ***
   ****************/

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
  });

  useEffect(() => {
    if (!isReminderActive) {
      setForm({...form, reminder: null});
    } else {
      onSelectReminder(reminderKey);
    }
  }, [isReminderActive, form.next_vaccine_date]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Nueva Vacuna</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccine_registered}
        data={vaccinesData}
        placeholder="Tipo de vacuna"
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
        onSelect={(next_vaccine_date) => setForm({...form, next_vaccine_date})}
        placeholder="Fecha de expiración"
        minDate={new Date(form.vaccine_date)}
      />
      <VisitsImgCard
        label={'Etiqueta'}
        image={etiquetteImage}
        setImage={setEtiquetteImage}
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
