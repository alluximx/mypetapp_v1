import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
// Global Styles.
import globalColors from '../../../styles/colors';
// Hooks.
import useDeleteVaccine from '../../../hooks/vaccines/useDeleteVaccine';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useUpdateVaccine from '../../../hooks/vaccines/useUpdateVaccine';
import useVaccineDetail from '../../../hooks/vaccines/useVaccineDetail';
import useVaccineReminder from '../../../hooks/inputs/useVaccineReminder';
// Models.
import {Vaccine} from '../../../types/models';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const {data: vaccineData, isLoading: vaccineLoading} = useVaccineDetail(
    route.params.vaccineId,
  );

  const [form, setForm] = useState({
    user_pet: vaccineData?.data.user_pet ?? '',
    vaccine_date: vaccineData?.data.vaccine_date ?? new Date(),
    next_vaccine_date: vaccineData?.data.next_vaccine_date ?? new Date(),
    reminder: vaccineData?.data.reminder ?? null,
    vaccine_registered: vaccineData?.data.vaccine_registered.id ?? '',
    is_vaccine: false,
  });

  const [
    isReminderActive,
    setIsReminderActive,
    reminderKey,
    onSelectReminder,
    setReminderKey,
  ] = useVaccineReminder(form, setForm);

  const saveDewormingQuery = useUpdateVaccine(route.params.vaccineId);
  const deleteQuery = useDeleteVaccine();
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
    isLoading ||
    formHasChanged;

  const onSavePress = () => saveDewormingQuery.mutate(form);
  const onDeleteAccept = () =>
    deleteQuery.mutate({
      vaccineId: route.params.vaccineId,
      petId: form.user_pet,
    });

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: form,
  });

  useEffect(() => {
    if (!vaccineLoading) {
      const isFormEqual =
        form.vaccine_registered === vaccineData?.data.vaccine_registered.id &&
        form.vaccine_date === vaccineData?.data.vaccine_date &&
        form.next_vaccine_date === vaccineData?.data.next_vaccine_date &&
        vaccineData?.data
          ? moment(form.reminder).format('YYYY-MM-DD') ===
            moment(vaccineData?.data.reminder).format('YYYY-MM-DD')
          : false;

      setFormHasChanged(isFormEqual);
    }
  }, [form]);

  useEffect(() => {
    if (vaccineData?.data) {
      setIsLoading(true);
      setForm({
        ...form,
        user_pet: vaccineData?.data.user_pet,
        vaccine_date: vaccineData?.data.vaccine_date,
        next_vaccine_date: vaccineData?.data.next_vaccine_date,
        reminder: vaccineData?.data.reminder,
        vaccine_registered: vaccineData?.data.vaccine_registered.id,
      });

      if (vaccineData?.data.reminder && vaccineData?.data.reminder !== '') {
        setIsReminderActive(true);
      }

      if (vaccineData?.data.reminder) {
        const reminderDate = moment(vaccineData?.data.reminder).format(
          'YYYY-MM-DD',
        );
        // Get date diff.
        const duration = moment
          .duration(
            moment(vaccineData?.data.next_vaccine_date).diff(
              moment(reminderDate),
            ),
          )
          .asDays();

        setReminderKey(duration);
      }
      setIsLoading(false);
    }
  }, [vaccineData]);

  return isLoading || vaccineLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <CustomModal
        labelAccept="Eliminar Registro"
        title="Eliminar Registro"
        text="¿Seguro que quieres eliminar este registro?"
        onAccept={onDeleteAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader style={styles.title}>Editar Desparacitación</TitleHeader>
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
      <AnchorText onPress={() => setIsModalVisible(true)} style={styles.delete}>
        Eliminar
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  delete: {textAlign: 'center', color: globalColors.red},
});
