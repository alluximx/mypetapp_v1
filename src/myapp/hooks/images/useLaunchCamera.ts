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

import {openPicker} from 'react-native-image-crop-picker';

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
          onPress: () => {
            if (Platform.OS === 'ios') {
              openPicker({
                cropping: false,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                forceJpg: true,
                multiple: false,
                compressImageMaxHeight: 501,
                compressImageMaxWidth: 500,
              }).then((newImage) => {
                const imageData = {
                  fileName:
                    Date.now() +
                    '-' +
                    newImage.filename.split('.HEIC')[0] +
                    '.jpg',
                  type: newImage.mime,
                  uri: newImage.path,
                };
                setImage(imageData);
              });
            } else {
              launchImageLibrary(
                galleryOptions,
                (response: ImagePickerResponse) => {
                  if (!response.didCancel && !response.errorCode) {
                    setImage(response.assets[0]);
                  }
                },
              );
            }
          },
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
