export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}

export interface OptionSelectProps {
  data: any[];
  optionStyle?: {};
  horizontal: boolean;
  currentValue: string;
  setCurrentValue: (key: string) => void;
}
