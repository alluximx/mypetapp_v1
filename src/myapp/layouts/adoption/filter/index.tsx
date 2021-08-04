import React, {useEffect, useState} from 'react';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/default-layout';
import {Dimensions, Image} from 'react-native';
import globalColors from '../../../styles/colors';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import useStates from '../../../hooks/util/useState';
import MunicipalityDrop from '../../../components/adoption/municipality-drop';
import CustomButton from '../../../components/buttons/custom-button';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [status, setStatus] = useState(true);
  const [statusBtn, setStatusBtn] = useState(true);
  const [stateList, setStateList] = useState([]);
  const dataStates = useStates();
  useEffect(() => {
    if (dataStates.data) {
      let aux = [];
      dataStates.data.data.forEach((element) => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setStateList(aux);
    }
  }, [dataStates.data, dataStates.isFetched]);
  const [form, setForm] = useState({
    state: '',
    stateName: '',
    town: '',
    townName: '',
  });
  const changeMunicipality = (valor, name) => {
    valor == '' ? setStatusBtn(true) : setStatusBtn(false);
    valor == ''
      ? setForm({...form, townName: '', town: ''})
      : setForm({...form, townName: name, town: valor});
  };
  const onFind = () => {
    navigation.navigate('AdoptionResult', {
      filter: form,
    });
  };
  return (
    <DefaultLayout
      statusBarStyle={'light-content'}
      style={[styles.container, {color: 'black'}]}>
      <Image
        style={styles.imagePort}
        source={require('../assets/adoprion.png')}
      />
      <Layout style={styles.layoutPort}>
        <TitleHeader>Adopciones</TitleHeader>
        <DefaultText>
          Haz un nuevo amigo y dale un hogar a quién más lo necesita.
        </DefaultText>
        <DropdownPicker
          style={{marginTop: 24}}
          data={stateList}
          currentValue={form.state}
          placeholder="Estado"
          setCurrentValue={(stateId) => {
            setForm({...form, state: stateId});
            stateId != '' ? setStatus(false) : setStatus(true);
            stateId != '' &&
              stateList.map((stateItem) => {
                stateItem.value == stateId &&
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
        />
        <CustomButton
          style={
            statusBtn
              ? {backgroundColor: globalColors.lightGray, marginTop: 14}
              : {marginTop: 14}
          }
          isDisabled={statusBtn}
          onPress={onFind}>
          Buscar
        </CustomButton>
      </Layout>
    </DefaultLayout>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  imagePort: {
    width: width,
    height: 320,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 12,
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  textContent: {
    lineHeight: 24,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: globalColors.darkGray,
  },
});
