import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// Constants.
import {vaccineTypes} from '../../../constants';
// Global Colors.
import globalColors from '../../../styles/colors';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DatepickerInput from '../../../components/inputs/date-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    vaccineType: '1',
    applicationDate: '2021-02-28',
    expirationDate: '2022-02-28',
    ettiquete: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const isDisabled =
          form.vaccineType === '' ||
          form.applicationDate === '' ||
          form.expirationDate === '' ||
          isLoading;

        return (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isDisabled}
            onPress={() => {
              setIsLoading(true);
              navigation.navigate('DetailPet');
            }}>
            Guardar
          </AnchorText>
        );
      },
    });
  }, [navigation, form, isLoading]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <CustomModal
        labelAccept="Eliminar Vacuna"
        title="Eliminar Vacuna"
        text="¿Seguro que quieres eliminar el registro de esta vacuna?"
        onAccept={() => {
          console.log('Deleting...');
          setIsModalVisible(false);
          navigation.navigate('DetailPet');
        }}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader style={styles.title}>Editar Vacuna</TitleHeader>
      <DropdownPicker
        currentValue={form.vaccineType}
        data={vaccineTypes.map((option) => {
          return {value: option.key, label: option.value};
        })}
        placeholder="Tipo de vacuna"
        setCurrentValue={(vaccineType) => {
          setForm({...form, vaccineType});
        }}
      />
      <DatepickerInput
        currentValue={form.applicationDate}
        onSelect={(applicationDate) => {
          setForm({...form, applicationDate});
        }}
        placeholder="Fecha de aplicación"
      />
      <DatepickerInput
        currentValue={form.expirationDate}
        onSelect={(expirationDate) => {
          setForm({...form, expirationDate});
        }}
        placeholder="Fecha de expiración"
      />
      <AnchorText onPress={() => setIsModalVisible(true)} style={styles.delete}>
        Eliminar
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
  delete: {textAlign: 'center', color: globalColors.red, marginVertical: 16},
});
