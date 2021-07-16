import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
// Hooks.
import useUpdatePet from '../../../hooks/pets/useUpdatePet';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import DefaultLayout from '../../../components/layouts/default-layout';
import PetImageInput from '../../../components/inputs/pet-image-input';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
import useMyPetImage from '../../../hooks/pets/useMyPetImage';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import useSizes from '../../../hooks/pets/useSizes';

const sexOptions = [
  {key: 'M', value: 'Macho'},
  {key: 'H', value: 'Hembra'},
];

export default ({navigation, route}): React.ReactElement => {
  const {birthday, breed, id, name, owner_user, sex, size} = route.params.pet;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {data: sizes} = useSizes();
  const [image, setImage] = useState<ImageSourcePropType>(null);
  const {data: petImage} = useMyPetImage(id);
  const updatePetQuery = useUpdatePet();

  useEffect(() => {
    if (petImage) {
      setImage({
        uri: petImage.data[0].file,
      });
    }
  }, [petImage]);

  const [form, setForm] = useState({
    id: id,
    name: name,
    breedId: breed.name,
    breed: breed.id,
    owner_user: owner_user,
    sex: sex,
    size: size.id,
    sizeId: size.name,
    birthday: birthday,
  });

  console.log(form);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText
          style={styles.headerRight}
          onPress={() => {
            updatePetQuery.mutate(form, {
              onSuccess: () => {
                navigation.navigate('Home');
              },
              onError: () => {
                console.log('errorrr!');
              },
            });
          }}>
          Guardar
        </AnchorText>
      ),
    });
  }, [navigation]);

  const onDeleteAccept = () => {
    console.log('deleted pet');
  };

  return (
    <DefaultLayout style={styles.container}>
      <CustomModal
        labelAccept="Eliminar Registro"
        title="Eliminar Registro"
        text="¿Seguro que quieres eliminar este registro?"
        onAccept={onDeleteAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader>Editar Perfil</TitleHeader>
      <PetImageInput
        style={styles.imageInput}
        image={image}
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
        value={form.breedId}
        onChangeText={(value: string) => {
          setForm({...form, breed: value});
        }}
      />
      <View style={{marginBottom: 14}}>
        <DropdownPicker
          data={sexOptions.map((option) => {
            return {value: option.key, label: option.value};
          })}
          currentValue={form.sex}
          placeholder="Sexo"
          setCurrentValue={(sex: string) => {
            setForm({...form, sex});
          }}
        />
      </View>
      <UserInput
        placeholder="Cumpleaños"
        value={form.birthday}
        onChangeText={(value: string) => {
          setForm({...form, birthday: value});
        }}
      />
      <DropdownPicker
        data={
          !sizes
            ? [
                {
                  value: null,
                  label: 'Cargando...',
                },
              ]
            : sizes?.data.map((option) => {
                return {value: option.id, label: option.name};
              })
        }
        currentValue={form.size}
        placeholder="Seleccione un tamaño..."
        setCurrentValue={(size) => setForm({...form, size})}
      />
      <AnchorText
        style={styles.deleteText}
        onPress={() => setIsModalVisible(true)}>
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
