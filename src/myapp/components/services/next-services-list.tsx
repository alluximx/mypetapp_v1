import {List, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Constants.
import {servicesTabs} from '../../constants';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
// import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomModal from '../modals/custom-modal';
import CustomSpinner from '../custom-spinner';
import NextServiceCard from './next-service-card';
import NextServicesEmpty from './next-services-empty';
// Types.
import {Appointment} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';

const exampleNextData: Appointment[] = [
  {
    id: '1',
    date: '2021-05-01 17:00:00',
    vet: 'Estética Canina',
    pet: {
      name: 'Valerio',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg',
    },
    services: [
      {
        id: 'corte',
        name: 'Corte',
      },
      {
        id: 'baño',
        name: 'Baño',
      },
    ],
    appointmentInfo: {
      editingAttemptsLeft: 2,
      maxEditingAttempts: 2,
      showDeletePenalty: false,
    },
    penaltyData: {
      amount: 50.0,
      timeLimit: 3,
    },
  },
  {
    id: '2',
    date: '2021-04-12 12:30:00',
    vet: 'Veterinaria Arboledas',
    pet: {
      name: 'Charo',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/hound-plott/hhh-23456.jpeg',
    },
    services: [
      {
        id: 'consulta',
        name: 'Consulta',
      },
    ],
    appointmentInfo: {
      editingAttemptsLeft: 2,
      maxEditingAttempts: 3,
      showDeletePenalty: false,
    },
    penaltyData: {
      amount: 50.0,
      timeLimit: 3,
    },
  },
  {
    id: '3',
    date: '2021-06-04 12:00:00',
    vet: 'Veterinaria Arboledas',
    pet: {
      name: 'Valerio',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg',
    },
    services: [
      {
        id: 'consulta',
        name: 'Consulta',
      },
    ],
    appointmentInfo: {
      editingAttemptsLeft: 1,
      maxEditingAttempts: 3,
      showDeletePenalty: true,
    },
    penaltyData: {
      amount: 50.0,
      timeLimit: 3,
    },
  },
  {
    id: '4',
    date: '2021-06-04 12:00:00',
    vet: 'Veterinaria Jiménez',
    pet: {
      name: 'Valerio',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg',
    },
    services: [
      {
        id: 'consulta',
        name: 'Consulta',
      },
    ],
    appointmentInfo: {
      editingAttemptsLeft: 0,
      maxEditingAttempts: 3,
      showDeletePenalty: true,
    },
    penaltyData: {
      amount: 150.0,
      timeLimit: 2,
    },
  },
];

const exampleHistoricData: Appointment[] = [
  {
    id: '5',
    date: '2020-05-23 17:00:00',
    vet: 'Estética Canina',
    pet: {
      name: 'Bruno',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/bluetick/n02088632_2805.jpg',
    },
    services: [
      {
        id: 'corte',
        name: 'Corte',
      },
      {
        id: 'baño',
        name: 'Baño',
      },
    ],
  },
  {
    id: '6',
    date: '2020-01-24 09:00:00',
    vet: 'Veterinaria Arboledas',
    pet: {
      name: 'Valerio',
    },
    petImage: {
      file: 'https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg',
    },
    services: [
      {
        id: 'consulta',
        name: 'Consulta',
      },
    ],
  },
];

const NextServicesList = (props: NextServicesListProps): React.ReactElement => {
  const navigation = useNavigation();
  const [data, setData] = useState<Appointment[]>(exampleNextData);
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
    return appointment?.appointmentInfo?.showDeletePenalty
      ? `Estás eliminando una cita con menos de ${timeLimit} horas de ` +
          `anticipación, si la cancelas o no asistes se te cobrará una ` +
          `penalización de $${amount.toFixed(2)} pesos.`
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
    setData(
      props.tab === servicesTabs[0].id ? exampleNextData : exampleHistoricData,
    );
  }, [props.tab]);

  useEffect(() => {
    setEditMessage(getEditMessage(selectedAppointment));
  }, [selectedAppointment]);

  useEffect(() => {
    setDeleteMessage(getDeleteMessage(selectedAppointment));
  }, [showDeleteModal]);

  return (
    <>
      <CustomModal
        labelAccept="Eliminar Cita"
        title="Eliminar Cita"
        text={deleteMessage}
        onAccept={() => setShowDeleteModal(false)}
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
