import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
import OptionSelect, {
  OPTION_GAP,
} from '../../../components/inputs/option-select';
import TitleHeader from '../../../components/texts/title-header';
import {QuestionCircleIcon} from '../../../components/icons';
// Utils
import {checkIfDayIsEnabledInVetSettings} from '../../../utils';
// Types
import {Option, OptionDate} from '../../../types/components/inputs';
import {Appointment} from '../../../types/models';
import useVetAppointments from '../../../hooks/vets/useVetAppointments';
import {getAvailableDays, getAvailableHours} from './utils';
import CustomSpinner from '../../../components/custom-spinner';

const NUM_COLUMNS = 4;

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState<OptionDate[]>([]);
  const [hours, setHours] = useState<Option[]>([]);
  const [statusDay, setStatusDay] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // Modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSubmitVisible, setIsModalSubmitVisible] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [emptyText, setEmptyText] = useState(
    'Por favor selecciona una fecha para ver los horarios disponibles.',
  );

  const [petContent, setPetContent] = useState('');
  const [serviceContent, setServiceContent] = useState('');
  const [form, setForm] = useState({
    card_id: '',
    day: '',
    paymentMethod: '',
    pet_id: '',
    pet: '',
    time: '',
  });

  const vetAppointments = useVetAppointments(route.params.data.admin);
  const {base_charge, paymentMethod, petInfo, screenFrom, serviceData} =
    route.params?.data ?? {};

  const setValueForm = (day: string) => {
    setForm({...form, day});
    setStatusDay(true);
  };

  const setValueTime = (time: string) => {
    setForm({...form, time});
    setStatusBtn(false);
  };

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    moment.locale('es');
    const nextDaysList = getAvailableDays(route.params.data);
    setDays(nextDaysList);
  }, []);

  useEffect(() => {
    if (form.day) {
      setHours([]);
      const selectedDate = days.find((day) => day.key === form.day)?.fullDate;
      const appointments = vetAppointments?.data?.data ?? [];
      const allHours = getAvailableHours(
        route.params.data,
        selectedDate,
        appointments,
      );
      !allHours.length &&
        setEmptyText('No quedan horarios disponibles en este día.');
      // setAreHoursLoading(false);
      setForm({...form, time: ''});
      setHours(allHours);
    }
  }, [form.day]);

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

  /**********************
   *** Render Methods ***
   **********************/

  const baseCharge = Number(base_charge).toFixed(2);
  const timeBeforePenalization =
    route.params.data?.minimum_time_for_cancel / 60;

  const textModal =
    'Para generar una cita es necesario seleccionar o agregar un método ' +
    'de pago. La cita se cobrará al pasar la fecha y el horario ' +
    `seleccionado.\n Puedes cancelar hasta ${timeBeforePenalization} horas ` +
    'antes, de lo contrario se te cobrará una penalización.';

  const textSubmitModal =
    'Tu cita ha sido generada exitósamente. Puedes acceder a ' +
    'todos tus servicios programados desde la sección de' +
    '"Proximos Servicios" en el menú principal. ';

  const renderEmpty = (
    <View style={[styles.hourListEmptyContainer, styles.horizontalPadding]}>
      <DefaultText>{emptyText}</DefaultText>
    </View>
  );

  const renderHeader = (
    <>
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
          <View style={styles.horizontalPadding}>
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
      <TitleHeader style={[styles.normalHeader, styles.horizontalPadding]}>
        Horario
      </TitleHeader>
    </>
  );

  const renderFooter = (
    <View style={styles.horizontalPadding}>
      <View style={styles.paymentMethodTitle}>
        <TitleHeader style={styles.normalHeader}>Método de pago</TitleHeader>
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
        <DefaultText style={styles.leftSide}>Consulta</DefaultText>
        <DefaultText style={styles.rightSide}>${baseCharge}</DefaultText>
      </View>
      <View style={styles.totalContainer}>
        <TitleHeader style={styles.leftSide}>Total</TitleHeader>
        <TitleHeader style={styles.rightSide}>${baseCharge}</TitleHeader>
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
  );

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
      <OptionSelect
        currentValue={form.time}
        data={hours}
        emptyComponent={renderEmpty}
        footerComponent={renderFooter}
        headerComponent={renderHeader}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.columnWrapper}
        optionStyle={styles.optionTime}
        setCurrentValue={(time: string) => setValueTime(time)}
        style={styles.selectHours}
        textStyle={styles.textOptionTime}
      />
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');

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
  selectHours: {
    marginBottom: 0,
  },
  selectContainer: {
    paddingLeft: globalVars.outsidePadding,
    paddingRight: globalVars.outsidePadding / 2,
    marginBottom: 16,
  },
  options: {
    width: 64,
    height: 70,
    borderRadius: 16,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    paddingHorizontal: globalVars.outsidePadding,
  },
  optionTime: {
    minWidth: width / 4 - OPTION_GAP / 2 - globalVars.outsidePadding / 2,
    height: 40,
    marginRight: 10,
    marginBottom: 15,
    paddingBottom: 10,
    paddingTop: 15,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  paymentMethodTitle: {flexDirection: 'row', marginTop: 16},
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
  leftSide: {justifyContent: 'flex-start'},
  rightSide: {justifyContent: 'flex-end'},
});
