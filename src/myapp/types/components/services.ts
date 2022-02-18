import {Appointment} from '../models';

export interface NextServicesListProps {
  tab: string;
}

export interface NextServicesEmptyProps {
  tab: string;
}

export interface NextServiceCardProps {
  tab: string;
  styleCard?: any;
  service: Appointment;
  onPressEditModal?: () => void;
  onPressDeleteModal?: () => void;
  onPressPendingModal?: () => void;
}

export interface RateServiceInputProps {
  value: number;
  setValue: (value: number) => void;
}
