import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import globalVars from '../../styles/vars';
import {VetCardProps} from '../../types/components/cards';
import GenericCard from './generic-card';
import RatingCard from './rating-card';

const VetCard = (props: VetCardProps): React.ReactElement => {
  const navigation = useNavigation();

  const {address, distance, image, name, rating} = props.vet;
  return (
    <GenericCard
      contentTextStyle={styles.subtitleCard}
      coverImageStyle={styles.coverImage}
      styleCard={{
        marginHorizontal: globalVars.outsidePadding,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 20,
        width: width - globalVars.outsidePadding * 2,
      }}
      data={{
        additionalContent: [
          <RatingCard
            rating={rating}
            distance={distance}
            styleCard={{marginTop: 8}}
          />,
        ],
        content: address,
        coverImage: image,
        title: name,
      }}
      onClick={() => navigation.navigate(props.screen, {data: props.vet})}
    />
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  subtitleCard: {
    fontSize: 14,
    marginTop: 0,
  },
  coverImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
});

export default VetCard;
