import React, {useState, useEffect} from 'react';
import {List, StyleService} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
// My components
import TitleHeader from '../../../components/texts/title-header';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import UserInput from '../../../components/inputs/user-input';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ReminderInput from '../../../components/inputs/reminder-input';
import MunicipalityDrop from '../../../components/adoption/municipality-drop';
import NavigateButton from '../../../components/buttons/navigate-button';
// Hook.
import useStates from '../../../hooks/util/useState';
import useGetAddresses from '../../../hooks/address/useGetAddresses';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
import useSaveAddress from '../../../hooks/address/useSaveAddress';
// Global Styles
import globalColors from '../../../styles/colors';

export default ({navigation, route}): React.ReactElement => {
  const [stateList, setStateList] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [nameState, setNameState] = useState('');
  const [nameMunicipality, setNameMunicipality] = useState('');
  const dataStates = useStates();
  const addressQuery = useGetAddresses();
  const addAddressQuery = useSaveAddress();

  const [form, setForm] = useState({
    street: '',
    number: '',
    int_number: '',
    reference: '',
    colony: '',
    city: '',
    state: '',
    municipality: '',
    zipcode: '',
    is_saved: false,
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

  const changeValue = () => {
    setIsReminderActive(!isReminderActive);
    setForm({...form, is_saved: !isReminderActive});
  };

  useEffect(() => {
    !isReminderActive && setForm({...form, is_saved: isReminderActive});
  }, [isReminderActive]);

  useEffect(() => {
    addresses.length > 2 && setIsDisable(true);
  }, [addresses.length]);

  const renderServiceItem = ({item}) => {
    const street = item.street;
    const number = item.number;
    const zipcode = item.zipcode;
    const city = item.city;
    const state = item.state.name;
    const title = item.user_address.name;

    const auxData = {
      city,
      colony: item.colony,
      int_number: item.int_number,
      id: item.id,
      is_saved: item.is_saved,
      municipality: {
        id_municipality: item.municipality.id,
        name_municipality: item.municipality.name,
      },
      number,
      reference: item.reference,
      state: {
        id_state: item.state.id,
        name_state: state,
      },
      street,
      zipcode,
    };

    const content =
      street + ' #' + number + '\n' + zipcode + ', ' + city + ' ' + state;

    return (
      <NavigateButton
        title={title}
        subtitle={content}
        destination={'PaymentSummary'}
        data={{address: auxData}}
      />
    );
  };

  const onSavePress = () => {
    const auxData = {
      city: form.city,
      colony: form.colony,
      int_number: form.int_number,
      is_saved: form.is_saved,
      municipality: {
        id_municipality: form.municipality,
        name_municipality: nameMunicipality,
      },
      number: form.number,
      reference: form.reference,
      state: {
        id_state: form.state,
        name_state: nameState,
      },
      street: form.street,
      zipcode: form.zipcode,
    };

    addAddressQuery.mutate(form, {
      onSuccess: (response) => {
        navigation.navigate('PaymentSummary', {
          data: {
            address: {
              ...auxData,
              id: response.data.id,
            },
          },
        });
      },
    });
  };

  const isDisabled =
    form.street === '' ||
    form.number === '' ||
    form.city === '' ||
    form.colony === '' ||
    form.state === '' ||
    form.zipcode === '' ||
    isLoading;

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    setIsLoading,
    onRightPress: onSavePress,
    data: {...form},
  });

  return (
    <DefaultLayout>
      <TitleHeader>Envio</TitleHeader>
      <ScrollView>
        <TitleHeader style={styles.subtitle}>Direcciones guardadas</TitleHeader>
        {addresses && addresses.length > 0 ? (
          <List
            style={styles.servicesContainer}
            data={addresses}
            renderItem={renderServiceItem}
          />
        ) : (
          <DefaultText style={styles.subtitle}>
            No hay direcciones guardadas
          </DefaultText>
        )}

        <TitleHeader style={styles.subtitle}>Nueva dirección</TitleHeader>
        <UserInput
          placeholder="Calle"
          value={form.street}
          onChangeText={(value: string) => {
            setForm({...form, street: value});
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
          value={form.int_number}
          onChangeText={(value: string) => {
            setForm({...form, int_number: value});
          }}
        />
        <UserInput
          placeholder="Referencia"
          value={form.reference}
          onChangeText={(value: string) => {
            setForm({...form, reference: value});
          }}
        />
        <UserInput
          placeholder="Colonia"
          value={form.colony}
          onChangeText={(value: string) => {
            setForm({...form, colony: value});
          }}
        />
        <DropdownPicker
          data={stateList}
          currentValue={form.state}
          placeholder="Estado"
          setCurrentValue={(stateId) => {
            const stateObj = stateList.find((item) => item.value === stateId);
            stateObj ? setNameState(stateObj.label) : setNameState('');
            setForm({...form, state: stateId});
          }}
        />
        <MunicipalityDrop
          status={false}
          id={form.state}
          change={(valor, name) => {
            valor === ''
              ? (setForm({...form, municipality: '', city: ''}),
                setNameMunicipality(''))
              : (setForm({...form, municipality: valor, city: name}),
                setNameMunicipality(name));
          }}
        />
        <UserInput
          placeholder="Ciudad"
          value={form.city}
          onChangeText={(value: string) => {
            setForm({...form, city: value});
          }}
        />
        <UserInput
          placeholder="Codigo Postal"
          value={form.zipcode}
          maxLength={5}
          onChangeText={(value: string) => {
            setForm({...form, zipcode: value});
          }}
        />
        {addresses.length > 2 && (
          <DefaultText style={styles.message}>
            Solo puedes guardar 3 direcciones
          </DefaultText>
        )}
        <ReminderInput
          isActive={isReminderActive}
          setIsActive={changeValue}
          setValue={null}
          value={null}
          text={'Guardar dirección'}
          isDisable={isDisable}
          isNotReminder={true}
        />
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleService.create({
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
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    marginTop: 15,
    height: 100,
  },
});
