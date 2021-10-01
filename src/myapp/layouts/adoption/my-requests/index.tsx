import React, {useState} from 'react';
import {Dimensions, Image, Platform, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// Environment
import environments from '../../../environments';
// My components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import GenericCard from '../../../components/cards/generic-card';
import CustomSpinner from '../../../components/custom-spinner';
import CustomModal from '../../../components/modals/custom-modal';
// Global Styles
import globalVars from '../../../styles/vars';
import globalColors from '../../../styles/colors';
// Hook
import useDeleteAdoptionRequest from '../../../hooks/adoption/useDeleteAdoptionRequest';
import useMyAdoptionRequests from '../../../hooks/adoption/useMyAdoptionRequests';
// Types
import {AdoptionRequest} from '../../../types/models';

export default ({navigation, route}): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestId, setRequestId] = useState('');
  const {data, isLoading} = useMyAdoptionRequests();
  const deleteQuery = useDeleteAdoptionRequest();

  const requestList = data?.data
    ? data.data.map((request: AdoptionRequest) => ({
        ageNumber: request.adoption_publication.ageNumber,
        ageType: request.adoption_publication.ageType,
        association: request.adoption_publication.association.name,
        id: request.id,
        image:
          environments.IMAGES_HOST +
            request.adoption_publication.images.find(
              (image) => image.is_cover === true,
            ).image ?? '',
        name: request.adoption_publication.name,
        status: request.status,
      }))
    : [];

  const onDeleteAccept = () => {
    deleteQuery.mutate(requestId);
    setIsModalVisible(false);
  };

  const renderServiceItem = ({item}) => {
    const formattedData = {
      additionalContent: [
        <DefaultText style={styles.status}>{item.status}</DefaultText>,
      ],
      buttonAlign: 'right',
      buttonColor: globalColors.red,
      buttonText: 'Eliminar Solicitud',
      buttonTextisSubmit: true,
      content: `${item.ageNumber} ${
        item.ageNumber > 1
          ? item.ageType === 'Y'
            ? ' Años'
            : ' Meses'
          : item.ageType === 'Y'
          ? ' Año'
          : ' Mes'
      }`,
      coverImage: item.image,
      title: item.name,
      buttonClick: () => {
        setRequestId(item.id);
        setIsModalVisible(true);
      },
    };
    return (
      <GenericCard
        contentTextStyle={styles.contentCard}
        coverImageStyle={styles.coverImage}
        data={formattedData}
        isDisabled={true}
        onClick={() => {}}
        styleCard={styles.cardStyle}
        titleStyle={styles.cardTitle}
      />
    );
  };

  return isLoading ? (
    <CustomSpinner />
  ) : requestList.length > 0 ? (
    <DefaultLayout>
      <CustomModal
        labelAccept="Eliminar Solicitud"
        title="Eliminar Solicitud"
        text="¿Estás seguro que deseas eliminar la solicitud de adopción?"
        onAccept={onDeleteAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader style={styles.listTitle}>
        Solicitudes de Adopción
      </TitleHeader>
      <List
        style={styles.servicesContainer}
        data={requestList}
        renderItem={renderServiceItem}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../../../assets/images/pets/adoption-requests.png')}
      />
      <TitleHeader style={styles.center}>Solicitudes de Adopción</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        No tienes solicitudes pendientes.
      </DefaultText>
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: width,
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
    padding: 10,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  listTitle: {
    marginBottom: 24,
  },
  cardStyle: {
    marginHorizontal: 0,
  },
  contentCard: {
    marginBottom: 6,
    fontSize: 14,
  },
  cardTitle: {
    marginBottom: 0,
  },
  coverImage: {
    borderRadius: 8,
    height: 70,
    width: 70,
  },
  status: {
    color: globalColors.greenPrimary,
    fontSize: 14,
  },
});
