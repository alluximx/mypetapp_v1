import {Dispatch, SetStateAction} from 'react';
import {BaseModel, Appointment} from '../models';

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
}

export interface RateServiceInputProps {
  value: number;
  setValue: (value: number) => void;
}
