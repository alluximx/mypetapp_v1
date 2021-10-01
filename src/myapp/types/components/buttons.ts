export interface CustomButtonProps {
  isLight?: boolean;
  style?: {};
  children: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSubmit?: boolean;
}
