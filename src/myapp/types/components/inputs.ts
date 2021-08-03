import {PickerStyle} from 'react-native-picker-select';

export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}

export interface Option {
  key: string;
  value: string;
}

export interface OptionSelectProps {
  currentValue: string;
  data: any[];
  horizontal: boolean;
  optionStyle?: {};
  setCurrentValue: (key: string) => void;
  style?: {};
}

export interface DropdownPickerProps {
  currentValue: string;
  data: any[];
  placeholder?: string;
  setCurrentValue: (key: string) => void;
  style?: {};
  disabled?: boolean;
}
