import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';

const CartButton = (): React.ReactElement => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate('Cart');

  return (
    <Button
      activeOpacity={0.8}
      style={styles.addButton}
      accessoryLeft={(accessoryProps) => (
        <Image
          {...accessoryProps}
          style={styles.icon}
          source={require('../../assets/images/icons/cart.png')}
        />
      )}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  icon: {
    height: 45,
    width: 45,
  },
});

export default CartButton;
