import {useEffect, useState} from 'react';
import moment from 'moment';
// Constants.
import {reminderOptions} from '../../constants';
// Models.
import {VaccineHistory} from '../../types/models';

const useVaccineReminder = (
  form: VaccineHistory,
  setForm: (form: VaccineHistory) => void,
) => {
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [reminderKey, setReminderKey] = useState(1);

  const onSelectReminder = (reminderKey: number) => {
    setReminderKey(reminderKey);

    if (form.next_vaccine_date !== '') {
      const reminderOption = reminderOptions.find(
        (option) => option.key == reminderKey,
      );

      const dateToRemind = moment(form.next_vaccine_date)
        .subtract(reminderOption.delay.amount, reminderOption.delay.unit)
        .format('YYYY-MM-DD 09:00:00');

      setForm({...form, reminder: dateToRemind});
    }
  };

  useEffect(() => {
    if (!isReminderActive) {
      setForm({...form, reminder: null});
    } else {
      onSelectReminder(reminderKey);
    }
  }, [isReminderActive, form.next_vaccine_date]);

  return [
    isReminderActive,
    setIsReminderActive,
    reminderKey,
    onSelectReminder,
    setReminderKey,
  ] as const;
};

export default useVaccineReminder;
