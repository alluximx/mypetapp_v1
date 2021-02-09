import {LayoutItem} from '../../model/layout-item.model';

export interface AuthData extends LayoutItem {
  route: string;
}

export const data: AuthData[] = [
  {
    title: 'Sign In',
    description: 'Option 1',
    image: require('../../assets/images/image-layout-sign-in-1.jpg'),
    route: 'SignIn',
  },
  {
    title: 'Sign Up',
    description: 'Option 1',
    image: require('../../assets/images/image-layout-sign-up-1.jpg'),
    route: 'SignUp',
  },
  {
    title: 'Forgot Password',
    description: 'Option 1',
    image: require('../../assets/images/image-layout-forgot-password.jpg'),
    route: 'ForgotPassword',
  },
];
