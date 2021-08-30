import {Card, Text, Toggle} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import {ScrollView, StyleSheet, View} from 'react-native';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import {useState} from 'react';
import useStates from '../../../hooks/util/useState';
import MunicipalityDrop from '../../../components/adoption/municipality-drop';
import UserInput from '../../../components/inputs/user-input';
import globalColors from '../../../styles/colors';
import AnchorText from '../../../components/texts/anchor-text';
import useAdoptionSerch from '../../../hooks/adoption/useAdoptionSerch';
import CloseButton from '../../../components/buttons/close-button';

export default ({navigation, route}): React.ReactElement => {
  const [state, setState] = useState(route.params.adoption.state);
  const [town, setTown] = useState(route.params.adoption.town);
  const [num, setNum] = useState(0);
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [auxList, setAuxList] = useState([]);
  const data = useAdoptionSerch({
    stateId: state,
    municipalityId: town,
    query: query,
    status: true,
  });
  const [form, setForm] = useState({
    stateId: state,
    townId: town,
    stateName: route.params.adoption.stateName,
    townName: route.params.adoption.townName,
    codigo: '',
    male: route.params.filters.male,
    feminine: route.params.filters.feminine,
    onetosix: route.params.filters.onetosix,
    sixtotwelve: route.params.filters.sixtotwelve,
    onetothree: route.params.filters.onetothree,
    threetofive: route.params.filters.threetofive,
    fiveormore: route.params.filters.fiveormore,
  });
  const [stateList, setStateList] = useState([]);
  const dataStates = useStates();
  useEffect(() => {
    if (dataStates.data) {
      const aux = [];
      dataStates.data.data.forEach((element) => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setStateList(aux);
    }
    if (data.data) {
      setNum(data.data.data.length);
      setList(data.data.data);
      setAuxList(data.data.data);
    }
    if (list.length > 0) {
      filters(
        form.feminine,
        form.male,
        form.onetosix,
        form.sixtotwelve,
        form.onetothree,
        form.threetofive,
        form.fiveormore,
      );
    }
  }, [dataStates.data, dataStates.isFetched, data.data, list]);
  const changeMunicipality = (valor, name) => {
    setForm({...form, townId: valor, townName: name});
    setTown(valor);
  };
  navigation.setOptions({
    headerRight: () => (
      <AnchorText
        style={styles.headerRight}
        onPress={() => {
          navigation.navigate('AdoptionResult', {
            filter: {
              state: form.stateId,
              town: form.townId,
              stateName: form.stateName,
              townName: form.townName,
              query: '',
            },
            data: auxList,
            filters: {
              male: form.male,
              feminine: form.feminine,
              onetosix: form.onetosix,
              sixtotwelve: form.sixtotwelve,
              onetothree: form.onetothree,
              threetofive: form.threetofive,
              fiveormore: form.fiveormore,
            },
          });
        }}>
        Aplicar
      </AnchorText>
    ),
    headerLeft: () => <CloseButton navigation={navigation} />,
  });
  const filters = (
    feminine,
    male,
    onetosix,
    sixtotwelve,
    onetothree,
    threetofive,
    fiveormore,
  ) => {
    const aux = [];
    if ((feminine && male) || (!feminine && !male)) {
      list.map((adoption) => {
        aux.push(adoption);
      });
    } else if (feminine) {
      list.map((adoption) => {
        adoption.sex === 'H' && aux.push(adoption);
      });
    } else if (male) {
      list.map((adoption) => {
        adoption.sex === 'M' && aux.push(adoption);
      });
    }
    const auxFin = [];
    if (
      (onetosix && sixtotwelve && onetothree && threetofive && fiveormore) ||
      (!onetosix && !sixtotwelve && !onetothree && !threetofive && !fiveormore)
    ) {
      auxFin.push(...aux);
    } else {
      if (onetosix) {
        aux.map((adoption) => {
          adoption.ageNumber >= 1 &&
            adoption.ageNumber <= 6 &&
            adoption.ageType === 'M' &&
            auxFin.push(adoption);
        });
      }
      if (sixtotwelve) {
        aux.map((adoption) => {
          adoption.ageNumber >= 6 &&
            adoption.ageNumber <= 12 &&
            adoption.ageType === 'M' &&
            auxFin.push(adoption);
        });
      }
      if (onetothree) {
        aux.map((adoption) => {
          adoption.ageNumber >= 1 &&
            adoption.ageNumber <= 3 &&
            adoption.ageType === 'Y' &&
            auxFin.push(adoption);
        });
      }
      if (threetofive) {
        aux.map((adoption) => {
          adoption.ageNumber >= 3 &&
            adoption.ageNumber <= 5 &&
            adoption.ageType === 'Y' &&
            auxFin.push(adoption);
        });
      }
      if (fiveormore) {
        aux.map((adoption) => {
          adoption.ageNumber >= 5 &&
            adoption.ageType === 'Y' &&
            auxFin.push(adoption);
        });
      }
    }
    setAuxList(auxFin);
    setNum(auxFin.length);
  };
  return (
    <DefaultLayout>
      <TitleHeader>Filtros</TitleHeader>
      <DefaultText>{num} Resultados</DefaultText>
      <ScrollView style={{marginTop: 24, marginBottom: 20}}>
        <TitleHeader style={{fontSize: 16}}>Ubicación</TitleHeader>
        <DropdownPicker
          style={{marginTop: 24}}
          data={stateList}
          currentValue={form.stateId}
          placeholder="Estado"
          setCurrentValue={(stateId) => {
            setForm({...form, stateId: stateId});
            setState(stateId);
          }}
        />
        <MunicipalityDrop
          status={false}
          id={form.stateId}
          change={changeMunicipality}
          idTown={form.townId}
        />
        <UserInput
          placeholder="Código Postal"
          value={form.codigo}
          onChangeText={(value: string) => {
            setForm({...form, codigo: value});
          }}
        />
        <TitleHeader style={{fontSize: 16, marginTop: 30}}>Sexo</TitleHeader>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Hembra</Text>
            <Toggle
              checked={form.feminine}
              onChange={(isCheck) => {
                setForm({...form, feminine: isCheck});
                filters(
                  isCheck,
                  form.male,
                  form.onetosix,
                  form.sixtotwelve,
                  form.onetothree,
                  form.threetofive,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Macho</Text>
            <Toggle
              checked={form.male}
              onChange={(isCheck) => {
                setForm({...form, male: isCheck});
                filters(
                  form.feminine,
                  isCheck,
                  form.onetosix,
                  form.sixtotwelve,
                  form.onetothree,
                  form.threetofive,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <TitleHeader style={{fontSize: 16, marginTop: 16}}>Edad</TitleHeader>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>1 a 6 meses</Text>
            <Toggle
              checked={form.onetosix}
              onChange={(isCheck) => {
                setForm({...form, onetosix: isCheck});
                filters(
                  form.feminine,
                  form.male,
                  isCheck,
                  form.sixtotwelve,
                  form.onetothree,
                  form.threetofive,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>6 a 12 meses</Text>
            <Toggle
              checked={form.sixtotwelve}
              onChange={(isCheck) => {
                setForm({...form, sixtotwelve: isCheck});
                filters(
                  form.feminine,
                  form.male,
                  form.onetothree,
                  isCheck,
                  form.onetothree,
                  form.threetofive,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Menos de 3 años</Text>
            <Toggle
              checked={form.onetothree}
              onChange={(isCheck) => {
                setForm({...form, onetothree: isCheck});
                filters(
                  form.feminine,
                  form.male,
                  form.onetosix,
                  form.sixtotwelve,
                  isCheck,
                  form.threetofive,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Menos de 5 años</Text>
            <Toggle
              checked={form.threetofive}
              onChange={(isCheck) => {
                setForm({...form, threetofive: isCheck});
                filters(
                  form.feminine,
                  form.male,
                  form.onetosix,
                  form.sixtotwelve,
                  form.onetothree,
                  isCheck,
                  form.fiveormore,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Más de 5 años</Text>
            <Toggle
              checked={form.fiveormore}
              onChange={(isCheck) => {
                setForm({...form, fiveormore: isCheck});
                filters(
                  form.feminine,
                  form.male,
                  form.onetosix,
                  form.sixtotwelve,
                  form.onetothree,
                  form.threetofive,
                  isCheck,
                );
              }}
              status="success"
              style={styles.toggleInput}>
              {''}
            </Toggle>
          </View>
        </Card>
      </ScrollView>
    </DefaultLayout>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    height: 56,
    marginVertical: 16,
    marginBottom: 0,
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: globalColors.darkerGray,
  },
  toggleInput: {
    height: 26,
  },
  option: {marginBottom: 16},
  headerRight: {
    marginRight: 12,
  },
});
