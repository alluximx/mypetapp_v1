import _ from 'lodash';
import moment from 'moment';
import {stripeDaysForTransaction} from '../../../constants';
import {Option, OptionDate} from '../../../types/components/inputs';
import {Appointment, VetSettings} from '../../../types/models';
import {checkIfDayIsEnabledInVetSettings} from '../../../utils';

/**
 * Return the available hours taking into account the vet settings
 * and its current appointments.
 *
 * @param configs settings for the vet admin
 * @param selectedDate current date selected
 * @param appointments array of appointment objects
 * @returns options array of available hours
 */
export const getAvailableHours = (
  configs: VetSettings,
  selectedDate: string,
  appointments: Appointment[],
): Option[] => {
  const allHours: Option[] = [];
  const {end_time, start_time, time_slots} = configs;
  // Get the currently selected date start and end time.
  const startTime = moment(selectedDate + ' ' + start_time).subtract(
    time_slots,
    'minutes',
  );
  const endTime = moment(selectedDate + ' ' + end_time).subtract(
    time_slots,
    'minutes',
  );

  let hasReachedEndTime = false;
  while (!hasReachedEndTime) {
    // Add amount of minutes to start time.
    const currentTime = startTime.add(time_slots, 'minutes');

    // Exit if already is endtime
    if (currentTime.isAfter(endTime)) {
      hasReachedEndTime = true;
      break;
    }

    const currentFormattedTime = currentTime.format('h:mm A');

    // Check if the current time is not blocked by any appointment.
    const isOccupied = appointments.some((appointment) => {
      // Get current time slot start and end time in utc format.
      const currentTimeStart = moment(currentTime).utc();
      const currentTimeEnd = moment(currentTime)
        .add(time_slots, 'minutes')
        .utc();

      // Format to utc the start and end time of the appointment.
      const auxStartTime = moment(appointment.full_start_time).utc();
      const auxEndTime = moment(appointment.full_end_time).utc();

      // If start or end is between any appointment time, return true.
      return (
        currentTimeStart.isBetween(auxStartTime, auxEndTime, 'minutes', '[)') ||
        currentTimeEnd.isBetween(auxStartTime, auxEndTime, 'minutes', '(]')
      );
    });

    if (!isOccupied && !currentTime.isSameOrBefore(moment())) {
      allHours.push({
        key: currentFormattedTime,
        value: currentFormattedTime,
      });
    }
  }

  return allHours;
};

/**
 * Returns array of available days for the days selector.
 *
 * @param settings Vet settings object
 * @returns array of options for the days
 */
export const getAvailableDays = (settings: VetSettings): Option[] => {
  const nextDaysList: OptionDate[] = [];

  for (let i = 0; i <= stripeDaysForTransaction; i++) {
    const currentNextDay = moment().add(i, 'days');
    const currentNextDayName = currentNextDay.format('ddd');
    const currentNextDayNumber = currentNextDay.format('D');
    const currentNextDayWeekIndex = Number(currentNextDay.format('d'));
    const isDayEnabled = checkIfDayIsEnabledInVetSettings(
      currentNextDayWeekIndex,
      settings,
    );

    nextDaysList.push({
      key: currentNextDayWeekIndex + '-' + currentNextDayName,
      title: _.capitalize(currentNextDayName),
      fullDate: currentNextDay.format('YYYY-MM-DD'),
      value: currentNextDayNumber,
      isDisabled: !isDayEnabled,
    });
  }

  return nextDaysList;
};
