import React from 'react';
import { StyleSheet} from 'react-native';
import {Datepicker, Icon, NativeDateService } from '@ui-kitten/components';

const i18n = {
    dayNames: {
      short: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      long: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    },
    monthNames: {
      short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
const localeDateService = new NativeDateService('es', { i18n, startDayOfWeek: 1 });

const CalendarIcon = (props) => (
    <Icon {...props} name='arrow-ios-downward'/>
  );


const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};

const now = new Date();
const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 18520);


const DatepickerInput = (props) => {
  const mediumDatepickerState = useDatepickerState();
  return (
        <Datepicker
          style={styles.container}
          size='large'
          placeholder='DD/MM/AAAA'
          dateService={localeDateService}
          {...mediumDatepickerState}
          accessoryRight={CalendarIcon}
          min = {minDate}
          max = {now}
        />
 
  );
};
const styles = StyleSheet.create({
    container: {
      marginTop : -10,
    },
    datepicker: {
      marginVertical: -2,
    },
  });
export default DatepickerInput;
