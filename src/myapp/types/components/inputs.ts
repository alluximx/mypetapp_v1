export interface UserInputProps {
  autoCapitalize?: boolean;
  error?: string;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}
