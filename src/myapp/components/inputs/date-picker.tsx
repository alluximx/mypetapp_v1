import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import {Datepicker, NativeDateService} from '@ui-kitten/components';
import moment from 'moment';
// My Components.
import {DropDownIcon} from '../icons';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const i18n = {
  dayNames: {
    short: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    long: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ],
  },
  monthNames: {
    short: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    long: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
  },
};
const localeDateService = new NativeDateService('es', {
  i18n,
  startDayOfWeek: 1,
});

const CalendarIcon = () => <DropDownIcon style={styles.arrowIcon} />;

const DatepickerInput = (props) => {
  const focusAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const minDate = props.minDate;
  const maxDate = props.maxDate;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: props.currentValue !== '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [props.currentValue]);

  return (
    <View>
      <Animated.Text
        style={[
          styles.inputLabel,
          // Label animations
          {
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 16],
            }),
            fontSize: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 16],
            }),
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [globalColors.darkGray, globalColors.lightGray],
            }),
          },
        ]}>
        {props.placeholder}
      </Animated.Text>
      <Datepicker
        controlStyle={styles.container}
        size="large"
        placeholder={(props) => (
          <Text {...props} style={[props.style, styles.placeholder]}>
            props.placeholder
          </Text>
        )}
        dateService={localeDateService}
        date={props.currentValue !== '' ? new Date(props.currentValue) : null}
        onSelect={(date) => {
          const formattedDate = moment(date).format('YYYY-MM-DD');
          props.onSelect(formattedDate);
        }}
        accessoryRight={CalendarIcon}
        min={minDate}
        max={maxDate}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 56,
    padding: 15,
    paddingTop: 25,
  },
  arrowIcon: {
    top: -7,
    right: 0,
  },
  inputLabel: {
    color: globalColors.darkGray,
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    left: 16,
    position: 'absolute',
    zIndex: 5,
  },
  placeholder: {
    color: 'transparent',
  },
});
export default DatepickerInput;
