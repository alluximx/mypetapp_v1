import React, {useCallback} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
// My Components.
import AddButton from '../buttons/add-button';

const options: CameraOptions = {
  mediaType: 'photo',
  includeBase64: false,
};

const PetImageInput = ({image, setImage, style}): React.ReactElement => {
  const [imageResponse, setImageResponse] = useState<any>(null);

  const onPress = useCallback(() => {
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error code: ', response.errorCode);
      } else {
        setImageResponse(response);
        setImage(response.assets[0].uri);
      }
    });
  }, []);

  const renderPetImageAsset = () => {
    let source = null;
    let additionalStyles = {};

    // If there is an image passed as prop and a picture
    // hasn't been taken...
    if (image !== '' && !imageResponse) {
      source = image;
      additionalStyles = styles.takenPictureStyles;
    }
    // And if an image has been taken...
    else if (imageResponse) {
      source = {uri: imageResponse.assets[0].uri};
      additionalStyles = styles.takenPictureStyles;
    }
    // Otherwise show default image.
    else {
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
