import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
// Global Styles.
import globalStyles from '../../../../styles/style';
// Hooks.
import useSizes from '../../../../hooks/pets/useSizes';
import useSavePet from '../../../../hooks/pets/useSavePet';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import DropdownPicker from '../../../../components/inputs/dropdown-picker';
import OptionSelect from '../../../../components/inputs/option-select';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';
// Services
import auth_service from '../../../../services/auth-service';

const sexOptions = [
  {key: 'M', value: 'Macho'},
  {key: 'H', value: 'Hembra'},
];

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);
  const {data: sizes} = useSizes();
  const addPetQuery = useSavePet();

  const {data: user} = useQuery('my-profile', () => auth_service.me());

  useEffect(() => {
    if (user) {
      setForm({...form, owner_user: user.data.id});
    }
  }, [user]);

  useLayoutEffect(() => {
    const isDisabled = form.sex === '' || form.birthday === '';

    navigation.setOptions({
      headerRight: () =>
        route.params.renderButtonNext(isDisabled, () => {
          addPetQuery.mutate(form, {
            onSuccess: () => {
              // navigation.navigate('Home');
            },
            onError: () => {
              console.log('errorrr!');
            },
          });
        }),
      headerLeft: () =>
        route.params.renderButtonBack(() => {
          navigation.goBack();
        }),
    });
  }, [navigation, form]);

  return (
    <DefaultLayout style={styles.container}>
      <KeyboardAvoidingView>
        <TitleHeader style={styles.bottomSpace}>
          ¿Qué sexo es{' '}
          <TitleHeader style={globalStyles.highlightedText}>
            {form.name}
          </TitleHeader>
          ?
        </TitleHeader>
        <OptionSelect
          currentValue={form.sex}
          setCurrentValue={(sex) => setForm({...form, sex})}
          horizontal={true}
          data={sexOptions}
        />
        <TitleHeader style={styles.bottomSpace}>
          ¿Cuándo cumple años?
        </TitleHeader>
        <UserInput
          placeholder="DD/MM/AAAA"
          value={form.birthday}
          onChangeText={(value: string) => {
            setForm({...form, birthday: value});
          }}
        />
        <TitleHeader style={[styles.bottomSpace, styles.topSpace]}>
          ¿De qué tamaño es?
        </TitleHeader>
        <DropdownPicker
          data={
            !sizes
              ? [
                  {
                    value: null,
                    label: 'Cargando...',
                  },
                ]
              : sizes?.data.map((option) => {
                  return {value: option.id, label: option.name};
                })
          }
          currentValue={form.size}
          placeholder="Seleccione un tamaño..."
          setCurrentValue={(size) => setForm({...form, size})}
        />
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  bottomSpace: {
    marginBottom: 24,
  },
  topSpace: {
    marginTop: 16,
  },
});
