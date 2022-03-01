import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
// import useAppointments from '../../hooks/vets/useAppointments';
import useDeleteAppointment from '../../hooks/vets/useDeleteVetAppointment';
import useFilterAppointments from '../../hooks/vets/useFilterAppointments';
// My Components.
import CustomModal from '../modals/custom-modal';
import CustomSpinner from '../custom-spinner';
import NextServiceCard from './next-service-card';
import NextServicesEmpty from './next-services-empty';
// Services
import api from '../../services/app-services';
// Types.
import {Appointment} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';

const NextServicesList = (props: NextServicesListProps): React.ReactElement => {
  const navigation = useNavigation();
  const [data, setData] = useState<Appointment[]>([]);

  // Hook api calls.
  const salonAppointments = useQuery('my-salon-appointments', () =>
    api.get(`api/v1/salons-appointments/`, true),
  );
  const vetAppointments = useQuery('my-vet-appointments', () =>
    api.get(`api/v1/vets-appointments/`, true),
  );

  const deleteQuery = useDeleteAppointment();
  const filteredAppointments = useFilterAppointments(data, props.tab);

  // const [editMessage, setEditMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);

  const onDeleteAccept = () => {
    const {id, services} = selectedAppointment ?? {};
    const formattedData: Appointment = {
      id,
      // has_cancel_penalty:
      //   hasExceededTimeLimit(
      //     date,
      //     start_time,
      //     admin_settings?.minimum_time_for_cancel,
      //   ) || has_cancel_penalty,
      services,
      is_canceled: true,
    };
    // Delete call to api.
    deleteQuery.mutate(formattedData, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
    });
  };

  // const hasReschedulePenalty = (): boolean =>
  //   hasExceededTimeLimit(
  //     selectedAppointment?.date,
  //     selectedAppointment?.start_time,
  //     selectedAppointment?.admin_settings?.minimum_time_for_reschedule,
  //   ) ||
  //   selectedAppointment?.has_reschedule_penalty ||
  //   selectedAppointment?.changes >=
  //     selectedAppointment?.admin_settings?.allowed_changes_without_penalty;

  // const hasExceededTimeLimit = (
  //   appointmentDate: string,
  //   appointmentStartTime: string,
  //   timeLimit: number,
  // ): boolean => {
  //   if (!appointmentStartTime) {
  //     return false;
  //   }

  //   const appointmentTime = moment(
  //     appointmentDate + ' ' + appointmentStartTime,
  //   );
  //   const diffBetweenTimes = appointmentTime.diff(moment(), 'minutes');
  //   return diffBetweenTimes <= timeLimit;
  // };

  // const onEditAccept = () => {
  //   navigation.navigate('VetDate', {
  //     isEdit: true,
  //     ...selectedAppointment?.admin_settings,
  //     appointment_end_time: selectedAppointment?.end_time,
  //     appointment_start_time: selectedAppointment?.start_time,
  //     // card_id: selectedAppointment?.card_id,
  //     id: selectedAppointment?.id,
  //     date: selectedAppointment?.date,
  //     pet: selectedAppointment?.pet,
  //     // has_reschedule_penalty: hasReschedulePenalty(),
  //   });
  //   setShowEditModal(false);
  // };

  // const getEditMessage = (appointment: Appointment): string => {
  //   const {
  //     allowed_changes_without_penalty,
  //     minimum_time_for_reschedule,
  //     reschedule_penalty,
  //   } = appointment?.admin_settings ?? {};
  //   const {changes, date, start_time} = appointment ?? {};

  //   const timeLimit = _.round(minimum_time_for_reschedule / 60, 1);
  //   const penaltyAmount = Number(reschedule_penalty)?.toFixed(2);
  //   const exceededTimeLimit = hasExceededTimeLimit(
  //     date,
  //     start_time,
  //     minimum_time_for_reschedule,
  //   );

  //   let result =
  //     `Estás modificando una cita con menos de ` +
  //     `${timeLimit} ${timeLimit === 1 ? 'hora' : 'horas'} de ` +
  //     `anticipación, para realizar esta acción se te cobrará una ` +
  //     `penalización de $${penaltyAmount} pesos.`;

  //   if (!exceededTimeLimit) {
  //     if (changes === allowed_changes_without_penalty - 1) {
  //       result =
  //         `Puedes modificar la fecha de tu cita una vez más sin ninguna ` +
  //         `penalización. Si intentas editar tu cita más de ` +
  //         `${allowed_changes_without_penalty} veces, ` +
  //         `se te hará un recargo por la cantidad de $${penaltyAmount} pesos.`;
  //     } else if (changes < allowed_changes_without_penalty) {
  //       result =
  //         `Puedes modificar la fecha de tu cita ` +
  //         `${
  //           allowed_changes_without_penalty - changes
  //         } veces más sin ninguna ` +
  //         `penalización. Si intentas editar tu cita más de ` +
  //         `${allowed_changes_without_penalty} veces, se te hará un ` +
  //         `recargo por la cantidad de $${penaltyAmount} pesos.`;
  //     } else {
  //       result =
  //         `Has superado el límite de modificaciones. Para modificar nuevamente ` +
  //         `tu cita es necesario pagar una penalización de $${penaltyAmount} pesos.`;
  //     }
  //   }
  //   return result;
  // };

  const getDeleteMessage = (appointment: Appointment): string => {
    // const {cancel_penalty, minimum_time_for_cancel} =
    //   appointment?.admin_settings ?? {};
    // const {date, has_cancel_penalty, start_time} = appointment ?? {};
    // const timeLimit = _.round(minimum_time_for_cancel / 60, 1);
    // const amount = Number(cancel_penalty)?.toFixed(2);

    return '¿Estás seguro de que quieres eliminar esta cita?';
    // hasExceededTimeLimit(date, start_time, minimum_time_for_cancel) ||
    //   has_cancel_penalty
    //   ? `Estás eliminando una cita con menos de ` +
    //       `${timeLimit} ${timeLimit === 1 ? 'hora' : 'horas'} de ` +
    //       `anticipación, si la cancelas se te cobrará una ` +
    //       `penalización de $${amount} pesos.`
    //   :
  };

  const renderItem = ({item}: {item: Appointment}) => (
    <NextServiceCard
      key={item?.id}
      onPressEditModal={() => {
        setSelectedAppointment(item);
        navigation.navigate('VetDate', {
          isEdit: true,
          ...item?.admin_settings,
          appointment_end_time: item?.end_time,
          appointment_start_time: item?.start_time,
          // card_id: item?.card_id,
          id: item?.id,
          date: item?.date,
          directory_id: item?.admin_settings,
          pet: {
            petId: item?.pet?.id,
            petName: item?.pet?.name,
          },
          services: item?.services,
          // has_reschedule_penalty: hasReschedulePenalty(),
        });
      }}
      onPressDeleteModal={() => {
        setSelectedAppointment(item);
        setShowDeleteModal(true);
      }}
      onPressPendingModal={() => {
        setShowPendingModal(true);
      }}
      service={item}
      tab={props.tab}
    />
  );

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    if (
      vetAppointments.isSuccess &&
      vetAppointments.data &&
      salonAppointments.isSuccess &&
      salonAppointments.data
    ) {
      setData([...vetAppointments.data?.data, ...salonAppointments.data?.data]);
    }
  }, [
    vetAppointments.isSuccess,
    salonAppointments.isSuccess,
    vetAppointments.data,
    salonAppointments.data,
  ]);

  // useEffect(() => {
  //   if (selectedAppointment) {
  //     setEditMessage(getEditMessage(selectedAppointment));
  //   }
  // }, [selectedAppointment]);

  useEffect(() => {
    if (showDeleteModal) {
      setDeleteMessage(getDeleteMessage(selectedAppointment));
    }
  }, [showDeleteModal]);

  return salonAppointments.isLoading || vetAppointments.isLoading ? (
    <CustomSpinner />
  ) : (
    <>
      <CustomModal
        labelAccept="Entendido"
        onAccept={() => setShowPendingModal(false)}
        showCancel={false}
        text={
          'Tu cita está pendiente de ser aceptada por el administrador del servicio. ' +
          'Te enviaremos una notificación cuando esta sea aceptada o rechazada.'
        }
        title="Pendiente de aceptación"
        visible={showPendingModal}
      />
      <CustomModal
        labelAccept="Eliminar Cita"
        onAccept={onDeleteAccept}
        onCancel={() => setShowDeleteModal(false)}
        showCancel
        text={deleteMessage}
        title="Eliminar Cita"
        visible={showDeleteModal}
      />
      {/* <CustomModal
        labelAccept={hasReschedulePenalty() ? 'Pagar y Editar' : 'Editar Cita'}
        onAccept={onEditAccept}
        onCancel={() => setShowEditModal(false)}
        showCancel
        text={editMessage}
        title="Editar Cita"
        visible={showEditModal}
      /> */}
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
