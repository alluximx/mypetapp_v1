import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import OptionSelect from '../../../components/inputs/option-select';
// UI Kitten
import {List} from '@ui-kitten/components';

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState([]);

  const [form, setForm] = useState({
    pet: '',
    day: '',
    time: '',
    paymentMethod: '',
  });

  const arrayDays = [
    {key: '3', value: 'Lun\n  3'},
    {key: '4', value: 'Mar\n  4'},
    {key: '5', value: 'Mie\n  5'},
    {key: '6', value: 'Jue\n  6'},
    {key: '7', value: 'Vie\n  5'},
  ];
  //setDays(arrayDays);

  return (
    <DefaultLayout>
      <TitleHeader style={styles.header}>Generar cita</TitleHeader>
      <TitleHeader style={styles.header}>¿Para quién es la cita?</TitleHeader>
      <NavigateButton placeholder="Selecciona tu mascota" destination="Home" />
      <TitleHeader>Día</TitleHeader>

      <OptionSelect
        currentValue={form.day}
        setCurrentValue={(day: string) => setForm({...form, day})}
        horizontal={true}
        data={arrayDays}
        style={styles.select}
        optionStyle={styles.options}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    minWidth: 65,
    minHeight: 65,
    fontSize: 1,
    marginLeft: 7,
  },
});
