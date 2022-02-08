import {List} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useAppointments from '../../hooks/vets/useAppointments';
// My Components.
import CustomModal from '../modals/custom-modal';
import CustomSpinner from '../custom-spinner';
import NextServiceCard from './next-service-card';
import NextServicesEmpty from './next-services-empty';
// Types.
import {Appointment} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';
import useDeleteAppointment from '../../hooks/vets/useDeleteVetAppointment';

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
    const {editingAttemptsLeft, maxEditingAttempts} =
      appointment?.appointmentInfo || {};
    const penaltyAmount = appointment?.penaltyData?.amount?.toFixed(2) || 0;

    switch (editingAttemptsLeft) {
      case 1:
        return (
          `Puedes modificar la fecha de tu cita una vez más sin ninguna ` +
          `penalización. Si intentas editar tu cita más de ${maxEditingAttempts} veces, ` +
          `se te hará un recargo por la cantidad de $${penaltyAmount} pesos.`
        );
      case 0:
        return (
          `Para modificar la fecha de tu cita es necesario pagar una ` +
          `penalización de $${penaltyAmount} pesos.`
        );
      default:
        return (
          `Puedes modificar la fecha de tu cita ${editingAttemptsLeft} veces ` +
          `más sin ninguna penalización. Si intentas editar tu cita más de ${maxEditingAttempts} veces, se te hará un recargo por ` +
          `la cantidad de $${penaltyAmount} pesos.`
        );
    }
  };

  const getDeleteMessage = (appointment: Appointment): string => {
    const {amount, timeLimit} = appointment?.penaltyData || {};
    return appointment?.has_penalty
      ? `Estás eliminando una cita con menos de ${timeLimit ?? 1} hora de ` +
          `anticipación, si la cancelas o no asistes se te cobrará una ` +
          `penalización de $${amount ? amount?.toFixed(2) : 0.0} pesos.`
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
  }, [appointments]);

  useEffect(() => {
    // setData(
    //   props.tab === servicesTabs[0].id ? exampleNextData : exampleHistoricData,
    // );
  }, [props.tab]);

  useEffect(() => {
    setEditMessage(getEditMessage(selectedAppointment));
  }, [selectedAppointment]);

  useEffect(() => {
    setDeleteMessage(getDeleteMessage(selectedAppointment));
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
          selectedAppointment?.appointmentInfo?.editingAttemptsLeft === 0
            ? 'Pagar y Editar'
            : 'Editar Cita'
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
