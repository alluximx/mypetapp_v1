import {useCallback} from 'react';
import {ImageSourcePropType} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';

const options: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

const useLaunchCamera = (setImage: (image: ImageSourcePropType) => void) => {
  const onPress = useCallback(() => {
    launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0]);
      }
    });
  }, []);

  const onDelete = () => {
    setImage(null);
  };

  return [onPress, onDelete];
};

export default useLaunchCamera;
