import React from 'react';
import {Button} from '@ui-kitten/components';
import {ImageStyle, StyleSheet} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
// My Components.
import {AddIcon} from '../icons';

interface AddButtonProps {
  iconStyle?: {};
  style?: {};
  onAdd: () => void;
}

const AddButton = (props: AddButtonProps): React.ReactElement => {
  const {iconStyle, style, onAdd} = props;

  return (
    <Button
      activeOpacity={0.8}
      style={[styles.addButton, style]}
      accessoryLeft={(accessoryProps) => (
        <AddIcon {...accessoryProps} style={iconStyle} />
      )}
      onPress={onAdd}
    />
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: 40,
    width: 40,
    minWidth: 0,
    minHeight: 0,
    borderRadius: 40,
    backgroundColor: globalColors.greenSecondary,
    borderWidth: 0,
  },
});

export default AddButton;
