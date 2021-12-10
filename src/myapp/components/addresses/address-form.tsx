import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Global styles
import globalColors from '../../styles/colors';
// Hooks
import useStates from '../../hooks/util/useState';
// My Components
import DropdownPicker from '../inputs/dropdown-picker';
import MunicipalityDrop from '../adoption/municipality-drop';
import UserInput from '../inputs/user-input';
// Types
import {AddressFormProps} from '../../types/components/addresses';

const AddressForm = (props: AddressFormProps) => {
  const [stateList, setStateList] = useState([]);
  const dataStates = useStates();
  const [formErrors, setFormErrors] = useState({
    street: '',
    number: '',
    int_number: '',
    reference: '',
    colony: '',
    municipality: '',
    city: '',
    zipcode: '',
  });

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

  useEffect(() => {
    setFormErrors({...formErrors, ...props.error});
  }, [props.error]);

  return (
    <View>
      <UserInput
        placeholder="Calle"
        value={props.form.street}
        onChangeText={(value: string) => {
          props.setForm({...props.form, street: value});
        }}
        error={formErrors.street}
      />
      <UserInput
        placeholder="Número"
        value={props.form.number}
        onChangeText={(value: string) => {
          props.setForm({...props.form, number: value});
        }}
        error={formErrors.number}
      />
      <UserInput
        placeholder="Número Interior"
        value={props.form.int_number}
        onChangeText={(value: string) => {
          props.setForm({...props.form, int_number: value});
        }}
        error={formErrors.int_number}
      />
      <UserInput
        placeholder="Referencia"
        value={props.form.reference}
        onChangeText={(value: string) => {
          props.setForm({...props.form, reference: value});
        }}
        error={formErrors.reference}
      />
      <UserInput
        placeholder="Colonia"
        value={props.form.colony}
        onChangeText={(value: string) => {
          props.setForm({...props.form, colony: value});
        }}
        error={formErrors.colony}
      />
      <DropdownPicker
        currentValue={props.form.state}
        data={stateList}
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
        error={formErrors.municipality}
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
        error={formErrors.city}
        placeholder="Ciudad"
        value={props.form.city}
        onChangeText={(value: string) => {
          props.setForm({...props.form, city: value});
        }}
      />
      <UserInput
        error={formErrors.zipcode}
        placeholder="Codigo Postal"
        value={props.form.zipcode}
        maxLength={5}
        onChangeText={(value: string) => {
          props.setForm({...props.form, zipcode: value});
        }}
      />
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
    marginTop: 0,
    marginBottom: 18,
    fontSize: 14,
    color: globalColors.red,
  },
});

export default AddressForm;
