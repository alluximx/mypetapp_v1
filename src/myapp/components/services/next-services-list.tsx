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
import {NextService} from '../../types/models';
import {NextServicesListProps} from '../../types/components/services';

const exampleNextData = [
  {
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
      editingAttempts: 0,
      showDeletePenalty: false,
    },
  },
  {
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
      editingAttempts: 1,
      showDeletePenalty: false,
    },
  },
  {
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
      editingAttempts: 2,
      showDeletePenalty: true,
    },
  },
];

const exampleHistoricData = [
  {
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
  const [data, setData] = useState<NextService[]>(exampleNextData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAttempts, setEditAttempts] = useState(0);
  const [editMessage, setEditMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [shouldApplyDeletePenalty, setShouldApplyDeletePenalty] = useState(
    false,
  );
  const penaltyData = {
    timeLimit: '3 horas',
    amount: 50.0,
  };

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

  const getEditMessage = (): string => {
    switch (editAttempts) {
      case 1:
        return `Puedes modificar la fecha de tu cita una vez más sin ninguna penalización. 
        Si intentas editar tu cita una tercera ocasión, se te hará un recargo por la cantidad de $${penaltyData.amount} pesos.`;
      case 2:
        return `Para modificar la fecha de tu cita es necesario pagar una penalización de $${penaltyData.amount} pesos.`;
      default:
        return `Puedes modificar la fecha de tu cita dos veces sin ninguna penalización. 
        Si intentas editar tu cita una tercera ocasión, se te hará un recargo por la cantidad de $${penaltyData.amount} pesos.`;
    }
  };

  const getDeleteMessage = (): string =>
    shouldApplyDeletePenalty
      ? `Estas eliminadno una cita con menos de ${penaltyData.timeLimit} de anticipación, si la cancelas o no asistes se te cobrará una penalización de $${penaltyData.amount} pesos.`
      : '¿Estás seguro de que quieres eliminar esta cita?';

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    setData(
      props.tab === servicesTabs[0].id ? exampleNextData : exampleHistoricData,
    );
  }, [props.tab]);

  useEffect(() => {
    setEditMessage(getEditMessage());
  }, [editAttempts]);

  useEffect(() => {
    setDeleteMessage(getDeleteMessage());
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
        labelAccept={editAttempts === 2 ? 'Pagar y Editar' : 'Editar Cita'}
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
        renderItem={({item}: {item: NextService}) => (
          <NextServiceCard
            onPressEditModal={() => {
              setEditAttempts(item.appointmentInfo.editingAttempts);
              setShowEditModal(true);
            }}
            onPressDeleteModal={() => {
              setShouldApplyDeletePenalty(
                item.appointmentInfo.showDeletePenalty,
              );
              setShowDeleteModal(true);
            }}
            service={item}
            tab={props.tab}
          />
        )}
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
