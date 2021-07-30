import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
// Constants.
import {reminderOptions} from '../../../constants';
// Global Colors.
import globalColors from '../../../styles/colors';
// Hooks.
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import useUpdateVaccine from '../../../hooks/vaccines/useUpdateVaccine';
import useVaccineDetail from '../../../hooks/vaccines/useVaccineDetail';
import useDeleteVaccine from '../../../hooks/vaccines/useDeleteVaccine';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import TitleHeader from '../../../components/texts/title-header';
import VisitsImgCard from '../../../components/cards/image-input-card';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [reminderKey, setReminderKey] = useState('1');
  const [etiquetteImage, setEtiquetteImage] = useState(null);
  const vaccineData = useVaccineDetail(route.params.vaccineId);
  const updateQuery = useUpdateVaccine(route.params.vaccineId);
  const deleteQuery = useDeleteVaccine();

  const [form, setForm] = useState({
    user_pet: '',
    vaccine_registered: '',
    vaccine_date: '',
    next_vaccine_date: '',
    reminder: null,
  });

  console.log('###################');
  console.log('###################');
  console.log('###################');
  console.log('FORRRRMMM', form);
  console.log('###################');
  console.log('###################');
  console.log('###################');

  const onSavePress = () => {
    console.log('//////////////////////');
    console.log('//////////////////////');
    console.log('//////////////////////');
    console.log('FORRRRMMM', form);
    console.log('//////////////////////');
    console.log('//////////////////////');
    console.log('//////////////////////');
    updateQuery.mutate(form);
  };

  useEffect(() => {
    if (vaccineData.data) {
      setForm({
        user_pet: vaccineData.data?.data.user_pet,
        vaccine_date: vaccineData.data?.data.vaccine_date,
        next_vaccine_date: vaccineData.data?.data.next_vaccine_date,
        reminder: vaccineData.data?.data.reminder,
        vaccine_registered: vaccineData.data?.data.vaccine_registered.id,
      });

      if (
        vaccineData.data?.data.reminder &&
        vaccineData.data?.data.reminder !== ''
      ) {
        setIsReminderActive(true);
      }
    }
  }, [vaccineData.data]);

  const isDisabled =
    form.vaccine_registered === '' ||
    form.vaccine_date === '' ||
    form.next_vaccine_date === '' ||
    isLoading;

  const vaccinesQuery = useGetVaccines();
  const vaccinesData = vaccinesQuery.isLoading
    ? []
    : vaccinesQuery.data?.data.map((vaccine) => {
        return {value: vaccine.id, label: vaccine.vaccine_name};
      });

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: form,
  });

  const onSelectReminder = (reminderKey: string) => {
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

  return isLoading || vaccineData.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <CustomModal
        labelAccept="Eliminar Registro"
        title="Eliminar Registro"
        text="¿Seguro que quieres eliminar este registro?"
        onAccept={() => {
          console.log('Deleting...');
          setIsModalVisible(false);
          // navigation.navigate('VaccinesIndex');
          deleteQuery.mutate(route.params.vaccineId);
        }}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader style={styles.title}>Editar Vacuna</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccine_registered}
        data={vaccinesData}
        placeholder="Tipo de vacuna"
        setCurrentValue={(vaccine_registered) => {
          setForm({...form, vaccine_registered});
        }}
      />
      <DatepickerInput
        currentValue={form.vaccine_date !== '' ? form.vaccine_date : new Date()}
        onSelect={(vaccine_date) => setForm({...form, vaccine_date})}
        placeholder="Fecha de aplicación"
        minDate={new Date()}
      />
      <DatepickerInput
        currentValue={
          form.next_vaccine_date !== '' ? form.next_vaccine_date : new Date()
        }
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
      <AnchorText onPress={() => setIsModalVisible(true)} style={styles.delete}>
        Eliminar
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
  delete: {textAlign: 'center', color: globalColors.red, marginVertical: 16},
});
