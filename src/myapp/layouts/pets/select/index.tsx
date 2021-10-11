import React, {useState, useEffect} from 'react';
import {
  StyleService,
  useStyleSheet,
  List,
  Card,
  Text,
} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import AnchorText from '../../../components/texts/anchor-text';
import PetCard from '../../../components/cards/pet-card';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultText from '../../../components/texts/default-text';
import OptionSelect from '../../../components/inputs/option-select';
// Hooks
import useMyNameAndPets from '../../../hooks/user/useMyNameAndPets';
import useSizes from '../../../hooks/pets/useSizes';

export default ({navigation, route}): React.ReactElement => {
  const data = useMyNameAndPets();
  const dataSizes = useSizes();
  const hasPets = data.pets.length !== 0;
  const styles = useStyleSheet(themedStyles);
  const [sizes, setSizes] = useState([]);
  const [idPet, setIdPet] = useState();
  const [sizePet, setSizePet] = useState();
  const [name, setName] = useState();

  const {screenToReturn, screenFrom} = route.params?.data ?? {};
  const isDisable = screenFrom === 'VetDate' ? !idPet : !idPet || !sizePet;

  useEffect(() => {
    if (dataSizes.data) {
      const dataFormatted = dataSizes.data.data.map((obj: any) => {
        return {key: obj.id, value: obj.name};
      });
      setSizes(dataFormatted);
    }
  }, [dataSizes.data]);

  navigation.setOptions({
    headerRight: () => (
      <AnchorText
        style={styles.headerRight}
        isDisabled={isDisable}
        onPress={() => {
          onRightPress();
        }}>
        Guardar
      </AnchorText>
    ),
  });

  const setSubmitData = (petId, petName) => {
    setIdPet(petId);
    setName(petName);
  };

  const onRightPress = () => {
    const submitData =
      screenFrom === 'VetDate'
        ? {idPet: idPet, namePet: name}
        : {idPet: idPet, namePet: name, idSize: sizePet};

    navigation.navigate(screenToReturn, {
      data: {petInfo: submitData, screenFrom: screenFrom},
    });
  };

  const renderPetButton = (pet) => {
    return (
      <PetCard
        pet={pet.item}
        onPress={() => {
          setSubmitData(pet.item.id, pet.item.name);
        }}
        profileButtonStyle={
          pet.item.id === idPet ? styles.buttonPetSelected : styles.buttonPet
        }
        dogProfileImageStyle={styles.imagePet}
        petNameTextStyle={
          pet.item.id === idPet ? styles.namePetSelected : styles.namePet
        }
        showAge={false}
      />
    );
  };

  return data.isLoading || dataSizes.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <TitleHeader>Selecciona tu mascota</TitleHeader>
      <ScrollView>
        <TitleHeader style={{fontSize: 16, marginTop: 32}}>
          ¿Para quién es la cita?
        </TitleHeader>
        <List
          style={styles.petButtonsContainer}
          horizontal={true}
          contentContainerStyle={[
            styles.petButtonsContentContainer,
            !hasPets && styles.petButtonContentContainerEmpty,
          ]}
          data={data.pets}
          renderItem={renderPetButton}
          ListEmptyComponent={() => (
            <DefaultText style={styles.emptyText}>
              Aún no tienes mascotas agregadas.
            </DefaultText>
          )}
        />
        {screenFrom && screenFrom !== 'VetDate' && (
          <View>
            <TitleHeader style={{fontSize: 16, marginBottom: 16}}>
              ¿Cuál es el tamaño actual de tu mascota?
            </TitleHeader>

            <OptionSelect
              currentValue={sizePet}
              setCurrentValue={(newSizePet) => setSizePet(newSizePet)}
              horizontal={false}
              data={sizes}
              style={styles.select}
              optionStyle={styles.options}
            />
          </View>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  title: {
    textAlign: 'center',
  },
  headerRight: {
    marginRight: 12,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
  },
  petButtonsContentContainer: {
    paddingBottom: 8,
  },
  petButtonContentContainerEmpty: {
    flexDirection: 'column-reverse',
    width: '100%',
    paddingRight: globalVars.outsidePadding,
    paddingTop: 50,
    paddingBottom: 40,
  },
  petButtonsContainer: {
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 21,
  },
  buttonPet: {
    height: 123,
    width: 104,
    backgroundColor: globalColors.white,
  },
  namePet: {
    color: globalColors.black,
  },
  imagePet: {
    height: 56,
    width: 56,
  },
  buttonPetSelected: {
    height: 123,
    width: 104,
    backgroundColor: globalColors.greenSecondary,
  },
  namePetSelected: {
    color: globalColors.white,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    marginTop: 15,
  },
});
