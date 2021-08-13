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
    is_vaccine: true,
  });

  const [isReminderActive, setIsReminderActive] = useState(false);
  const [reminderKey, setReminderKey] = useState(1);
  const [etiquetteImage, setEtiquetteImage] = useState(null);
  const [isUnique, setIsUnique] = useState(true);

  const vaccinesQuery = useGetVaccines(true);
  const saveVaccineQuery = useSaveVaccine();
  const vaccinesData = vaccinesQuery.isLoading
    ? []
    : vaccinesQuery.data?.data.map((vaccine) => {
        return {
          value: vaccine.id,
          label: vaccine.vaccine_name,
          isUnique: vaccine.is_unique,
        };
      });

  const isDisabled =
    form.vaccine_registered === '' ||
    form.vaccine_date === '' ||
    form.next_vaccine_date === '' ||
    isLoading;

  const onSelectReminder = (reminderKey: number) => {
    setReminderKey(reminderKey);

    if (form.next_vaccine_date !== '') {
      const reminderOption = reminderOptions.find(
        (option) => option.key == reminderKey,
      );

      const dateToRemind = moment(form.next_vaccine_date)
        .subtract(reminderOption.delay.amount, reminderOption.delay.unit)
        .format('YYYY-MM-DD 09:00:00');

      setForm({...form, reminder: dateToRemind});
    }
  };

  const onSavePress = () => saveVaccineQuery.mutate({...form, etiquetteImage});

  useEffect(() => {
    if (!isReminderActive) {
      setForm({...form, reminder: null});
    } else {
      onSelectReminder(reminderKey);
    }
  }, [isReminderActive, form.next_vaccine_date]);

  useEffect(() => {
    const isUnique = vaccinesData.find(
      (vaccine) => vaccine.value === form.vaccine_registered,
    )?.isUnique;

    setIsUnique(isUnique ?? false);
  }, [form.vaccine_registered]);

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: {...form, etiquetteImage},
  });

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
        minDate={new Date()}
        onSelect={(vaccine_date) => setForm({...form, vaccine_date})}
        placeholder="Fecha de aplicación"
      />
      {!isUnique && (
        <DatepickerInput
          currentValue={form.next_vaccine_date}
          disabled={form.vaccine_date === '' ? true : false}
          minDate={new Date(form.vaccine_date)}
          onSelect={(next_vaccine_date) =>
            setForm({...form, next_vaccine_date})
          }
          placeholder="Fecha de expiración"
        />
      )}
      <VisitsImgCard
        label={'Fotografía Etiqueta'}
        filledLabel={'Etiqueta'}
        image={etiquetteImage}
        setImage={setEtiquetteImage}
      />
      {!isUnique && (
        <ReminderInput
          isActive={isReminderActive}
          setIsActive={setIsReminderActive}
          setValue={onSelectReminder}
          value={reminderKey}
        />
      )}
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
});
