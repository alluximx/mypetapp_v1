import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// Constants.
import {sexOptions} from '../../../constants';
// Hooks.
import useGetBreeds from '../../../hooks/useGetBreeds';
import useSizes from '../../../hooks/pets/useSizes';
import useUpdatePet from '../../../hooks/pets/useUpdatePet';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import PetImageInput from '../../../components/inputs/pet-image-input';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';

export default ({navigation, route}): React.ReactElement => {
  const {birthday, breed, id, name, owner_user, sex, size} = route.params.pet;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {data: breeds} = useGetBreeds();
  const {data: sizes} = useSizes();

  const formList = (queryData) => {
    return !queryData
      ? [
          {
            value: null,
            label: 'Cargando...',
          },
        ]
      : queryData?.data.map((option) => {
          return {value: option.id, label: option.name};
        });
  };

  const sizesList = formList(sizes);
  const breedsList = formList(breeds);
  const updatePetQuery = useUpdatePet();

  const [form, setForm] = useState({
    id: id,
    image: route.params.petImage,
    imageId: route.params.petImageId,
    imageChanged: false,
    name: name,
    breedId: breed.name,
    breed: breed.id,
    owner_user: owner_user,
    sex: sex,
    size: size.id,
    sizeId: size.name,
    birthday: birthday,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText
          style={styles.headerRight}
          isDisabled={isLoading}
          onPress={() => {
            setIsLoading(true);
            updatePetQuery.mutate(form);
          }}>
          Guardar
        </AnchorText>
      ),
    });
  }, [navigation, form, isLoading]);

  const onDeleteAccept = () => {
    console.log('deleted pet');
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
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
        image={form.image}
        setImage={(img) =>
          setForm({
            ...form,
            image: img,
            imageChanged: true,
          })
        }
      />
      <UserInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(value: string) => {
          setForm({...form, name: value});
        }}
      />
      <DropdownPicker
        data={breedsList}
        currentValue={form.breed}
        placeholder="Raza"
        setCurrentValue={(breedId) => setForm({...form, breed: breedId})}
      />
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
      <UserInput
        placeholder="Cumpleaños"
        value={form.birthday}
        onChangeText={(value: string) => {
          setForm({...form, birthday: value});
        }}
      />
      <DropdownPicker
        data={sizesList}
        currentValue={form.size}
        placeholder="Tamaño"
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
  dropdownContainer: {marginBottom: 14},
  deleteText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});
