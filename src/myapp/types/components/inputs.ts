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
  title?: string;
  isDisabled?: boolean;
}

export interface OptionSelectProps {
  columnWrapperStyle?: {};
  containerStyle?: {};
  currentValue: string | number;
  data: any[];
  emptyComponent?: React.ReactElement;
  enableScroll?: boolean;
  footerComponent?: React.ReactElement;
  headerComponent?: React.ReactElement;
  horizontal?: boolean;
  numColumns?: number;
  optionStyle?: {};
  setCurrentValue: (key: string | number) => void;
  style?: {};
  styleHorizontal?: boolean;
  textStyle?: {};
  title?: string;
  titleStyle?: {};
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
  inputStyle?: {};
  isNumeric?: boolean;
  isPassword?: boolean;
  maxLength?: number;
  onChangeText: (value: string) => void;
  onKeyPress?: (event) => void;
  placeholder: string;
  style?: {};
  value: string;
}

export interface IndiviudalOptionSelectProps {
  value: string | number;
  setCurrentValue: (key: string | number) => void;
  style?: {};
  title?: string;
  subtitle?: string;
}
