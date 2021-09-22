import React, {useContext, useEffect} from 'react';
import {Button} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Context
import {AuthContext} from '../../context/AuthContext';
// Hooks
import useShoppingCart from '../../hooks/products/useShoppingCart';

const CartButton = (): React.ReactElement => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const {data} = useShoppingCart(authContext.userId);
  const hasProducts = data?.data?.length > 0;

  useEffect(() => {
    console.log('HOLA');
  }, [data]);

  const onPress = () => navigation.navigate('Cart');

  return (
    <Button
      activeOpacity={0.8}
      style={styles.addButton}
      accessoryLeft={(accessoryProps) => {
        return hasProducts ? (
          <Image
            {...accessoryProps}
            style={styles.icon}
            source={require('../../assets/images/icons/cart-bubble.png')}
          />
        ) : (
          <Image
            {...accessoryProps}
            style={styles.icon}
            source={require('../../assets/images/icons/cart.png')}
          />
        );
      }}
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
