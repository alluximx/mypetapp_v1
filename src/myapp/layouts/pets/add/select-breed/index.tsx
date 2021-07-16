import React, {useContext, useLayoutEffect, useState, useEffect} from 'react';
import {Spinner} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalStyles from '../../../../styles/style';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import OptionSelect from '../../../../components/inputs/option-select';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';
//Hook
import useGetBreeds from '../../../../hooks/useGetBreeds';

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);
  const [breeds, setBreeds] = useState([]);

  //const isDisabled = form.name === '' || form.image === '';
  const isDisabled = form.breed === '';
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

  const userQuery = useGetBreeds();
  useEffect(() => {
    if (userQuery.data) {
      const data = userQuery.data.data.map((obj: any) => {
        return {key: obj.id, value: obj.name};
      });
      setBreeds(data);
    }
  }, [userQuery.data]);

  return userQuery.isLoading ? (
    <DefaultLayout style={styles.loadingContainer}>
      <Spinner status="success" />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>
        ¿Que raza es{' '}
        <TitleHeader style={globalStyles.highlightedText}>
          {form.name}
        </TitleHeader>
        <TitleHeader> ?</TitleHeader>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    paddingBottom: 0,
  },

  select: {
    marginBottom: 0,
  },

  options: {
    marginTop: 15,
  },
});
