import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import 'moment/locale/es';
import {AxiosError} from 'axios';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import moment from 'moment';
// Global Styles
import globalVars from '../../../styles/vars';
import globalColors from '../../../styles/colors';
// Hooks
import useAddAppointment from '../../../hooks/vets/useAddAppointment';
// import useGetPaymentMethod from '../../../hooks/payment-method/useGetPaymentMethod';
import useUpdateAppointment from '../../../hooks/vets/useUpdateAppointment';
import useAdminAppointments from '../../../hooks/vets/useAdminAppointments';
// My Components
// import {QuestionCircleIcon} from '../../../components/icons';
import CustomButton from '../../../components/buttons/custom-button';
import CustomModal from '../../../components/modals/custom-modal';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import OptionSelect, {
  OPTION_GAP,
} from '../../../components/inputs/option-select';
import TitleHeader from '../../../components/texts/title-header';
// Types
import {getAvailableDays, getAvailableHours} from './utils';
import {Option, OptionDate} from '../../../types/components/inputs';

const NUM_COLUMNS = 4;

export default ({navigation, route}): React.ReactElement => {
  const [days, setDays] = useState<OptionDate[]>([]);
  const [hours, setHours] = useState<Option[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // Modals
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSubmitVisible, setIsModalSubmitVisible] = useState(false);
  // const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  // Render vars
  // const [cardContent, setCardContent] = useState('');
  // const [cardTitle, setCardTitle] = useState('');
  const [emptyText, setEmptyText] = useState(
    'Por favor selecciona una fecha para ver los horarios disponibles.',
  );
  const [error, setError] = useState({
    error: '',
  });
  const [petContent, setPetContent] = useState('');
  const [serviceIndexesList, setServiceIndexesList] = useState([]);
  const [serviceContent, setServiceContent] = useState('');
  const {
    admin,
    // allowed_changes_without_penalty,
    appointment_start_time,
    base_charge,
    // cancel_penalty,
    // card_id,
    date,
    directoryId,
    // has_reschedule_penalty,
    id,
    isEdit,
    // minimum_time_for_cancel,
    // minimum_time_for_reschedule,
    // reschedule_penalty,
    // paymentMethod,
    pet,
    serviceIndexes,
    screenFrom,
    serviceData,
    start_time,
    time_slots,
  } = route.params ?? {};

  const isSalon = screenFrom && screenFrom === 'AestheticDate';

  // Hook calls
  const addAppointmentQuery = useAddAppointment(admin, isSalon);
  // const cardData = useGetPaymentMethod(card_id, isEdit);
  const updateAppointmentQuery = useUpdateAppointment(isSalon);
  const adminAppointments = useAdminAppointments(admin, isSalon);

  const [form, setForm] = useState({
    admin,
    // card_id,
    date: date ?? '',
    day: '',
    end_time: '',
    // has_cancel_penalty: false,
    // has_reschedule_penalty: has_reschedule_penalty ?? false,
    id: id ?? '',
    // paymentMethod: '',
    pet: pet ?? '',
    services: '',
    start_time: appointment_start_time ?? '',
    time: '',
  });

  // Functions
  const setValueForm = (day: string) => setForm({...form, day});
  const setValueTime = (time: string) => {
    const formattedTime = moment(time, 'h:mm A');
    setForm({
      ...form,
      start_time: formattedTime.format('HH:mm'),
      end_time: formattedTime.add(time_slots, 'minutes').format('HH:mm'),
      time,
    });
  };

  const onSubmit = () => {
    if (isEdit) {
      setIsLoading(true);
      updateAppointmentQuery.mutate(form, {
        onError: (responseError: AxiosError) => {
          const requestError = responseError.response.data;
          setError(requestError);
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsLoading(false);
          setIsModalSubmitVisible(true);
        },
      });
    } else {
      setIsLoading(true);
      addAppointmentQuery.mutate(form, {
        onError: (responseError: AxiosError) => {
          const requestError = responseError.response.data;
          setError(requestError);
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsModalSubmitVisible(true);
        },
      });
    }
  };

  // const onAcceptPolicy = () => {
  //   setIsLoading(true);
  //   setIsPolicyModalVisible(false);
  //   addAppointmentQuery.mutate(form, {
  //     onError: (responseError: AxiosError) => {
  //       setIsPolicyModalVisible(false);
  //       const requestError = responseError.response.data;
  //       setError(requestError);
  //       setIsLoading(false);
  //     },
  //     onSuccess: () => {
  //       setIsModalSubmitVisible(true);
  //     },
  //   });
  // };

  const onAcceptSubmit = () => {
    setIsLoading(false);
    setIsModalSubmitVisible(false);
    navigation.navigate('NextServices');
  };

  /***************
   *** Effects ***
   ***************/

  useEffect(() => {
    moment.locale('es');
    const nextDaysList = getAvailableDays(route.params);
    setDays(nextDaysList);
  }, []);

  useEffect(() => {
    if (form.day) {
      setHours([]);
      const selectedDate = days.find((day) => day.key === form.day)?.fullDate;
      const appointments = adminAppointments?.data?.data ?? [];
      const allHours = getAvailableHours(
        route.params,
        selectedDate,
        appointments,
        appointment_start_time,
      );
      !allHours.length &&
        setEmptyText('No quedan horarios disponibles en este día.');
      setForm({...form, date: selectedDate, time: ''});
      setHours(allHours);
    }
  }, [form.day, error?.error]);

  useEffect(() => {
    if (pet) {
      const {petId, petName, sizeName} = pet;
      setPetContent(isSalon ? petName + ' - ' + sizeName : petName);
      setForm({...form, pet: petId, services: ''});
      setServiceIndexesList([]);
      setServiceContent('');
    }
  }, [pet]);

  useEffect(() => {
    if (serviceIndexes) {
      setServiceIndexesList(serviceIndexes);
      setForm({...form, services: serviceData});
      const formattedServices = serviceData
        .split(/ - \$\S*\n/)
        .filter(Boolean)
        .join(', ');
      setServiceContent(formattedServices);
    }
  }, [serviceIndexes]);

  useEffect(() => {
    if (date && days.length) {
      const selectedDay = days.find((day) => day.fullDate === form.date);
      setForm({...form, day: selectedDay?.key});
    }
  }, [days]);

  useEffect(() => {
    if (start_time && hours.length && form.date === date) {
      const selectedHour = hours.find((hour) => {
        const auxCurrentHour = moment(hour.value, 'H:mm A').format('HH:mm');
        const auxFormHour = moment(form.start_time, 'HH:mm:ss').format('HH:mm');
        return auxCurrentHour === auxFormHour;
      });

      setValueTime(selectedHour?.key);
    }
  }, [hours]);

  // useEffect(() => {
  //   if (paymentMethod) {
  //     const {cardLabel, cardBrand, cardId} = paymentMethod;
  //     setCardTitle(cardBrand);
  //     setCardContent(cardLabel);
  //     setForm({...form, card_id: cardId});
  //   } else if (cardData?.isSuccess) {
  //     const {brand, last4} = cardData.data?.data[0] ?? {};
  //     setCardTitle(brand);
  //     setCardContent('****' + last4);
  //   }
  // }, [paymentMethod, cardData?.isSuccess]);

  /**********************
   *** Render Methods ***
   **********************/

  const isDisabled =
    (isSalon && form.services === '') ||
    form.date === '' ||
    form.time === '' ||
    form.pet === '';
  // form.card_id === '';

  const baseCharge = Number(base_charge).toFixed(2);

  // const timeForReschedulePenalty = _.round(minimum_time_for_reschedule / 60, 1);
  // const timeForCancelPenalty = _.round(minimum_time_for_cancel / 60, 1);

  // const maxCancelTimeLabel = `${timeForCancelPenalty} ${
  //   timeForCancelPenalty === 1 ? 'hora' : 'horas'
  // }`;
  // const maxRescheduleTimeLabel = `${timeForReschedulePenalty} ${
  //   timeForReschedulePenalty === 1 ? 'hora' : 'horas'
  // }`;

  // const reschedulePenaltyFormatted = Number(reschedule_penalty)?.toFixed(2);
  // const cancelPenaltyFormatted = Number(cancel_penalty)?.toFixed(2);

  // const chancesBeforeReschedulePenalty = `${allowed_changes_without_penalty} ${
  //   allowed_changes_without_penalty === 1 ? 'vez' : 'veces'
  // }`;

  // const textModal =
  //   'Para generar una cita es necesario seleccionar o agregar un método ' +
  //   'de pago. La cita se cobrará al pasar la fecha y el horario ' +
  //   `seleccionado.\nPuedes cancelar hasta ${maxCancelTimeLabel} ` +
  //   'antes, de lo contrario se te cobrará una penalización.';

  const textSubmitModal = isEdit
    ? 'Tu cita se ha actualizado exitosamente.'
    : 'Tu cita ha sido generada exitosamente. Puedes acceder a ' +
      'todos tus servicios programados desde la sección de ' +
      '"Próximos Servicios" en el menú principal.';

  // const policyModalContent =
  //   `Podrás reprogramar tu cita ${chancesBeforeReschedulePenalty} ` +
  //   `de forma gratuita hasta ${maxRescheduleTimeLabel} antes. ` +
  //   `Si la modificas más de ${chancesBeforeReschedulePenalty} o con menos ` +
  //   `de ${maxRescheduleTimeLabel} de anticipación, se te cobrará una penalización ` +
  //   `de $${reschedulePenaltyFormatted} cada vez que reagendes tu cita.\n` +
  //   `Podrás cancelar tu cita hasta ${maxCancelTimeLabel} antes. ` +
  //   `De lo contrario, se te cobrará una penalización de ` +
  //   `$${cancelPenaltyFormatted}. `;

  const renderEmpty = (
    <View style={[styles.hourListEmptyContainer, styles.horizontalPadding]}>
      <DefaultText>{emptyText}</DefaultText>
    </View>
  );

  const renderHeader = (
    <>
      <View style={styles.horizontalPadding}>
        <TitleHeader style={styles.header}>
          {isEdit ? 'Editar cita' : 'Generar cita'}
        </TitleHeader>
        <TitleHeader style={styles.normalHeader}>
          ¿Para quién es la cita?
        </TitleHeader>
        <View style={{marginBottom: 10}}>
          <NavigateButton
            placeholder="Selecciona tu mascota"
            destination="PetSelect"
            data={{
              screenToReturn: 'VetDate',
              petId: form.pet,
              sizeId: pet?.sizeId,
              screenFrom: screenFrom,
            }}
            title="Mascota"
            subtitle={petContent}
          />
        </View>
        {isSalon && (
          <View>
            <TitleHeader style={styles.normalHeader}>
              ¿Qué servicio necesita tu mascota?
            </TitleHeader>
            <NavigateButton
              data={{
                directoryId,
                serviceIndexes: serviceIndexesList,
                screenToReturn: 'VetDate',
                screenFrom: screenFrom,
                sizeId: pet?.sizeId,
              }}
              destination="ServiceSelect"
              isDisabled={form.pet === ''}
              placeholder="Selecciona los servicios"
              subtitle={serviceContent}
              title="Servicio"
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
      {/* <View style={styles.paymentMethodTitle}>
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
      </View> */}
      {!isEdit && !isSalon && (
        <View style={styles.totalContainer}>
          <DefaultText style={styles.leftSide}>Consulta</DefaultText>
          <DefaultText style={styles.rightSide}>${baseCharge}</DefaultText>
        </View>
      )}
      {isSalon &&
        form.services !== '' &&
        form.services
          .split('\n')
          .filter(Boolean)
          .map((service, index) => {
            const serviceSplitted = service.split(' - ');
            service.split(' - ');
            const serviceName = serviceSplitted[0];
            const servicePrice = serviceSplitted[1];
            return (
              <View key={`service-${index}`} style={styles.totalContainer}>
                <DefaultText style={styles.leftSide}>{serviceName}</DefaultText>
                <DefaultText style={styles.rightSide}>
                  {servicePrice}
                </DefaultText>
              </View>
            );
          })}
      {/* {has_reschedule_penalty && (
        <View style={styles.totalContainer}>
          <DefaultText style={styles.leftSide}>Penalización</DefaultText>
          <DefaultText style={styles.rightSide}>
            ${reschedulePenaltyFormatted}
          </DefaultText>
        </View>
      )} */}
      {!isEdit ||
        // has_reschedule_penalty ||
        (isSalon && form.services !== '' && (
          <View style={styles.totalContainer}>
            <TitleHeader style={styles.leftSide}>Total</TitleHeader>
            <TitleHeader style={styles.rightSide}>${baseCharge}</TitleHeader>
          </View>
        ))}
      <DefaultText style={error?.error && styles.error}>
        {error?.error}
      </DefaultText>
      <View style={{marginBottom: 20}}>
        <CustomButton
          isDisabled={isDisabled}
          isLoading={isLoading}
          onPress={onSubmit}>
          {isEdit ? 'Editar cita' : 'Generar cita'}
        </CustomButton>
      </View>
    </View>
  );

  return adminAppointments.isLoading ? (
    // cardData.isLoading
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      {/* <CustomModal
        labelAccept="Entendido"
        title="Método de pago"
        text={textModal}
        onAccept={() => setIsModalVisible(false)}
        showCancel={false}
        visible={isModalVisible}
      /> */}
      <CustomModal
        labelAccept="Entendido"
        title={isEdit ? 'Cita editada' : 'Cita generada'}
        text={textSubmitModal}
        onAccept={onAcceptSubmit}
        showCancel={false}
        visible={isModalSubmitVisible}
      />
      {/* <CustomModal
        labelAccept="Aceptar"
        onAccept={onAcceptPolicy}
        onCancel={() => setIsPolicyModalVisible(false)}
        showCancel
        text={policyModalContent}
        title="Política de cancelación y reprogramación"
        visible={isPolicyModalVisible}
      /> */}
      <OptionSelect
        currentValue={form.time}
        data={hours}
        emptyComponent={renderEmpty}
        footerComponent={renderFooter}
        headerComponent={renderHeader}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.columnWrapper}
        optionStyle={styles.optionTime}
        setCurrentValue={setValueTime}
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
  // paymentMethodTitle: {flexDirection: 'row', marginTop: 16},
  totalContainer: {
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  error: {
    color: globalColors.red,
    marginBottom: 16,
  },
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  leftSide: {justifyContent: 'flex-start'},
  rightSide: {justifyContent: 'flex-end'},
});
