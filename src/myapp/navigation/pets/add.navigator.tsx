import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
// Context
import {AddPetContext, AddPetContextType} from '../../context/AddPetContext';
// Global styles
import globalColors from '../../styles/colors';
// My components
import CustomButton from '../../components/buttons/custom-button';
import AnchorText from '../../components/texts/anchor-text';
// Screens
import {NameAndPictureScreen} from '../../scenes/pets/add/name-and-picture.component';
import {SexAndAgeScreen} from '../../scenes/pets/add/sex-and-age.component';
import {SelectBreedScreen} from '../../scenes/pets/add/select-breed.component';

const AddPetStack = createNativeStackNavigator();

const AddPetNavigator = (): React.ReactElement => {
  const [form, setForm] = useState({
    image: '',
    name: '',
    breed: '',
    owner_user: -1,
    sex: '',
    size: '',
    birthday: '',
  });

  const addPetContext = useMemo(
    (): AddPetContextType => ({form: form, setForm: setForm}),
    [form],
  );

  const renderButtonNext = (isDisabled: boolean, onPress: () => void) => (
    <CustomButton
      isDisabled={isDisabled}
      onPress={onPress}
      style={styles.nextButton}>
      Siguiente
    </CustomButton>
  );

  const renderButtonBack = (onPress: () => void) => {
    return <AnchorText onPress={onPress}>Atrás</AnchorText>;
  };

  return (
    <AddPetContext.Provider value={addPetContext}>
      <AddPetStack.Navigator
        initialRouteName="NameAndPicture"
        screenOptions={{
          title: '',
          headerStyle: styles.header,
          headerHideShadow: true,
          headerTopInsetEnabled: false,
          stackAnimation: 'slide_from_right',
        }}>
        <AddPetStack.Screen
          name="NameAndPicture"
          component={NameAndPictureScreen}
          initialParams={{
            renderButtonNext,
          }}
          options={{
            headerHideBackButton: true,
          }}
        />
        <AddPetStack.Screen
          name="SelectBreedScreen"
          component={SelectBreedScreen}
          initialParams={{
            renderButtonNext,
            renderButtonBack,
          }}
        />
        <AddPetStack.Screen
          name="SexAndAge"
          component={SexAndAgeScreen}
          initialParams={{
            renderButtonNext,
            renderButtonBack,
          }}
        />
      </AddPetStack.Navigator>
    </AddPetContext.Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.backgroundDefault,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 26,
  },
});

export default AddPetNavigator;
