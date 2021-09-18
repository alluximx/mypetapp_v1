export interface DatePickerProps {
  currentValue: string | Date;
  disabled?: boolean;
  iconStyle?: {};
  maxDate?: Date;
  minDate?: string | Date;
  onSelect: (date: Date) => void;
  placeholder?: string;
  style?: {};
}

export interface DropdownPickerProps {
  currentValue: string;
  data: any[];
  placeholder?: string;
  setCurrentValue: (key: string) => void;
  style?: {};
  disabled?: boolean;
  disabledPlaceholder?: boolean;
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

export interface SearchInputProps {
  onFilter: (text: string) => void;
  placeholder?: string;
  style?: {};
}

export interface ReminderInputProps {
  isActive: boolean;
  isDisable?: boolean;
  isNotReminder?: boolean;
  setIsActive: (isActive: boolean) => void;
  setValue: (key: number) => void;
  style?: {};
  text?: string;
  value: number;
}

export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isNumeric?: boolean;
  isPassword?: boolean;
  maxLength?: number;
  onChangeText: (value: string) => void;
  placeholder: string;
  style?: {};
  value: string;
}
