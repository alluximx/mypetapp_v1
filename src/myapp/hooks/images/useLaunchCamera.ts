import {useCallback} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraOptions,
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';

const galleryOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

const options: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

const useLaunchCamera = (setImage: (image: ImageSourcePropType) => void) => {
  const onPress = useCallback(() => {
    Alert.alert(
      'Editar imagen',
      'Selecciona una opción...',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Seleccionar desde mi galería',
          style: 'default',
          onPress: () =>
            launchImageLibrary(
              galleryOptions,
              (response: ImagePickerResponse) => {
                if (!response.didCancel && !response.errorCode) {
                  setImage(response.assets[0]);
                }
              },
            ),
        },
        {
          text: 'Tomar una nueva foto',
          style: 'default',
          onPress: () =>
            launchCamera(options, (response: ImagePickerResponse) => {
              if (!response.didCancel && !response.errorCode) {
                setImage(response.assets[0]);
              }
            }),
        },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  const onDelete = () => {
    setImage(null);
  };

  return [onPress, onDelete];
};

export default useLaunchCamera;
