import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
// My Components.
import DefaultText from '../texts/default-text';
interface RatingCardProps {
  rating: string;
  distance: string;
  styleCard?: any;
}

const RatingCard = (props: RatingCardProps): React.ReactElement => {
  return (
    <View style={[styles.container, props.styleCard]}>
      <View>
        <Image
          style={styles.image}
          source={require('../../assets/images/icons/star.png')}
        />
      </View>
      <DefaultText>{props.rating}</DefaultText>
      <View style={{borderLeftWidth: 32}} />
      <View>
        <Image
          style={styles.image}
          source={require('../../assets/images/icons/location.png')}
        />
      </View>
      <DefaultText>{props.distance} km</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 32,
    width: 32,
  },
});

export default RatingCard;
