import React from 'react';
import {Button, ButtonElement, ButtonProps, Icon} from '@ui-kitten/components';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

export const DrawerShowcase = (props?: ButtonProps): ButtonElement => {
  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectIndex, setSelectIndex] = React.useState(undefined);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderInputIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const HeartIcon = (props) => <Icon {...props} name="menu-outline" />;

  return (
    <Button
      {...props}
      style={styles.button}
      accessoryLeft={HeartIcon}
      appearance="ghost"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  button: {
    margin: 2,
    color: 'white',
  },
});
