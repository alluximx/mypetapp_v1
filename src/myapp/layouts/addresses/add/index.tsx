import React, {useState, useEffect} from 'react';
import {List, StyleService} from '@ui-kitten/components';
// My components
import TitleHeader from '../../../components/texts/title-header';
import DefaultLayout from '../../../components/layouts/default-layout';
import UserInput from '../../../components/inputs/user-input';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import NavigateButton from '../../../components/buttons/navigate-button';
// Hook.
import useStates from '../../../hooks/util/useState';
import useGetAddress from '../../../hooks/address/useGetAddress';
import useMyNameAndPets from '../../../hooks/user/useMyNameAndPets';

export default ({navigation, route}): React.ReactElement => {
  const [stateList, setStateList] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const userData = useMyNameAndPets();
  const dataStates = useStates();
  const addressQuery = useGetAddress();

  const [form, setForm] = useState({
    name: '',
    stret: '',
    number: '',
    insideNumber: '',
    city: '',
    state: '',
    zipCode: '',
  });

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
    if (addressQuery.data) {
      setAddresses(addressQuery.data.data);
    }
  }, [addressQuery.data]);

  const renderServiceItem = (service) => {
    const street = service.item.street;
    const number = service.item.number;
    const zipCode = service.item.zipcode;
    const city = service.item.city;
    const state = service.item.state.name;

    const user = userData.userName.split(' ')[0];
    const content =
      street + ' #' + number + '\n' + zipCode + ', ' + city + ' ' + state;

    return <NavigateButton title={user} subtitle={content} />;
  };

  return (
    <DefaultLayout>
      <TitleHeader>Envio</TitleHeader>
      <TitleHeader style={styles.subtitle}>Direcciones Guardadas</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={addresses}
        renderItem={renderServiceItem}
      />
      <UserInput
        placeholder="Nombre Completo"
        value={form.name}
        onChangeText={(value: string) => {
          setForm({...form, name: value});
        }}
      />
      <UserInput
        placeholder="Calle"
        value={form.stret}
        onChangeText={(value: string) => {
          setForm({...form, stret: value});
        }}
      />
      <UserInput
        placeholder="Número"
        value={form.number}
        onChangeText={(value: string) => {
          setForm({...form, number: value});
        }}
      />
      <UserInput
        placeholder="Número Interior"
        value={form.insideNumber}
        onChangeText={(value: string) => {
          setForm({...form, insideNumber: value});
        }}
      />
      <UserInput
        placeholder="Ciudad"
        value={form.name}
        onChangeText={(value: string) => {
          setForm({...form, name: value});
        }}
      />
      <DropdownPicker
        data={stateList}
        currentValue={form.state}
        placeholder="Estado"
        setCurrentValue={(stateId) => {
          setForm({...form, state: stateId});
        }}
      />
      <UserInput
        placeholder="Codigo Postal"
        value={form.name}
        onChangeText={(value: string) => {
          setForm({...form, name: value});
        }}
      />
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  subtitle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
