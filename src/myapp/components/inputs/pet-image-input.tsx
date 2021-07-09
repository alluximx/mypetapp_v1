import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
// My Components.
import AddButton from '../buttons/add-button';

const PetImageInput = ({image}): React.ReactElement => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        {image !== '' ? (
          <Image source={image} />
        ) : (
          <Image
            style={styles.addPetImage}
            source={require('../../assets/images/pets/add-pet-image.png')}
          />
        )}
        <AddButton
          iconStyle={styles.addIcon}
          style={styles.addButton}
          onAdd={() => {}}
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
