import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
// My Components
import GenericCard from './generic-card';
import RatingCard from './rating-card';
// Types
import {VetCardProps} from '../../types/components/cards';
import useDistanceToPoint from '../../hooks/maps/useDistanceToPoint';

const VetCard = (props: VetCardProps): React.ReactElement => {
  const navigation = useNavigation();
  const distance = useDistanceToPoint({
    ...props.location,
    id: props.vet.id,
    isVet: props.isVet,
  });
  const currentDistance = distance.toFixed(1).toString();
  const {exterior_number, logo, name, street, rating} = props.vet;

  return (
    <GenericCard
      contentTextStyle={styles.subtitleCard}
      coverImageStyle={styles.coverImage}
      styleCard={props.styleCard}
      key={props.vet.id}
      data={{
        additionalContent: [
          <RatingCard
            key={'rating' + props.vet.id}
            rating={rating}
            distance={currentDistance}
            styleCard={styles.ratingCard}
          />,
        ],
        content: `${street} #${exterior_number}`,
        coverImage: logo,
        title: name,
      }}
      onClick={() =>
        navigation.navigate(props.isVet ? 'VetDetail' : 'AestheticDetail', {
          data: {
            ...props.vet,
            distance: currentDistance,
          },
        })
      }
      wrapTitle
      wrapContent
    />
  );
};

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
  ratingCard: {marginTop: 8},
});

export default VetCard;
