import {Dispatch, SetStateAction} from 'react';

export interface NextServicesListProps {
  tab: string;
}

export interface NextServicesEmptyProps {
  tab: string;
}

export interface NextServiceCardProps {
  tab: string;
  styleCard?: any;
  service: {
    date: string;
    vet: string;
    pet: {
      name: string;
    };
    petImage: {
      file: string;
    };
    services: string[];
  };
  setShowEditModal?: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal?: Dispatch<SetStateAction<boolean>>;
}

export interface RateServiceInputProps {
  value: number;
  setValue: (value: number) => void;
}
