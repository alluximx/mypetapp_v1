import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
// Global Colors.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components.
import TitleHeader from '../texts/title-header';
import DefaultText from '../texts/default-text';

const width = Dimensions.get('window').width;

interface PetDataCardProps {
  title: string;
  subtitle: string;
}

const PetDataCard = (props: PetDataCardProps): React.ReactElement => {
  return (
    <View style={styles.petDataCard}>
      <TitleHeader style={[styles.whiteText, styles.petDataCardTextTitle]}>
        {props.title}
      </TitleHeader>
      <DefaultText style={[styles.whiteText, styles.petDataCardTextSubtitle]}>
        {props.subtitle}
      </DefaultText>
      <Image
        style={styles.paw}
        source={require('../../assets/images/paw.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: globalColors.white,
  },
  petDataCard: {
    backgroundColor: globalColors.greenTertiary,
    borderRadius: 16,
    padding: 16,
    width: width / 2 - globalVars.outsidePadding - 8,
    marginRight: 16,
  },
  petDataCardTextTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  petDataCardTextSubtitle: {
    fontSize: 14,
  },
  paw: {
    position: 'absolute',
    height: 60,
    width: 60,
    right: -12,
    bottom: -10,
    transform: [
      {
        rotateZ: '-45deg',
      },
    ],
  },
});

export default PetDataCard;
