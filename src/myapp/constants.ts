import {unitOfTime} from 'moment';

interface ReminderOption {
  key: string;
  value: string;
  delay: {
    amount: number;
    unit: unitOfTime.DurationConstructor;
  };
}

export const reminderOptions: ReminderOption[] = [
  {key: '1', value: '1 día antes', delay: {amount: 1, unit: 'days'}},
  {key: '2', value: '1 semana antes', delay: {amount: 1, unit: 'weeks'}},
  {key: '3', value: '2 semanas antes', delay: {amount: 2, unit: 'weeks'}},
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
