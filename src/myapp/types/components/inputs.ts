export interface DatePickerProps {
  currentValue: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onSelect: (date: string) => void;
  placeholder?: string;
}

export interface DropdownPickerProps {
  currentValue: string;
  data: any[];
  placeholder?: string;
  setCurrentValue: (key: string) => void;
  style?: {};
  disabled?: boolean;
}

export interface Option {
  key: string;
  value: string;
}

export interface OptionSelectProps {
  currentValue: string | number;
  data: any[];
  horizontal?: boolean;
  optionStyle?: {};
  setCurrentValue: (key: string | number) => void;
  style?: {};
}

export interface ReminderInputProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setValue: (key: number) => void;
  style?: {};
  value: number;
}

export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isNumeric?: boolean;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}
