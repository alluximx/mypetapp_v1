import React, {useContext, useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalStyles from '../../../../styles/style';
// My Components.
import CustomSpinner from '../../../../components/custom-spinner';
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import OptionSelect from '../../../../components/inputs/option-select';
// Context.
import {AddPetContext} from '../../../../context/AddPetContext';
// Hook.
import useGetBreeds from '../../../../hooks/useGetBreeds';

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);
  const [breeds, setBreeds] = useState([]);
  const isDisabled = form.breed === '';
  const breedsQuery = useGetBreeds();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        route.params.renderButtonNext(isDisabled, () => {
          navigation.navigate('SexAndAge');
        }),
      headerLeft: () =>
        route.params.renderButtonBack(() => {
          navigation.goBack();
        }),
    });
  }, [navigation, form]);

  useEffect(() => {
    if (breedsQuery.data) {
      const data = breedsQuery.data.data.map((obj: any) => {
        return {key: obj.id, value: obj.name};
      });
      setBreeds(data);
    }
  }, [breedsQuery.data]);

  return breedsQuery.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>
        ¿Qué raza es{' '}
        <TitleHeader style={globalStyles.highlightedText}>
          {form.name}
        </TitleHeader>
        <TitleHeader>?</TitleHeader>
      </TitleHeader>

      <OptionSelect
        currentValue={form.breed}
        setCurrentValue={(breed) => setForm({...form, breed})}
        horizontal={false}
        data={breeds}
        style={styles.select}
        optionStyle={styles.options}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    marginTop: 15,
  },
});
