import { Linking, Platform } from 'react-native';

export class WebBrowserService {

  static openBrowserAsync = (url: string): Promise<any> => {
    return WebBrowserService.openUrl(url);
  };

  private static openUrl = (url: string): Promise<any> => {
    return Linking.openURL(url);
  };
}
