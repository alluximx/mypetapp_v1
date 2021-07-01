import React, {useContext} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
// My Components
import DefaultLayout from '../../../../components/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';

export default ({navigation}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <TitleHeader>¿Cómo se llama tu mascota?</TitleHeader>
        <UserInput
          placeholder="Ingresa el nombre de tu mascota"
          value={form.name}
          onChangeText={(value: string) => {
            setForm({
              ...form,
              name: value,
            });
          }}
        />
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};
