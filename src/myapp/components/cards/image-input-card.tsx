import React, {useState, useCallback} from 'react';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {StyleSheet, View, Image, ImageSourcePropType} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';

const options: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
};

interface ImageInputCardProps {
  image: ImageSourcePropType;
  label: string;
  setImage: (image: ImageSourcePropType) => void;
}

const ImageInputCard = ({
  label,
  image,
  setImage,
}: ImageInputCardProps): React.ReactElement => {
  const onPress = useCallback(() => {
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error code: ', response.errorCode);
      } else {
        setImage(response.assets[0]);
      }
    });
  }, []);

  const onDelete = () => {
    setImage(null);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageAndLabelContainer}>
        {image && <Image style={styles.image} source={image} />}
        <DefaultText style={[styles.label, image && {paddingLeft: 8}]}>
          {!image && 'Fotografía de'} {label}
        </DefaultText>
      </View>
      <AnchorText
        style={image && styles.deleteText}
        onPress={!image ? onPress : onDelete}>
        {!image ? 'Agregar' : ' Eliminar'}
      </AnchorText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: globalColors.white,
    borderRadius: 8,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  imageAndLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 38,
    height: 38,
  },
  deleteText: {
    color: globalColors.red,
  },
  label: {
    color: globalColors.darkerGray,
  },
});

export default ImageInputCard;
