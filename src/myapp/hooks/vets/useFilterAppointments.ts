import moment from 'moment';
import React, {useEffect, useState} from 'react';
// Constants
import {servicesTabs} from '../../constants';
// Types
import {Appointment} from '../../types/models';

const useFilterAppointments = (appointments: Appointment[], tab: string) => {
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [nextAppointments, setNextAppointments] = useState<Appointment[]>([]);
  const [historicAppointments, setHistoricAppointments] = useState<
    Appointment[]
  >([]);

  const setFilteredAppointmentsGroup = (
    next = nextAppointments,
    historic = historicAppointments,
  ) => {
    // If current tab is next appointments...
    if (tab === servicesTabs[0].id) {
      setFilteredAppointments(next);
    } else {
      setFilteredAppointments(historic);
    }
  };

  useEffect(() => {
    let nextOnes: Appointment[] = [];
    let historicOnes: Appointment[] = [];
    const currentDateTime = moment().utc();
    // Filter accepted ones.
    const filteredOnes = appointments.filter(
      (appointment: Appointment) =>
        appointment.admin_settings.auto_accept_request ||
        (!appointment.admin_settings.auto_accept_request &&
          appointment.is_accepted),
    );

    // Filter by historic or current.
    filteredOnes.forEach((appointment: Appointment) => {
      const appointmentDateTime = moment(appointment.full_end_time).utc();

      if (appointmentDateTime.isSameOrBefore(currentDateTime)) {
        historicOnes.push(appointment);
      } else {
        nextOnes.push(appointment);
      }
    });

    setNextAppointments(nextOnes);
    setHistoricAppointments(historicOnes);
    setFilteredAppointmentsGroup(nextOnes, historicOnes);

    return () => {
      setNextAppointments([]);
      setHistoricAppointments([]);
    };
  }, [appointments]);

  useEffect(() => {
    setFilteredAppointmentsGroup();
    return () => setFilteredAppointments([]);
  }, [tab]);

  useEffect(() => {
    console.log(filteredAppointments);
  }, [filteredAppointments]);

  return filteredAppointments;
};

export default useFilterAppointments;
