import React, {useState, useEffect, useContext} from 'react';
import {StyleService, useStyleSheet, List} from '@ui-kitten/components';
// Context
import {AuthContext} from '../../../context/AuthContext';
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
import useMyPets from '../../../hooks/user/useMyPets';
import useSizes from '../../../hooks/pets/useSizes';
// Types
import {Pet} from '../../../types/models';

export default ({navigation, route}): React.ReactElement => {
  const authContext = useContext(AuthContext);
  const styles = useStyleSheet(themedStyles);
  const petsData = useMyPets(authContext.userId);

  const {isSalon, petId, screenToReturn, sizeId, screenFrom} =
    route.params ?? {};
  const dataSizes = useSizes(!isSalon);

  const [hasPets, setHasPets] = useState(false);
  const [pets, setPets] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [pet, setPet] = useState<Pet>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [petSize, setPetSize] = useState('');

  navigation.setOptions({
    headerRight: () => (
      <AnchorText
        style={styles.headerRight}
        isDisabled={isDisabled}
        onPress={onRightPress}>
        Guardar
      </AnchorText>
    ),
  });

  const onRightPress = () => {
    const sizeName = sizes.find((size) => size.key === petSize)?.value;
    const currentPetName = pets.find((currentPet) => currentPet?.id === pet)
      ?.name;
    const currentPetId = pets.find((currentPet) => currentPet?.id === pet)?.id;

    const submitData =
      screenFrom === 'VetDate'
        ? {petId: currentPetId, petName: currentPetName}
        : {
            petId: currentPetId,
            petName: currentPetName,
            sizeId: petSize,
            sizeName,
          };

    navigation.navigate(screenToReturn, {
      pet: submitData,
      screenFrom: screenFrom,
    });
  };

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    if (sizeId !== '' && petId !== '') {
      const selectedPet = pets.find((currentPet) => currentPet?.id === petId);
      const selectedSize = sizes.find((size) => size?.key === sizeId);
      setPet(selectedPet?.id);
      setPetSize(selectedSize?.key);
    }
  }, [sizeId, petId, pets]);

  useEffect(() => {
    if (petsData.isSuccess) {
      setHasPets(true);
      setPets(petsData.data?.data);
    }
  }, [petsData]);

  useEffect(() => {
    if (dataSizes.isSuccess) {
      const dataFormatted = dataSizes.data.data.map((obj: any) => {
        return {key: obj.id, value: obj.name};
      });
      setSizes(dataFormatted);
    }
  }, [dataSizes.data]);

  useEffect(() => {
    setIsDisabled(!isSalon ? !pet : !pet || !petSize);
  }, [screenFrom, pet, petSize]);

  /**********************
   *** Render Methods ***
   **********************/

  const renderPetButton = ({item}) => (
    <PetCard
      dogProfileImageStyle={styles.imagePet}
      onPress={() => setPet(item.id)}
      pet={item}
      petNameTextStyle={[
        styles.namePet,
        item.id === pet ? styles.namePetSelected : styles.namePetDisabled,
      ]}
      profileButtonStyle={[
        styles.buttonPet,
        item.id === pet ? styles.buttonPetSelected : styles.buttonPetDisabled,
      ]}
      showAge={false}
    />
  );

  const renderEmptyPetList = () => (
    <DefaultText style={styles.emptyText}>
      Aún no tienes mascotas agregadas.
    </DefaultText>
  );

  const renderSizesHeader = () => (
    <>
      <TitleHeader style={styles.paddingHorizontal}>
        Selecciona tu mascota
      </TitleHeader>
      <TitleHeader style={styles.subtitle}>¿Para quién es la cita?</TitleHeader>
      <List
        contentContainerStyle={[
          styles.petButtonsContentContainer,
          !hasPets && styles.petButtonContentContainerEmpty,
        ]}
        data={pets}
        horizontal={true}
        ListEmptyComponent={renderEmptyPetList}
        renderItem={renderPetButton}
        style={styles.petButtonsContainer}
      />
      {screenFrom && screenFrom !== 'VetDate' && (
        <TitleHeader style={[styles.sizesPrompt, styles.paddingHorizontal]}>
          ¿Cuál es el tamaño actual de tu mascota?
        </TitleHeader>
      )}
    </>
  );

  return petsData.isLoading || dataSizes.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout statusBarStyle={'dark-content'} style={styles.container}>
      <OptionSelect
        currentValue={petSize}
        data={screenFrom && screenFrom !== 'VetDate' ? sizes : []}
        headerComponent={renderSizesHeader}
        horizontal={false}
        optionStyle={styles.options}
        setCurrentValue={(newPetSize: string) => setPetSize(newPetSize)}
        style={styles.select}
      />
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: globalColors.backgroundDefault,
    paddingRight: 4,
    paddingHorizontal: 0,
  },
  paddingHorizontal: {
    paddingHorizontal: globalVars.outsidePadding,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: globalVars.outsidePadding,
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
    paddingRight: globalVars.outsidePadding,
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
    marginTop: 8,
    marginBottom: 21,
    paddingLeft: globalVars.outsidePadding,
  },
  buttonPet: {
    height: 123,
    width: 100,
    marginRight: 16,
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
    marginBottom: 0,
  },
  options: {
    marginTop: 15,
    marginHorizontal: globalVars.outsidePadding,
  },
  sizesPrompt: {fontSize: 16, marginBottom: 4},
});
