import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
// Context
import {AddPetContext, AddPetContextType} from '../../context/AddPetContext';
// Global styles
import globalColors from '../../styles/colors';
// My components
import CustomButton from '../../components/buttons/custom-button';
// Screens
import {NameAndPictureScreen} from '../../scenes/pets/add/name-and-picture.component';
import { SelectBreadScreen } from '../../scenes/pets/add/select-bread.component';

const AddPetStack = createNativeStackNavigator();

const AddPetNavigator = (): React.ReactElement => {
  const [form, setForm] = useState({
    image: '',
    name: '',
    breedId: -1,
    userId: -1,
    sex: '',
    birthday: '',
  });

  const addPetContext = useMemo(
    (): AddPetContextType => ({
      form: form,
      setForm: setForm,
    }),
    [form],
  );

  const renderButtonNext = (isDisabled, onPress) => {
    return (
      <CustomButton
        isDisabled={isDisabled}
        onPress={onPress}
        style={styles.nextButton}>
        Siguiente
      </CustomButton>
    );
  };

  return (
    <AddPetContext.Provider value={addPetContext}>
      <AddPetStack.Navigator
        initialRouteName="SelectBreadScreen"
        screenOptions={{
          title: '',
          headerStyle: styles.header,
          headerHideShadow: true,
          headerTopInsetEnabled: false,
        }}>
        <AddPetStack.Screen
          name="NameAndPicture"
          component={NameAndPictureScreen}
          options={{
            headerRight: () => {
              const isDisabled =
                addPetContext.form.name === '' ||
                addPetContext.form.image === '';

              return renderButtonNext(isDisabled, () => {});
            },
            headerHideBackButton: true,
          }}
        />
        <AddPetStack.Screen
          name ="SelectBreadScreen"
          component = {SelectBreadScreen}
        />
        
      </AddPetStack.Navigator>
    </AddPetContext.Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.backgroundDefault,
    padding: 0,
    margin: 0,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 26,
  },
});

export default AddPetNavigator;
