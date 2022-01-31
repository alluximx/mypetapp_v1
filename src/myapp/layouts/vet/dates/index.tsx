import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import 'moment/locale/es';
import moment from 'moment';
import _ from 'lodash';

// Constants
import {stripeDaysForTransaction} from '../../../constants';
// Global Styles
import globalVars from '../../../styles/vars';
// My Components
import CustomButton from '../../../components/buttons/custom-button';
import CustomModal from '../../../components/modals/custom-modal';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import OptionSelect from '../../../components/inputs/option-select';
import TitleHeader from '../../../components/texts/title-header';
import {QuestionCircleIcon} from '../../../components/icons';
// Utils
import {checkIfDayIsEnabledInVetSettings} from '../../../utils';
// Types
import {Option} from '../../../types/components/inputs';

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState<Option[]>([]);
  const [hours, setHours] = useState<Option[]>([]);
  const [statusDay, setStatusDay] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSubmitVisible, setIsModalSubmitVisible] = useState(false);
  const [form, setForm] = useState({
    pet: '',
    day: '',
    time: '',
    paymentMethod: '',
    card_id: '',
    pet_id: '',
  });

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    moment.locale('es');
    // Get next available days
    const nextDaysList: Option[] = [];
    for (let i = 0; i <= stripeDaysForTransaction; i++) {
      const currentNextDay = moment().add(i, 'days');
      const currentNextDayName = currentNextDay.format('ddd');
      const currentNextDayNumber = currentNextDay.format('D');
      const currentNextDayWeekIndex = Number(currentNextDay.format('d'));
      const isDayEnabled = checkIfDayIsEnabledInVetSettings(
        currentNextDayWeekIndex,
        route.params.data,
      );

      nextDaysList.push({
        key: currentNextDayWeekIndex + currentNextDayName,
        title: _.capitalize(currentNextDayName),
        value: currentNextDayNumber,
        isDisabled: !isDayEnabled,
      });
    }
    setDays(nextDaysList);
  }, []);

  useEffect(() => {
    const currentDay = moment().format('YYYY-MM-DD');
    const {end_time, start_time, time_slots} = route.params.data;
    const startTime = moment(currentDay + ' ' + start_time);
    const endTime = moment(currentDay + ' ' + end_time);
    // Load hours.
    const allHours: Option[] = [];

    let hasReachedEndTime = false;
    while (!hasReachedEndTime) {
      // Add amount of minutes to start time.
      const currentTime = startTime
        .add(time_slots, 'minutes')
        .format('hh:mm A');

      allHours.push({
        key: currentTime,
        value: currentTime,
      });

      if (startTime.isSameOrAfter(endTime)) {
        hasReachedEndTime = true;
      }
    }
    setHours(allHours);
  }, [form.day]);

  const numColumns = 4;

  const {screenFrom, petInfo, paymentMethod, serviceData} =
    route.params?.data ?? {};
  // PaymentInfo
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  // PetInfo
  const [petContent, setPetContent] = useState('');
  // Service Info
  const [serviceContent, setServiceContent] = useState('');

  useEffect(() => {
    if (petInfo) {
      const {namePet, idPet, idSize} = petInfo;
      const complt = idSize ? ' - ' + idSize : '';
      setPetContent(namePet + complt);
      setForm({...form, pet_id: idPet});
    }
    if (paymentMethod) {
      const {cardLabel, cardBrand, cardId} = paymentMethod;
      setCardTitle(cardBrand);
      setCardContent(cardLabel);
      setForm({...form, card_id: cardId});
    }
    if (serviceData) {
      serviceData.length === 1
        ? setServiceContent(serviceData[0].name)
        : setServiceContent('Varios');
    }
  }, [petInfo, paymentMethod, serviceData]);

  const textModal =
    'Para generar una cita es necesario ' +
    'seleccionar o agregar un método ' +
    'de pago. La cita se cobrará al pasar ' +
    'la fecha y el horario seleccionado.\n' +
    'Puedes cancelar hasta 3 horas ' +
    'antes, de lo contrario se te cobrará ' +
    'una penalización.';

  const textSubmitModal =
    'Tu cita ha sido generada ' +
    'exitósamente. Puedes acceder a ' +
    'todos tus servicios programados ' +
    'desde la sección de "Proximos ' +
    'Servicios" en el menú principal. ';

  const setValueForm = (day: string) => {
    setForm({...form, day});
    setStatusDay(true);
  };

  const SetValueTime = (time: string) => {
    setForm({...form, time});
    setStatusBtn(false);
  };

  return (
    <DefaultLayout style={styles.container}>
      <CustomModal
        labelAccept="Entendido"
        title="Método de pago"
        text={textModal}
        onAccept={() => setIsModalVisible(false)}
        showCancel={false}
        visible={isModalVisible}
      />
      <CustomModal
        labelAccept="Entendido"
        title="Cita generada"
        text={textSubmitModal}
        onAccept={() => setIsModalSubmitVisible(false)}
        showCancel={false}
        visible={isModalSubmitVisible}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.horizontalPadding}>
          <TitleHeader style={styles.header}>
            {route.params.isEdit ? 'Editar cita' : 'Generar cita'}
          </TitleHeader>
          <TitleHeader style={styles.normalHeader}>
            ¿Para quién es la cita?
          </TitleHeader>
          <View style={{marginBottom: 10}}>
            <NavigateButton
              placeholder="Selecciona tu mascota"
              destination="PetSelect"
              data={{screenToReturn: 'VetDate', screenFrom: screenFrom}}
              title="Mascota"
              subtitle={petContent}
            />
          </View>

          {screenFrom && screenFrom === 'AestheticDate' && (
            <View>
              <TitleHeader style={styles.normalHeader}>
                ¿Qué servicio necesita tu mascota?
              </TitleHeader>
              <NavigateButton
                placeholder="Selecciona los servicios"
                destination="ServiceSelect"
                data={{screenToReturn: 'VetDate', screenFrom: screenFrom}}
                title="Servicio"
                subtitle={serviceContent}
              />
            </View>
          )}

          <TitleHeader style={styles.normalHeader}>Día</TitleHeader>
        </View>
        <OptionSelect
          containerStyle={styles.selectContainer}
          currentValue={form.day}
          setCurrentValue={(day: string) => setValueForm(day)}
          enableScroll={true}
          horizontal={true}
          data={days}
          style={styles.select}
          optionStyle={styles.options}
          textStyle={styles.textOption}
          titleStyle={styles.titleOption}
        />

        <View style={styles.horizontalPadding}>
          <TitleHeader style={styles.normalHeader}>Horario</TitleHeader>
          <View style={styles.hourList}>
            {statusDay ? (
              <OptionSelect
                currentValue={form.time}
                setCurrentValue={(time: string) => SetValueTime(time)}
                data={hours}
                numColumns={numColumns}
                style={styles.select}
                optionStyle={styles.optionTime}
                textStyle={styles.textOptionTime}
              />
            ) : (
              <View style={styles.hourListEmptyContainer}>
                <DefaultText>
                  Por favor selecciona una fecha para ver
                </DefaultText>
                <DefaultText>los horarios disponibles</DefaultText>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TitleHeader style={styles.normalHeader}>
              {' '}
              Método de pago
            </TitleHeader>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <QuestionCircleIcon style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 10}}>
            <NavigateButton
              placeholder="Selecciona el método de pago"
              destination="AddPaymentMethod"
              data={{screenToReturn: 'VetDate', screenFrom: screenFrom}}
              subtitle={cardContent}
              title={cardTitle}
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
                setIsModalSubmitVisible(true);
              }}>
              Generar cita
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  horizontalPadding: {
    paddingHorizontal: globalVars.outsidePadding,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  normalHeader: {
    marginBottom: 20,
    fontSize: 18,
  },
  hourList: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  select: {
    marginBottom: 16,
  },
  selectContainer: {
    paddingLeft: globalVars.outsidePadding,
    paddingRight: globalVars.outsidePadding / 2,
    marginBottom: 16,
  },
  options: {
    width: 'auto',
    height: 70,
    borderRadius: 16,
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
  hourListEmptyContainer: {
    marginBottom: 24,
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
