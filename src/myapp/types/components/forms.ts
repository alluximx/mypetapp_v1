import {Dispatch, SetStateAction} from 'react';

interface AddressFormContent {
  street: string;
  number: string;
  int_number: string;
  reference: string;
  colony: string;
  city: string;
  state: string;
  municipality: string;
  zipcode: string;
  is_saved: boolean;
}

export interface AddressFormProps {
  form: AddressFormContent;
  error: AddressFormContent;
  setForm: (form: AddressFormContent) => void;
  setNameState?: (name: string) => void;
  setNameMunicipality?: (name: string) => void;
}

interface PaymentMethodForm {
  name: string;
  number: string;
  expiration_date: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  screenToReturn: string;
  screenFrom: string;
}

export interface PaymentMethodFormProps {
  errors: any;
  form: PaymentMethodForm;
  hasError: boolean;
  setForm: Dispatch<SetStateAction<PaymentMethodForm>>;
}
