import {I18nConfig, NativeDateService} from '@ui-kitten/components';
import {unitOfTime} from 'moment';

interface ReminderOption {
  key: number;
  value: string;
  delay: {
    amount: number;
    unit: unitOfTime.DurationConstructor;
  };
}

export const reminderOptions: ReminderOption[] = [
  {key: 1, value: '1 día antes', delay: {amount: 1, unit: 'days'}},
  {key: 7, value: '1 semana antes', delay: {amount: 1, unit: 'weeks'}},
  {key: 14, value: '2 semanas antes', delay: {amount: 2, unit: 'weeks'}},
];

export const sexOptions = [
  {key: 'M', value: 'Macho'},
  {key: 'H', value: 'Hembra'},
];

export const vaccineTypes = [
  {key: '1', value: 'Antirrábica'},
  {key: '2', value: 'Tétanos'},
  {key: '3', value: 'Parvovirus'},
];

/*************
 *** DATES ***
 *************/

const i18n: I18nConfig = {
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

export const localeDateService = new NativeDateService('es', {
  i18n,
  startDayOfWeek: 1,
  format: 'DD/MM/YYYY',
});

export const productPrices = {
  MIN_PRICE: 0,
  MAX_PRICE: 2000,
};

export const stripeDaysForTransaction = 6;

/****************
 *** SERVICES ***
 ****************/
export const servicesTabs = [
  {
    id: 'active',
    name: 'Próximos',
  },
  {
    id: 'history',
    name: 'Historial',
  },
];
