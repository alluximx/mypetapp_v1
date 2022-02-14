import React, {useState, useEffect} from 'react';
import {StyleService, useStyleSheet, List} from '@ui-kitten/components';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import OptionSelect from '../../../components/inputs/option-select';
import PetCard from '../../../components/cards/pet-card';
import TitleHeader from '../../../components/texts/title-header';
// Hooks
import useMyNameAndPets from '../../../hooks/user/useMyNameAndPets';
import useSizes from '../../../hooks/pets/useSizes';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const {screenToReturn, screenFrom} = route.params ?? {};
  const data = useMyNameAndPets();
  const dataSizes = useSizes(screenFrom && screenFrom !== 'VetDate');
  const hasPets = data.pets.length !== 0;

  const [sizes, setSizes] = useState([]);
  const [idPet, setIdPet] = useState();
  const [sizePet, setSizePet] = useState();
  const [name, setName] = useState();
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
    const sizeName = sizePet
      ? dataSizes.data.data.find((obj) => {
          return obj.id === sizePet && obj.name;
        })
      : '';

    const submitData =
      screenFrom === 'VetDate'
        ? {idPet: idPet, namePet: name}
        : {idPet: idPet, namePet: name, idSize: sizeName.name};

    navigation.navigate(screenToReturn, {
      petInfo: submitData,
      screenFrom: screenFrom,
    });
  };

  const renderPetButton = ({item}) => {
    return (
      <PetCard
        dogProfileImageStyle={styles.imagePet}
        onPress={() => {
          setSubmitData(item.id, item.name);
        }}
        pet={item}
        petNameTextStyle={[
          styles.namePet,
          item.id === idPet ? styles.namePetSelected : styles.namePetDisabled,
        ]}
        profileButtonStyle={[
          styles.buttonPet,
          item.id === idPet
            ? styles.buttonPetSelected
            : styles.buttonPetDisabled,
        ]}
        showAge={false}
      />
    );
  };

  const renderEmptyPetList = (
    <DefaultText style={styles.emptyText}>
      Aún no tienes mascotas agregadas.
    </DefaultText>
  );

  const renderSizesHeader = (
    <>
      <TitleHeader>Selecciona tu mascota</TitleHeader>
      <TitleHeader style={styles.subtitle}>¿Para quién es la cita?</TitleHeader>
      <List
        contentContainerStyle={[
          styles.petButtonsContentContainer,
          !hasPets && styles.petButtonContentContainerEmpty,
        ]}
        data={data.pets}
        horizontal={true}
        ListEmptyComponent={renderEmptyPetList}
        renderItem={renderPetButton}
        style={styles.petButtonsContainer}
      />
      {screenFrom && screenFrom !== 'VetDate' && (
        <TitleHeader style={styles.sizesPrompt}>
          ¿Cuál es el tamaño actual de tu mascota?
        </TitleHeader>
      )}
    </>
  );

  return data.isLoading || dataSizes.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout statusBarStyle={'dark-content'} style={styles.container}>
      <OptionSelect
        currentValue={sizePet}
        data={screenFrom && screenFrom !== 'VetDate' ? sizes : []}
        headerComponent={renderSizesHeader}
        horizontal={false}
        optionStyle={styles.options}
        setCurrentValue={(newSizePet) => setSizePet(newSizePet)}
        style={styles.select}
      />
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
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
  },
  buttonPetDisabled: {
    backgroundColor: globalColors.white,
  },
  buttonPetSelected: {
    backgroundColor: globalColors.greenSecondary,
  },
  namePet: {
    fontSize: 14,
  },
  namePetDisabled: {
    color: globalColors.black,
  },
  namePetSelected: {
    color: globalColors.white,
  },
  imagePet: {
    marginTop: 5,
    height: 56,
    width: 56,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    marginTop: 15,
  },
  sizesPrompt: {fontSize: 16, marginBottom: 16},
});
