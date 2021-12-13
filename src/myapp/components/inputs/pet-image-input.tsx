import React, {useCallback} from 'react';
import {useState} from 'react';
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
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {openPicker} from 'react-native-image-crop-picker';
// My Components.
import AddButton from '../buttons/add-button';

const galleryOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

const options: CameraOptions = {
  ...galleryOptions,
  saveToPhotos: true,
};

interface PetImageInputProps {
  image: ImageSourcePropType;
  setImage: (image: ImageSourcePropType) => void;
  style?: {};
}

const PetImageInput = ({
  image,
  setImage,
  style,
}: PetImageInputProps): React.ReactElement => {
  const [imageResponse, setImageResponse] = useState<any>(null);

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
                setImageResponse(response);
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

  const renderPetImageAsset = () => {
    let source = null;
    let additionalStyles = {};

    // If there is an image passed as prop and a picture
    // hasn't been taken...
    if (image && !imageResponse) {
      source = image;
      additionalStyles = styles.takenPictureStyles;
    } else if (imageResponse) {
      // Or an image has been taken...
      const realPath =
        Platform.OS === 'ios'
          ? decodeURIComponent(
              imageResponse.assets[0].uri.replace('file://', ''),
            )
          : imageResponse.assets[0].uri;
      source = {uri: realPath};
      additionalStyles = styles.takenPictureStyles;
    } else {
      // Otherwise show default image.
      source = require('../../assets/images/pets/add-pet-image.png');
    }

    return (
      <Image style={[styles.addPetImage, additionalStyles]} source={source} />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {renderPetImageAsset()}
        <AddButton
          iconStyle={styles.addIcon}
          style={styles.addButton}
          onAdd={onPress}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 88,
    alignSelf: 'center',
  },
  addPetImage: {
    height: 88,
    width: 88,
    resizeMode: 'contain',
  },
  takenPictureStyles: {
    resizeMode: 'cover',
    borderRadius: 50,
    overflow: 'hidden',
  },
  addButton: {
    height: 26,
    width: 26,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  addIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default PetImageInput;
