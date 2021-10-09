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
import globalVars from '../../../styles/vars';
// Hooks
import useStates from '../../../hooks/util/useState';

export default ({navigation, route}): React.ReactElement => {
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

  const dataStates = useStates();

  useEffect(() => {
    if (dataStates.data) {
      const data = dataStates.data.data.map((obj: any) => {
        return {value: obj.id, label: obj.name};
      });
      setStateList(data);
    }
  }, [dataStates.data]);

  useEffect(() => {
    // Aqui hay que obtener datos de hook que hace la busqueda
    const data = [
      {
        name: 'Estética Canina',
        address: 'Av. Modelo 1282-1',
        address2: 'Bosques de La Victoria, 44540 Ecatepec de Morelos, México.',
        rating: '4.6',
        distance: '1.5',
        image:
          'https://mpa-stage.s3.amazonaws.com/media/variants_images/arboledas.jpg',
        schedule:
          'Lunes a Viernes - 8:00 am a 9:00 pm, Sábados y Domingos - 11:00 am a 5:00 pm.',
        priceConsult: 200,
      },
      {
        name: 'Groom and Paw',
        address: 'Av.Arboledas 2120',
        address2: 'Bosques de La Victoria, 44540 Ecatepec de Morelos, México.',
        rating: '5',
        distance: '6.3',
        image:
          'https://mpa-stage.s3.amazonaws.com/media/variants_images/dogbox.jpg',
        schedule:
          'Lunes a Viernes - 8:00 am a 9:00 pm, Sábados y Domingos - 11:00 am a 5:00 pm.',
        priceConsult: 200,
      },
    ];

    if (statusData) {
      navigation.navigate('AestheticResult', {
        filter: form,
        data: data,
        filters: {},
      });
      setIsLoading(false);
      setStatusData(false);
    }
  });

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
        source={require('../../../../myapp/assets/images/pets/petAesthetic.png')}
      />
      <TitleHeader>Estéticas</TitleHeader>
      <DefaultText>Busca estéticas cerca de tu ubicación.</DefaultText>
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
