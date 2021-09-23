import React, {useContext} from 'react';
import {Button} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Context
import {AuthContext} from '../../context/AuthContext';
// Hooks
import useShoppingCart from '../../hooks/products/useShoppingCart';
import globalColors from '../../styles/colors';

const CartButton = (): React.ReactElement => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const {data} = useShoppingCart(authContext.userId);
  const hasProducts = data?.data?.length > 0;

  const onPress = () => navigation.navigate('Cart');

  return (
    <Button
      accessoryLeft={(accessoryProps) =>
        hasProducts ? (
          <Image
            {...accessoryProps}
            style={styles.icon}
            source={require('../../assets/images/icons/cart-bubble.png')}
          />
        ) : (
          <Image
            {...accessoryProps}
            style={[styles.icon, styles.disabled]}
            source={require('../../assets/images/icons/cart.png')}
          />
        )
      }
      activeOpacity={0.8}
      disabled={!hasProducts}
      style={styles.addButton}
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
  disabled: {
    tintColor: globalColors.darkGray,
  },
});

export default CartButton;
