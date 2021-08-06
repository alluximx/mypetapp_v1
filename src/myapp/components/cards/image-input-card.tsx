import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
// Hooks.
import useLaunchCamera from '../../hooks/images/useLaunchCamera';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
// Types.
import {ImageInputCardProps} from '../../types/components/cards';

const ImageInputCard = ({
  label,
  image,
  setImage,
}: ImageInputCardProps): React.ReactElement => {
  const [onPress, onDelete] = useLaunchCamera(setImage);

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
