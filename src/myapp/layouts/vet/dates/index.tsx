import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import OptionSelect from '../../../components/inputs/option-select';
import CustomButton from '../../../components/buttons/custom-button';
import {QuestionCircleIcon} from '../../../components/icons';
import CustomModal from '../../../components/modals/custom-modal';

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState([]);
  const [statusDay, setStatusDay] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    {key: '8', value: '1:00 PM'},
    {key: '9', value: '2:00 PM'},
    {key: '10', value: '1:00 PM'},
    {key: '11', value: '3:00 PM'},
    {key: '12', value: '4:00 PM'},
    {key: '13', value: '5:00 PM'},
  ];

  const numColumns = 4;

  const textModal =
    'Para generar una cita es necesario ' +
    'seleccionar o agregar un método ' +
    'de pago. La cita se cobrará al pasar ' +
    'la fecha y el horario seleccionado\n' +
    'Puedes cancelar hasta 3 horas ' +
    'antes, de lo contrario se te cobrará ' +
    'una penalización';

  const setValueForm = (day: string) => {
    setForm({...form, day});
    setStatusDay(true);
  };

  const SetValueTime = (time: string) => {
    setForm({...form, time});
    setStatusBtn(false);
  };

  return (
    <DefaultLayout>
      <CustomModal
        labelAccept="Entendido"
        title="Método de pago"
        text={textModal}
        onAccept={() => setIsModalVisible(false)}
        showCancel={false}
        visible={isModalVisible}
      />
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
        <View style={{flex: 1, marginBottom: 30}}>
          {statusDay ? (
            <OptionSelect
              currentValue={form.time}
              setCurrentValue={(time: string) => SetValueTime(time)}
              data={arrayTime}
              numColumns={numColumns}
              style={styles.select}
              optionStyle={styles.optionTime}
              textStyle={styles.textOptionTime}
            />
          ) : (
            <View>
              <DefaultText>Por Favor Selecciona una fecha para ver</DefaultText>
              <DefaultText>los horarios disponibles</DefaultText>
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TitleHeader style={styles.normalHeader}> Método de pago</TitleHeader>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}>
            <QuestionCircleIcon style={{}} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 10}}>
          <NavigateButton
            placeholder="Slecciona el método de pago"
            destination="AddPaymentMethod"
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
  },
  optionTime: {
    minWidth: 87,
    height: 40,
    marginRight: 10,
    marginBottom: 15,
    padding: 15,
  },
  textOption: {
    alignSelf: 'center',
    marginTop: -5,
  },
  textOptionTime: {
    fontSize: 13,
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
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
