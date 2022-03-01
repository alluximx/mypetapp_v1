import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
// Hooks.
import useRateAppointment from '../../../hooks/vets/useRateAppointment';
// My Components.
import CustomButton from '../../../components/buttons/custom-button';
import CustomModal from '../../../components/modals/custom-modal';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import RateServiceInput from '../../../components/services/rate-service-input';
import TitleHeader from '../../../components/texts/title-header';
import UserTextArea from '../../../components/inputs/user-text-area';
// Types
import {RateRouteParams} from '../../../types/navigation/home-navigator';

export default ({navigation}): React.ReactElement => {
  const route = useRoute<RateRouteParams>();
  const [data, setData] = useState({
    rate: 0,
    feedback: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rateQuery = useRateAppointment(route.params.services !== undefined);

  const onSubmit = () => {
    setIsLoading(true);
    rateQuery.mutate(
      {
        id: route.params?.appointmentId,
        ...data,
      },
      {
        onSuccess: () => setModalVisible(true),
        onError: () =>
          Alert.alert(
            'Error',
            'Hubo un problema al guardar la calificación. Intenta nuevamente más tarde',
          ),
        onSettled: () => setIsLoading(false),
      },
    );
  };

  return (
    <DefaultLayout style={styles.container}>
      <CustomModal
        labelAccept="Entendido"
        text="Muchas gracias por tus comentarios."
        title="Calificación enviada"
        onAccept={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        visible={modalVisible}
        showCancel={false}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TitleHeader style={styles.title}>Calificar Servicio</TitleHeader>
        <TitleHeader style={styles.question}>
          ¿Cómo calificarías el servicio que recibió tu mascota?
        </TitleHeader>
        <RateServiceInput
          value={data.rate}
          setValue={(value: number) => setData({...data, rate: value})}
        />
        <TitleHeader style={styles.question}>
          Si tuviste algún problema con el servicio, por favor háznoslo saber.
        </TitleHeader>
        <UserTextArea
          onChangeText={(value: string) => setData({...data, feedback: value})}
          placeholder="Ingresa tu respuesta"
          maxLength={500}
          inputStyle={styles.textAreaInput}
          style={styles.textArea}
          value={data.feedback}
        />
        <DefaultText style={styles.charCount}>
          {data.feedback.length} / 500
        </DefaultText>
        <CustomButton
          isDisabled={data.rate === 0}
          isLoading={isLoading}
          onPress={onSubmit}
          style={styles.button}>
          Enviar Calificación
        </CustomButton>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 8,
  },
  scrollView: {
    marginRight: 16,
  },
  title: {
    marginBottom: 32,
  },
  question: {
    fontSize: 16,
    marginBottom: 16,
  },
  charCount: {
    fontSize: 14,
    textAlign: 'right',
  },
  textArea: {
    height: 280,
  },
  textAreaInput: {
    height: 270,
  },
  button: {
    marginVertical: 32,
  },
});
