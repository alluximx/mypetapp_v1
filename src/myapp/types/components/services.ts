import {Dispatch, SetStateAction} from 'react';
import {BaseModel, NextService} from '../models';

export interface NextServicesListProps {
  tab: string;
}

export interface NextServicesEmptyProps {
  tab: string;
}

export interface NextServiceCardProps {
  tab: string;
  styleCard?: any;
  service: NextService;
  onPressEditModal?: () => void;
  onPressDeleteModal?: () => void;
}

export interface RateServiceInputProps {
  value: number;
  setValue: (value: number) => void;
}
