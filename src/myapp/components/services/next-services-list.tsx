import {List} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useAppointments from '../../hooks/vets/useAppointments';
import useDeleteAppointment from '../../hooks/vets/useDeleteVetAppointment';
import useFilterAppointments from '../../hooks/vets/useFilterAppointments';
// My Components.
import CustomModal from '../modals/custom-modal';
import CustomSpinner from '../custom-spinner';
import NextServiceCard from './next-service-card';
import NextServicesEmpty from './next-services-empty';
// Types.
import {Appointment} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';

const NextServicesList = (props: NextServicesListProps): React.ReactElement => {
  const navigation = useNavigation();
  const appointments = useAppointments();
  const deleteQuery = useDeleteAppointment();
  const [data, setData] = useState<Appointment[]>([]);
  const filteredAppointments = useFilterAppointments(data, props.tab);

  const [editMessage, setEditMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);

  const onDeleteAccept = () => {
    // Delete call to api.
    deleteQuery.mutate(selectedAppointment.id);
    setShowDeleteModal(false);
  };

  const hasReschedulePenalty = (): boolean =>
    selectedAppointment?.has_reschedule_penalty ||
    selectedAppointment?.changes ===
      selectedAppointment?.admin_settings?.allowed_changes_without_penalty;

  const onEditAccept = () => {
    navigation.navigate('VetDate', {
      isEdit: true,
      ...selectedAppointment.admin_settings,
      appointment_end_time: selectedAppointment.end_time,
      appointment_start_time: selectedAppointment.start_time,
      card_id: selectedAppointment.card_id,
      id: selectedAppointment.id,
      date: selectedAppointment.date,
      pet: selectedAppointment.pet,
      has_reschedule_penalty: hasReschedulePenalty(),
    });
    setShowEditModal(false);
  };

  const getEditMessage = (appointment: Appointment): string => {
    const {
      allowed_changes_without_penalty,
      minimum_time_for_reschedule,
      reschedule_penalty,
    } = appointment?.admin_settings ?? {};
    const timeLimit = minimum_time_for_reschedule / 60;
    const penaltyAmount = Number(reschedule_penalty)?.toFixed(2);

    if (appointment?.has_reschedule_penalty) {
      return (
        `Estás modificando una cita con menos de ` +
        `${timeLimit} ${timeLimit === 1 ? 'hora' : 'horas'} de ` +
        `anticipación, para realizar esta acción se te cobrará una ` +
        `penalización de $${penaltyAmount} pesos.`
      );
    }

    switch (appointment?.changes) {
      case allowed_changes_without_penalty - 1:
        return (
          `Puedes modificar la fecha de tu cita una vez más sin ninguna ` +
          `penalización. Si intentas editar tu cita más de ` +
          `${allowed_changes_without_penalty} veces, ` +
          `se te hará un recargo por la cantidad de $${penaltyAmount} pesos.`
        );
      case allowed_changes_without_penalty:
        return (
          `Para modificar la fecha de tu cita es necesario pagar una ` +
          `penalización de $${penaltyAmount} pesos.`
        );
      default:
        return (
          `Puedes modificar la fecha de tu cita ` +
          `${allowed_changes_without_penalty} veces más sin ninguna ` +
          `penalización. Si intentas editar tu cita más de ` +
          `${allowed_changes_without_penalty} veces, se te hará un ` +
          `recargo por la cantidad de $${penaltyAmount} pesos.`
        );
    }
  };

  const getDeleteMessage = (appointment: Appointment): string => {
    const {
      cancel_penalty,
      minimum_time_for_cancel,
    } = appointment?.admin_settings;
    const timeLimit = minimum_time_for_cancel / 60;
    const amount = Number(cancel_penalty)?.toFixed(2);

    return appointment?.has_cancel_penalty
      ? `Estás eliminando una cita con menos de ` +
          `${timeLimit} ${timeLimit === 1 ? 'hora' : 'horas'} de ` +
          `anticipación, si la cancelas se te cobrará una ` +
          `penalización de $${amount} pesos.`
      : '¿Estás seguro de que quieres eliminar esta cita?';
  };

  const renderItem = ({item}: {item: Appointment}) => (
    <NextServiceCard
      key={item.id}
      onPressEditModal={() => {
        setSelectedAppointment(item);
        setShowEditModal(true);
      }}
      onPressDeleteModal={() => {
        setSelectedAppointment(item);
        setShowDeleteModal(true);
      }}
      service={item}
      tab={props.tab}
    />
  );

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    if (appointments.isSuccess) {
      setData(appointments.data?.data);
    }
  }, [appointments.data?.data]);

  useEffect(() => {
    if (selectedAppointment) {
      setEditMessage(getEditMessage(selectedAppointment));
    }
  }, [selectedAppointment]);

  useEffect(() => {
    if (showDeleteModal) {
      setDeleteMessage(getDeleteMessage(selectedAppointment));
    }
  }, [showDeleteModal]);

  return appointments.isLoading ? (
    <CustomSpinner />
  ) : (
    <>
      <CustomModal
        labelAccept="Eliminar Cita"
        title="Eliminar Cita"
        text={deleteMessage}
        onAccept={onDeleteAccept}
        onCancel={() => setShowDeleteModal(false)}
        showCancel
        visible={showDeleteModal}
      />
      <CustomModal
        labelAccept={hasReschedulePenalty() ? 'Pagar y Editar' : 'Editar Cita'}
        title="Editar Cita"
        text={editMessage}
        onAccept={onEditAccept}
        onCancel={() => setShowEditModal(false)}
        showCancel
        visible={showEditModal}
      />
      <List
        data={filteredAppointments}
        ListEmptyComponent={<NextServicesEmpty tab={props.tab} />}
        scrollEnabled={filteredAppointments.length ? true : false}
        renderItem={renderItem}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexBasis: '50%',
  },
  container: {
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 16,
  },
});

export default NextServicesList;
