import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Global styles
import globalColors from '../../styles/colors';
// Hooks
import useStates from '../../hooks/util/useState';
// My Components
import DefaultText from '../texts/default-text';
import DropdownPicker from '../inputs/dropdown-picker';
import MunicipalityDrop from '../adoption/municipality-drop';
import UserInput from '../inputs/user-input';
// Types
import {AddressFormProps} from '../../types/components/addresses';

const AddressForm = (props: AddressFormProps) => {
  const [stateList, setStateList] = useState([]);
  const dataStates = useStates();

  /***************
   *** Effects ***
   ***************/

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
  }, [dataStates.data, dataStates.isFetched]);

  return (
    <View>
      <UserInput
        placeholder="Calle"
        value={props.form.street}
        onChangeText={(value: string) => {
          props.setForm({...props.form, street: value});
        }}
      />
      <UserInput
        placeholder="Número"
        value={props.form.number}
        onChangeText={(value: string) => {
          props.setForm({...props.form, number: value});
        }}
      />
      <UserInput
        placeholder="Número Interior"
        value={props.form.int_number}
        onChangeText={(value: string) => {
          props.setForm({...props.form, int_number: value});
        }}
      />
      <UserInput
        placeholder="Referencia"
        value={props.form.reference}
        onChangeText={(value: string) => {
          props.setForm({...props.form, reference: value});
        }}
      />
      <UserInput
        placeholder="Colonia"
        value={props.form.colony}
        onChangeText={(value: string) => {
          props.setForm({...props.form, colony: value});
        }}
      />
      <DropdownPicker
        data={stateList}
        currentValue={props.form.state}
        placeholder="Estado"
        setCurrentValue={(stateId) => {
          if (props.setNameState) {
            const stateObj = stateList.find((item) => item.value === stateId);
            stateObj
              ? props.setNameState(stateObj.label)
              : props.setNameState('');
          }
          props.setForm({...props.form, state: stateId});
        }}
      />
      <MunicipalityDrop
        status={false}
        id={props.form.state}
        change={(valor, name) => {
          if (props.setNameMunicipality) {
            valor === ''
              ? (props.setForm({...props.form, municipality: ''}),
                props.setNameMunicipality(''))
              : (props.setForm({...props.form, municipality: valor}),
                props.setNameMunicipality(name));
          } else {
            props.setForm({...props.form, municipality: valor});
          }
        }}
      />
      <UserInput
        placeholder="Ciudad"
        value={props.form.city}
        onChangeText={(value: string) => {
          props.setForm({...props.form, city: value});
        }}
      />
      <UserInput
        placeholder="Codigo Postal"
        value={props.form.zipcode}
        maxLength={5}
        onChangeText={(value: string) => {
          props.setForm({...props.form, zipcode: value});
        }}
      />
      {props.addresses.length > 2 && (
        <DefaultText style={styles.message}>
          Solo puedes guardar 3 direcciones
        </DefaultText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: globalColors.red,
  },
});

export default AddressForm;
