export interface DatasGeneric {
  date?: Date | null;
  title: string;
  content: string;
  buttonText: string;
  buttonAlign: string;
  images?: string[];
}

export interface ReminderInputProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setValue: (key: string) => void;
  style?: {};
  value: string;
}

export interface Option {
  key: string;
  value: string;
}

export interface OptionSelectProps {
  currentValue: string;
  data: any[];
  horizontal?: boolean;
  optionStyle?: {};
  setCurrentValue: (key: string) => void;
  style?: {};
}

export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}

export interface DatePickerProps {
  currentValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
}
