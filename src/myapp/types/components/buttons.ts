export interface CustomButtonProps {
  isLight?: boolean;
  style?: {};
  children: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSubmit?: boolean;
}

export interface NavigateButtonProps {
  data?: {};
  destination: string;
  placeholder?: string;
  subtitle?: string;
  title?: string;
}
