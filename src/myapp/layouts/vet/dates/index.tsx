import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
// UI Kitten
import {List, ListItem} from '@ui-kitten/components';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import OptionSelect from '../../../components/inputs/option-select';
import CustomButton from '../../../components/buttons/custom-button';

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState([]);
  const [statusDay, setStatusDay] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    pet: '',
    day: '',
    time: '',
    paymentMethod: '',
  });

  const arrayDays = [
    {key: '3', title: 'Lun', value: '3'},
    {key: '4', title: 'Mar', value: '4'},
    {key: '5', title: 'Mie', value: '5'},
    {key: '6', title: 'Jue', value: '6'},
    {key: '7', title: 'Vie', value: '7'},
    {key: '8', title: 'Sab', value: '8'},
    {key: '9', title: 'Lun', value: '9'},
  ];

  const arrayTime = [
    {key: '1', value: '8:00 AM'},
    {key: '2', value: '9:00 AM'},
    {key: '3', value: '10:00 AM'},
    {key: '4', value: '11:00 AM'},
    {key: '5', value: '12:00 PM'},
    {key: '6', value: '1:00 PM'},
    {key: '7', value: '2:00 PM'},
  ];

  const setValueForm = (day: string) => {
    setForm({...form, day});
    setStatusDay(true);
    setStatusBtn(false);
  };

  const renderOption = (service) => {
    return (
      <View style={{marginRight: 10}}>
        <TitleHeader>{service.item.value}</TitleHeader>
      </View>
    );
  };

  return (
    <DefaultLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleHeader style={styles.header}>Generar cita</TitleHeader>
        <TitleHeader style={styles.normalHeader}>
          ¿Para quién es la cita?
        </TitleHeader>
        <View style={{marginBottom: 10}}>
          <NavigateButton
            placeholder="Selecciona tu mascota"
            destination="Home"
          />
        </View>

        <TitleHeader style={styles.normalHeader}>Día</TitleHeader>
        <View style={{marginBottom: 10}}>
          <OptionSelect
            currentValue={form.day}
            setCurrentValue={(day: string) => setValueForm(day)}
            enableScroll={true}
            horizontal={true}
            data={arrayDays}
            style={styles.select}
            optionStyle={styles.options}
            textStyle={styles.textOption}
            titleStyle={styles.titleOption}
          />
        </View>

        <TitleHeader style={styles.normalHeader}>Horario</TitleHeader>
        <View style={{marginBottom: 30}}>
          {statusDay ? (
            <List
              style={styles.servicesContainer}
              data={arrayTime}
              renderItem={renderOption}
              numColumns={Math.ceil(arrayTime.length / 2)}
            />
          ) : (
            <View>
              <DefaultText>Por Favor Selecciona una fecha para ver</DefaultText>
              <DefaultText>los horarios disponibles</DefaultText>
            </View>
          )}
        </View>
        <TitleHeader style={styles.normalHeader}> Método de pago</TitleHeader>
        <View style={{marginBottom: 10}}>
          <NavigateButton
            placeholder="Slecciona el método de pago"
            destination="Home"
          />
        </View>
        <View style={styles.totalContainer}>
          <DefaultText style={{justifyContent: 'flex-start'}}>
            Consulta
          </DefaultText>
          <DefaultText style={{justifyContent: 'flex-end'}}>
            $200.00
          </DefaultText>
        </View>
        <View style={styles.totalContainer}>
          <TitleHeader style={{justifyContent: 'flex-start'}}>
            Total
          </TitleHeader>
          <TitleHeader style={{justifyContent: 'flex-end'}}>
            $200.00
          </TitleHeader>
        </View>
        <View style={{marginBottom: 20}}>
          <CustomButton
            isDisabled={statusBtn}
            isLoading={isLoading}
            onPress={() => {
              setIsLoading(true);
            }}>
            Buscar
          </CustomButton>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  normalHeader: {
    marginBottom: 20,
    fontSize: 18,
  },
  select: {
    marginBottom: 16,
  },
  options: {
    width: null,
    height: 65,
    fontSize: 1,
  },
  textOption: {
    alignSelf: 'center',
    marginTop: -5,
  },
  titleOption: {
    fontSize: 15,
    marginTop: -5,
  },
  totalContainer: {
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
