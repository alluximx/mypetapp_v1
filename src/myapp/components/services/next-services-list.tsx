import {List} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useAppointments from '../../hooks/vets/useAppointments';
import useDeleteAppointment from '../../hooks/vets/useDeleteVetAppointment';
// My Components.
import CustomModal from '../modals/custom-modal';
import CustomSpinner from '../custom-spinner';
import NextServiceCard from './next-service-card';
import NextServicesEmpty from './next-services-empty';
// Types.
import {Appointment} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';
import {servicesTabs} from '../../constants';
import moment from 'moment';

const NextServicesList = (props: NextServicesListProps): React.ReactElement => {
  const navigation = useNavigation();
  const appointments = useAppointments();
  const deleteQuery = useDeleteAppointment();

  const [data, setData] = useState<Appointment[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const onDeleteAccept = () => {
    // Delete call to api.
    deleteQuery.mutate(selectedAppointment.id);
    setShowDeleteModal(false);
  };
  const onEditAccept = () => {
    navigation.navigate('VetDate', {
      isEdit: true,
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

    if (appointment?.has_penalty) {
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

    return appointment?.has_penalty
      ? `Estás eliminando una cita con menos de ` +
          `${timeLimit} ${timeLimit === 1 ? 'hora' : 'horas'} de ` +
          `anticipación, si la cancelas o no asistes se te cobrará una ` +
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
    setData([]);
  }, [props.tab]);

  useEffect(() => {
    if (appointments.isSuccess) {
      // Filter by tab.
      let filteredAppointments = appointments.data?.data?.filter(
        (appointment: Appointment) => {
          const currentDateTime = moment();
          const appointmentDateTime = moment(appointment.full_end_time);
          return props.tab === servicesTabs[0].id
            ? appointmentDateTime.isAfter(currentDateTime)
            : appointmentDateTime.isSameOrBefore(currentDateTime);
        },
      );
      // Filter accepted ones.
      filteredAppointments = filteredAppointments.filter(
        (appointment: Appointment) =>
          appointment.admin_settings.auto_accept_request ||
          (!appointment.admin_settings.auto_accept_request &&
            appointment.is_accepted),
      );
      setData(filteredAppointments);
    }
  }, [appointments.data?.data, props.tab]);

  useEffect(() => {
    // setData(
    //   props.tab === servicesTabs[0].id ? exampleNextData : exampleHistoricData,
    // );
  }, [props.tab]);

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
        labelAccept={
          selectedAppointment?.has_penalty ? 'Pagar y Editar' : 'Editar Cita'
        }
        title="Editar Cita"
        text={editMessage}
        onAccept={onEditAccept}
        onCancel={() => setShowEditModal(false)}
        showCancel
        visible={showEditModal}
      />
      <List
        data={data}
        ListEmptyComponent={<NextServicesEmpty tab={props.tab} />}
        scrollEnabled={data.length ? true : false}
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
