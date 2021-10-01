import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';
import GenericCard from '../../components/cards/generic-card';
import CustomSpinner from '../../components/custom-spinner';
import CustomModal from '../../components/modals/custom-modal';
// Global Styles
import globalVars from '../../styles/vars';
import globalColors from '../../styles/colors';
// Hook
import useGetPaymentMethod from '../../hooks/payment-method/useGetPaymentMethod';
import useDeletePaymentMethod from '../../hooks/payment-method/useDeletePaymentMethod';

export default ({navigation, route}): React.ReactElement => {
  const [cards, setCards] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const paymentQuery = useGetPaymentMethod();
  const deleteQuery = useDeletePaymentMethod();

  useEffect(() => {
    if (paymentQuery.data) {
      setCards(paymentQuery.data.data);
    }
  }, [paymentQuery.data]);

  const onDeleteAccept = () => {
    deleteQuery.mutate(currentId);
    setIsModalVisible(false);
  };

  const previusModal = (id) => {
    setCurrentId(id);
    setIsModalVisible(true);
  };

  const renderServiceItem = (service) => {
    const id = service.item.id;
    const brand = service.item.brand;
    const content = '****' + service.item.last4;

    const data = {
      buttonAlign: 'right',
      buttonColor: globalColors.red,
      buttonText: 'Eliminar',
      buttonTextisSubmit: true,
      date: null,
      content: content,
      images: null,
      styleCard: {},
      title: brand,
      buttonClick: () => {
        previusModal(id);
      },
    };
    return (
      <GenericCard
        data={data}
        isDisabled={true}
        styleCard={{marginHorizontal: 0}}
        onClick={() => {}}
      />
    );
  };

  return paymentQuery.isLoading ? (
    <CustomSpinner />
  ) : cards.length > 0 ? (
    <DefaultLayout>
      <CustomModal
        labelAccept="Eliminar Registro"
        title="Eliminar Registro"
        text="¿Seguro que quieres eliminar este registro?"
        onAccept={onDeleteAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader>Métodos de Pago</TitleHeader>
      <DefaultText style={{marginBottom: 16}}>
        Puedes guardar hasta 3 Métodos de Pago
      </DefaultText>
      <List
        style={styles.servicesContainer}
        data={cards}
        renderItem={renderServiceItem}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../../assets/images/pets/pet-vaccine.png')}
      />
      <TitleHeader style={styles.center}>Métodos de Pago</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        No tienes Métodos de Pago guardados.
      </DefaultText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
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
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
