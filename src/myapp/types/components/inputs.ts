export interface UserInputProps {
  error?: string;
  isPassword?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}
