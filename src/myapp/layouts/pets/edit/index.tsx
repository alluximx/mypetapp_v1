import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Constants.
import {sexOptions} from '../../../constants';
// Global styles.
import globalColors from '../../../styles/colors';
// Hooks.
import useGetBreeds from '../../../hooks/useGetBreeds';
import useSizes from '../../../hooks/pets/useSizes';
import useUpdatePet from '../../../hooks/pets/useUpdatePet';
import useDeletePet from '../../../hooks/pets/useDeletePet';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
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
  const deletePetQuery = useDeletePet();

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

  const onUpdate = () => updatePetQuery.mutate(form);

  const isDisabled =
    (!form.name || form.name === name) &&
    (!form.birthday || form.birthday === birthday) &&
    (!form.breed || form.breed === breed.id) &&
    (!form.sex || form.sex === sex) &&
    (!form.size || form.size === size.id) &&
    !form.imageChanged;

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    onRightPress: onUpdate,
    setIsLoading,
    data: form,
  });

  const onDeleteAccept = () => {
    setIsLoading(true);
    deletePetQuery.mutate(form);
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
        setCurrentValue={(petSex: string) => {
          setForm({...form, sex: petSex});
        }}
      />
      <View style={{marginVertical: 8}}>
        <DatepickerInput
          currentValue={form.birthday}
          onSelect={(petBirthday) => setForm({...form, birthday: petBirthday})}
          placeholder="Cumpleaños"
          minDate={new Date('Jan 01 1990')}
          maxDate={new Date()}
        />
      </View>
      <DropdownPicker
        data={sizesList}
        currentValue={form.size}
        placeholder="Tamaño"
        setCurrentValue={(petSize) => setForm({...form, size: petSize})}
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
    color: globalColors.red,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});
