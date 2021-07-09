import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import DefaultLayout from '../../../components/layouts/default-layout';
import PetImageInput from '../../../components/inputs/pet-image-input';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';

export default ({navigation, route}): React.ReactElement => {
  const {bread, image, name, sex} = route.params.pet;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form, setForm] = useState({
    image: require('../../home/assets/image-pet-1.jpg'),
    name: name,
    breedId: -1,
    breed: 'Beagle',
    userId: -1,
    sex: 'Macho',
    birthday: '12/07/2018',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText style={styles.headerRight} onPress={() => {}}>
          Guardar
        </AnchorText>
      ),
    });
  }, [navigation]);

  const onDeleteTextPress = () => {
    // Show Confirmation Alert.
    setIsModalVisible(true);
    console.log('deleted pet');
  };

  return (
    <DefaultLayout style={styles.container}>
      <CustomModal
        labelAccept="Eliminar Registro"
        title="Eliminar Registro"
        text="¿Seguro que quieres eliminar este registro?"
        onAccept={() => {}}
        onCancel={() => {}}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader>Editar Perfil</TitleHeader>
      <PetImageInput
        style={styles.imageInput}
        image={form.image}
        setImage={(img: string) => setForm({...form, image: img})}
      />
      <UserInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(value: string) => {
          setForm({...form, name: value});
        }}
      />
      <UserInput
        placeholder="Raza"
        value={form.breed}
        onChangeText={(value: string) => {
          setForm({...form, breed: value});
        }}
      />
      <UserInput
        placeholder="Sexo"
        value={form.sex}
        onChangeText={(value: string) => {
          setForm({...form, sex: value});
        }}
      />
      <UserInput
        placeholder="Cumpleaños"
        value={form.birthday}
        onChangeText={(value: string) => {
          setForm({...form, birthday: value});
        }}
      />
      <AnchorText style={styles.deleteText} onPress={onDeleteTextPress}>
        Eliminar registro
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  headerRight: {
    marginRight: 12,
  },
  imageInput: {
    marginTop: 16,
    marginBottom: 32,
  },
  deleteText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});
