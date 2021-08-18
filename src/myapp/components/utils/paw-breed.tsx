import {List} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, StyleSheet, Image} from 'react-native';
interface PawBreedProps {
  style?: {};
  numberTteam: number;
  number: number;
}
const PawBreed = (props: PawBreedProps): React.ReactElement => {
  const nivel = (number) => {
    const aux = [];
    for (let index = 0; index < props.numberTteam; index++) {
      index <= number - 1 ? aux.push({num: 1}) : aux.push({num: 0});
    }
    return aux;
  };
  const renderpawPrintItem = (service) => {
    return service.item.num === 1 ? (
      <Image
        style={styles.pawPrint}
        source={require('../../assets/images/paw-rating/pawColor.png')}
      />
    ) : (
      <Image
        style={styles.pawPrint}
        source={require('../../assets/images/paw-rating/pawEmpty.png')}
      />
    );
  };
  const array = nivel(props.number);
  return (
    <List
      style={styles.servicesContainer}
      horizontal={true}
      data={array}
      renderItem={renderpawPrintItem}
    />
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  pawPrint: {
    width: 60,
    height: 60,
  },
});
export default PawBreed;
