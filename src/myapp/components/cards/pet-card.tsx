import React from 'react';
import {Image, ImageSourcePropType, Platform, StyleSheet} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Hooks.
import useMyPetImage from '../../hooks/pets/useMyPetImage';
// Models
import {Pet} from 'src/myapp/types/models';
import {useState} from 'react';
import {useEffect} from 'react';

interface PetCardProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
}

const PetCard = ({onPress, pet}: PetCardProps): React.ReactElement => {
  const [image, setImage] = useState<ImageSourcePropType>(null);

  const {data: petImage} = useMyPetImage(pet.id);

  useEffect(() => {
    if (petImage) {
      setImage({
        uri: petImage.data[0].file,
      });
    }
  }, [petImage]);

  const {name, pet_age} = pet;
  const {years, months} = pet_age;
  // Format age.
  const monthsMessage = `${months} ${months === 1 ? 'mes' : 'meses'}`;
  const yearsMessage = `${years} ${years === 1 ? 'año' : 'años'}`;
  const formattedAge = years > 0 ? yearsMessage : monthsMessage;

  return (
    <Button
      activeOpacity={0.9}
      accessoryLeft={() => (
        <Image style={styles.dogProfileImage} source={image} />
      )}
      accessoryRight={() => <Text style={styles.ageText}>{formattedAge}</Text>}
      style={styles.profileButton}
      onPress={() => onPress(pet)}>
      {() => <Text style={styles.petNameText}>{name}</Text>}
    </Button>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    backgroundColor: globalColors.greenSecondary,
    borderWidth: 0,
    flexDirection: 'column',
    borderRadius: 16,
    width: 128,
    paddingTop: 16,
    paddingBottom: 24,
    marginRight: 24,
  },
  dogProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  petNameText: {
    fontFamily: globalVars.fontBold,
    color: globalColors.white,
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    marginBottom: 4,
    textAlign: 'center',
  },
  ageText: {
    color: globalColors.white,
    fontSize: 14,
  },
});

export default PetCard;
