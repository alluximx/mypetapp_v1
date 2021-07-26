import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
// Constants.
import {sexOptions} from '../../../../constants';
// Global Styles.
import globalStyles from '../../../../styles/style';
// Hooks.
import useSavePet from '../../../../hooks/pets/useSavePet';
import useSizes from '../../../../hooks/pets/useSizes';
// Models.
import {Size} from '../../../../types/models';
// My Components
import CustomSpinner from '../../../../components/custom-spinner';
import DefaultLayout from '../../../../components/layouts/default-layout';
import DropdownPicker from '../../../../components/inputs/dropdown-picker';
import OptionSelect from '../../../../components/inputs/option-select';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
import DatepickerInput from '../../../../components/inputs/date-picker';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';
// Services
import auth_service from '../../../../services/auth-service';

export default ({navigation, route}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);
  const [isLoading, setIsLoading] = useState(false);
  const addPetQuery = useSavePet();
  const {data: sizes} = useSizes();
  const {data: user} = useQuery('my-profile', () => auth_service.me());
  const sizesList = !sizes
    ? [
        {
          value: null,
          label: 'Cargando...',
        },
      ]
    : sizes?.data.map((option: Size) => {
        return {value: option.id, label: option.name};
      });

  useEffect(() => {
    // Update form after retrieving the user ID.
    if (user) setForm({...form, owner_user: user.data.id});
  }, [user]);

  useLayoutEffect(() => {
    const isDisabled =
      form.sex === '' || form.birthday === '' || form.size === '' || isLoading;

    navigation.setOptions({
      headerRight: () =>
        route.params.renderButtonNext(isDisabled, () => {
          setIsLoading(true);
          addPetQuery.mutate(form);
        }),
      headerLeft: () =>
        route.params.renderButtonBack(() => {
          navigation.goBack();
        }, isLoading),
    });
  }, [navigation, form, isLoading]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
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
        <DatepickerInput
          currentValue={form.birthday}
          onSelect={(birthday) => setForm({...form, birthday})}
          placeholder="DD/MM/AAAA"
          minDate={new Date('Jan 01 1990')}
          maxDate={new Date()}
        />
        {/* <UserInput
          placeholder="DD/MM/AAAA"
          value={form.birthday}
          onChangeText={(value: string) => {
            setForm({...form, birthday: value});
          }}
        /> */}
        <TitleHeader style={[styles.bottomSpace, styles.topSpace]}>
          ¿De qué tamaño es?
        </TitleHeader>
        <DropdownPicker
          data={sizesList}
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
