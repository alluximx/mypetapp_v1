import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
// Hooks.
// import useGetCategories from '../../../hooks/categories/useGetCategories';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import RateServiceInput from '../../../components/services/rate-service-input';
import UserTextArea from '../../../components/inputs/user-text-area';
import DefaultText from '../../../components/texts/default-text';
import CustomButton from '../../../components/buttons/custom-button';
import CustomModal from '../../../components/modals/custom-modal';

export default ({navigation}): React.ReactElement => {
  const [data, setData] = useState({
    rating: 0,
    comment: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          value={data.rating}
          setValue={(value: number) => setData({...data, rating: value})}
        />
        <TitleHeader style={styles.question}>
          Si tuviste algún problema con el servicio, por favor háznoslo saber.
        </TitleHeader>
        <UserTextArea
          onChangeText={(value: string) => setData({...data, comment: value})}
          placeholder="Ingresa tu respuesta"
          maxLength={500}
          inputStyle={styles.textAreaInput}
          style={styles.textArea}
          value={data.comment}
        />
        <DefaultText style={styles.charCount}>
          {data.comment.length} / 500
        </DefaultText>
        <CustomButton
          isDisabled={data.rating === 0}
          isLoading={isLoading}
          onPress={() => {
            setIsLoading(true);
            // Timeout just for demostration, will remove it
            // once this is integrated with the api.
            setTimeout(() => {
              setIsLoading(false);
              setModalVisible(true);
            }, 500);
          }}
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
