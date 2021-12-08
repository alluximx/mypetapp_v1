import React, {useContext, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import DefaultText from '../../../../components/texts/default-text';
import PetImageInput from '../../../../components/inputs/pet-image-input';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);

  useLayoutEffect(() => {
    const isDisabled = form.name === '';

    navigation.setOptions({
      headerRight: () =>
        route.params.renderButtonNext(isDisabled, () => {
          navigation.navigate('SelectBreedScreen');
        }),
    });
  }, [navigation, form]);

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <View style={styles.imageInputContainer}>
          <PetImageInput
            image={form.image}
            setImage={(val: any) => setForm({...form, image: val})}
          />
          <DefaultText style={styles.imageInputText}>
            Agrega su mejor foto
          </DefaultText>
        </View>
        <TitleHeader style={styles.title}>
          ¿Cómo se llama tu mascota?
        </TitleHeader>
        <UserInput
          placeholder="Ingresa el nombre de tu mascota"
          value={form.name}
          onChangeText={(value: string) => {
            setForm({...form, name: value});
          }}
        />
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  imageInputContainer: {
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  imageInputText: {
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    marginBottom: 24,
  },
});
