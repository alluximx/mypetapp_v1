import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
// Constants.
import {reminderOptions} from '../../../constants';
// Global Colors.
import globalColors from '../../../styles/colors';
// Hooks.
import useDeleteVaccine from '../../../hooks/vaccines/useDeleteVaccine';
import useEnforceScreenOnBack from '../../../hooks/navigation/useEnforceScreenOnBack';
import useGetVaccineImage from '../../../hooks/vaccines/useGetVaccineImage';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useUpdateVaccine from '../../../hooks/vaccines/useUpdateVaccine';
import useVaccineDetail from '../../../hooks/vaccines/useVaccineDetail';
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
  const [isUnique, setIsUnique] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reminderKey, setReminderKey] = useState(1);
  const [etiquetteImage, setEtiquetteImage] = useState(null);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const [imageHasChanged, setImageHasChanged] = useState(false);

  const updateQuery = useUpdateVaccine(route.params.vaccineId);
  const imageQuery = useGetVaccineImage(route.params.vaccineId);
  const deleteQuery = useDeleteVaccine();
  const vaccineData = useVaccineDetail(route.params.vaccineId);
  const [isReminderActive, setIsReminderActive] = useState(
    vaccineData.data?.data.reminder ? true : false,
  );

  const [form, setForm] = useState({
    user_pet: vaccineData.data?.data.user_pet ?? '',
    vaccine_date: vaccineData.data?.data.vaccine_date ?? moment(),
    next_vaccine_date: vaccineData.data?.data.next_vaccine_date ?? moment(),
    reminder: vaccineData.data?.data.reminder ?? null,
    vaccine_registered: vaccineData.data?.data.vaccine_registered.id ?? '',
    vaccine_image_id: '',
    is_vaccine: true,
  });

  const isDisabled =
    form.vaccine_registered === '' ||
    form.vaccine_date === '' ||
    form.next_vaccine_date === '' ||
    isLoading ||
    formHasChanged;

  const vaccinesQuery = useGetVaccines(true);
  const vaccinesData = vaccinesQuery.isLoading
    ? []
    : vaccinesQuery.data?.data.map((vaccine) => {
        return {value: vaccine.id, label: vaccine.vaccine_name};
      });

  const onSavePress = () =>
    updateQuery.mutate({...form, etiquetteImage, imageHasChanged});
  const onDeleteAccept = () =>
    deleteQuery.mutate({
      vaccineId: route.params.vaccineId,
      petId: form.user_pet,
    });

  const onSelectReminder = (key: number) => {
    setReminderKey(key);

    if (form.next_vaccine_date !== '') {
      const reminderOption = reminderOptions.find(
        (option) => option.key === key,
      );

      const dateToRemind = moment(form.next_vaccine_date)
        .subtract(reminderOption.delay.amount, reminderOption.delay.unit)
        .format('YYYY-MM-DD 09:00:00');

      setForm({...form, reminder: dateToRemind});
    }
  };

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: {...form, etiquetteImage},
  });

  useEnforceScreenOnBack('VaccinesIndex', {pet: {id: form.user_pet}});

  /******************************
   *** Post data load effects ***
   ******************************/

  useEffect(() => {
    if (vaccineData.data) {
      setForm({
        ...form,
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

      if (vaccineData.data?.data.reminder) {
        const reminderDate = moment(vaccineData.data?.data.reminder).format(
          'YYYY-MM-DD',
        );
        // Get date diff.
        const duration = moment
          .duration(
            moment(vaccineData.data?.data.next_vaccine_date).diff(
              moment(reminderDate),
            ),
          )
          .asDays();

        setReminderKey(duration);
      }
    }
  }, [vaccineData.data]);

  useEffect(() => {
    if (imageQuery.data?.data[0]) {
      setEtiquetteImage({
        uri: imageQuery.data?.data[0]?.file ?? null,
      });
      setForm({
        ...form,
        vaccine_image_id: imageQuery.data?.data[0]?.id ?? '',
      });
    } else {
      setEtiquetteImage(null);
      setForm({
        ...form,
        vaccine_image_id: '',
      });
    }
  }, [imageQuery.data]);

  /********************
   *** Form effects ***
   ********************/

  useEffect(() => {
    if (!isReminderActive) {
      setForm({...form, reminder: null});
    } else {
      onSelectReminder(reminderKey);
    }
  }, [isReminderActive, form.next_vaccine_date]);

  useEffect(() => {
    const unique = vaccinesData.find(
      (vaccine) => vaccine.value === form.vaccine_registered,
    )?.isUnique;

    setIsUnique(unique ?? false);
  }, [form.vaccine_registered]);

  useEffect(() => {
    if (!vaccineData.isLoading && !imageQuery.isLoading) {
      const isFormEqual =
        form.vaccine_registered ===
          vaccineData.data?.data.vaccine_registered.id &&
        form.vaccine_date === vaccineData.data?.data.vaccine_date &&
        form.next_vaccine_date === vaccineData.data?.data.next_vaccine_date &&
        form.reminder === vaccineData.data?.data.reminder;
      const isImageEqual = imageQuery.data?.data[0]
        ? etiquetteImage?.uri === imageQuery.data?.data[0].file
        : etiquetteImage === null;
      const isEqual = isFormEqual && isImageEqual;

      setImageHasChanged(!isImageEqual);
      setFormHasChanged(isEqual);
    }
  }, [form, etiquetteImage]);

  return isLoading || vaccineData.isLoading || imageQuery.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <ScrollView>
        <CustomModal
          labelAccept="Eliminar Registro"
          title="Eliminar Registro"
          text="¿Seguro que quieres eliminar este registro?"
          onAccept={onDeleteAccept}
          onCancel={() => setIsModalVisible(false)}
          showCancel={true}
          visible={isModalVisible}
        />
        <TitleHeader style={styles.title}>Editar Vacuna</TitleHeader>
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
        />
        {!isUnique && (
          <DatepickerInput
            currentValue={form.next_vaccine_date}
            disabled={form.vaccine_date === '' ? true : false}
            minDate={form.vaccine_date}
            onSelect={(next_vaccine_date) =>
              setForm({...form, next_vaccine_date})
            }
            placeholder="Fecha de expiración"
          />
        )}
        <VisitsImgCard
          label="Fotografía Etiqueta"
          filledLabel="Etiqueta"
          image={etiquetteImage}
          setImage={setEtiquetteImage}
        />
        {!isUnique && (
          <ReminderInput
            isActive={isReminderActive}
            setIsActive={setIsReminderActive}
            setValue={onSelectReminder}
            style={isReminderActive ? {marginBottom: 0} : {marginBottom: 32}}
            value={reminderKey}
          />
        )}
        <AnchorText
          onPress={() => setIsModalVisible(true)}
          style={styles.delete}>
          Eliminar
        </AnchorText>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
  delete: {
    textAlign: 'center',
    color: globalColors.red,
    marginBottom: 16,
  },
});
