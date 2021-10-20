import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import MunicipalityDrop from '../../../components/adoption/municipality-drop';
import CustomButton from '../../../components/buttons/custom-button';
// Global styles
import globalColors from '../../../styles/colors';
// Hooks
import useGeolocation from '../../../hooks/useGeolocation';
import useStates from '../../../hooks/util/useState';
import useVets from '../../../hooks/vets/useVets';

export default ({navigation, route}): React.ReactElement => {
  useGeolocation();
  const [stateList, setStateList] = useState([]);
  const [status, setStatus] = useState(true);
  const [statusBtn, setStatusBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState(false);

  const [form, setForm] = useState({
    state: '',
    stateName: '',
    town: '',
    townName: '',
    query: null,
  });

  const data = useVets({
    stateId: form.state,
    municipalityId: form.town,
    status: statusData,
  });

  const dataStates = useStates();

  useEffect(() => {
    if (dataStates.data) {
      const dataFormatted = dataStates.data.data.map((obj: any) => {
        return {value: obj.id, label: obj.name};
      });
      setStateList(dataFormatted);
    }
  }, [dataStates.data]);

  useEffect(() => {
    if (data.data) {
      if (statusData) {
        navigation.navigate('VetResult', {
          filter: form,
          data: data.data.data,
          filters: {},
        });
        setIsLoading(false);
        setStatusData(false);
      }
    }
  }, [data.data]);

  const changeMunicipality = (valor, name) => {
    valor === '' ? setStatusBtn(true) : setStatusBtn(false);
    valor === ''
      ? setForm({...form, townName: '', town: '', query: ''})
      : setForm({...form, townName: name, town: valor, query: ''});
  };

  return (
    <DefaultLayout>
      <Image
        style={styles.dogImage}
        source={require('../../../../myapp/assets/images/pets/petVetIamge.png')}
      />
      <TitleHeader>Veterinarias</TitleHeader>
      <DefaultText>Buscar veterinarias cerca de tu ubicación</DefaultText>
      <DropdownPicker
        style={{marginTop: 24}}
        data={stateList}
        currentValue={form.state}
        placeholder="Estado"
        setCurrentValue={(stateId) => {
          stateId !== '' ? setStatus(false) : setStatus(true);
          stateId !== '' &&
            stateList.map((stateItem) => {
              stateItem.value === stateId &&
                setForm({
                  ...form,
                  stateName: stateItem.label,
                  state: stateId,
                });
            });
        }}
      />
      <MunicipalityDrop
        status={status}
        id={form.state}
        change={changeMunicipality}
        idTown={form.town}
      />
      <CustomButton
        isDisabled={statusBtn}
        isLoading={isLoading}
        onPress={() => {
          setIsLoading(true);
          setStatusData(true);
        }}>
        Buscar
      </CustomButton>
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  dogImage: {
    width: width,
    maxHeight: 360,
    height: '50%',
    alignSelf: 'center',
    resizeMode: 'contain',
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    paddingBottom: 16,
  },
});
