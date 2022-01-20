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
import NextServicesEmpty from './next-services-empty';
// Types.
import {NextServicesListProps} from '../../types/components/services';
import NextServiceCard from './next-service-card';

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
    services: ['Corte', 'Baño'],
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
    services: ['Consulta'],
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
    services: ['Corte', 'Baño'],
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
    services: ['Consulta'],
  },
];

const NextServicesList = (props: NextServicesListProps): React.ReactElement => {
  const navigation = useNavigation();
  const [data, setData] = useState(exampleNextData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setData(
      props.tab === servicesTabs[0].id ? exampleNextData : exampleHistoricData,
    );
  }, [props.tab]);

  const onDeleteAccept = () => {
    // Delete call to api.
    setShowDeleteModal(false);
  };
  const onEditAccept = () => {
    navigation.navigate('VetDate', {});
    setShowEditModal(false);
  };

  return (
    <>
      <CustomModal
        labelAccept="Eliminar Cita"
        title="Eliminar Cita"
        text="¿Estás seguro de que quieres eliminar esta cita?"
        onAccept={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
        showCancel
        visible={showDeleteModal}
      />
      <CustomModal
        labelAccept="Editar Cita"
        title="Editar Cita"
        text="Puedes modificar la fecha de tu cita dos veces sin ninguna penalización. Si intentas editar tu cita una tercera ocasión, se te hará un recargo por la cantidad de $50.00 pesos."
        onAccept={onEditAccept}
        onCancel={() => setShowEditModal(false)}
        showCancel
        visible={showEditModal}
      />
      <List
        data={data}
        ListEmptyComponent={<NextServicesEmpty tab={props.tab} />}
        scrollEnabled={data.length ? true : false}
        renderItem={({item}) => (
          <NextServiceCard
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
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
