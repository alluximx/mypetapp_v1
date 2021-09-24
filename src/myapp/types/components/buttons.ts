export interface CustomButtonProps {
  isLight?: boolean;
  style?: {};
  children: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface NavigateButtonProps {
  data?: {};
  destination: string;
  subtitle: string;
  title: string;
}
