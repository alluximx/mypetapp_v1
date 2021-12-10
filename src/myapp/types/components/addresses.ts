export interface AddressFormProps {
  addresses: any[];
  form: AddressFormContent;
  error: AddressFormContent;
  setForm: (form: AddressFormContent) => void;
  setNameState?: (name: string) => void;
  setNameMunicipality?: (name: string) => void;
}

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
