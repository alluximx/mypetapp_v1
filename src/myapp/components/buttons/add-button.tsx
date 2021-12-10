import React from 'react';
import {Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
// My Components.
import {AddIcon} from '../icons';
// Hooks
import useIsGuest from '../../hooks/useIsGuest';

interface AddButtonProps {
  iconStyle?: {};
  isDisabled?: boolean;
  style?: {};
  onAdd: (props?: {}) => void;
  isSubmit?: boolean;
}

const AddButton = (props: AddButtonProps): React.ReactElement => {
  const [isGuest, showModal, renderAlert] = useIsGuest();
  const {iconStyle, style, onAdd, isSubmit} = props;
  const shouldShowModal = isSubmit && isGuest;
  return (
    <>
      {shouldShowModal && renderAlert()}
      <Button
        disabled={props.isDisabled || false}
        activeOpacity={0.8}
        style={[styles.addButton, style]}
        accessoryLeft={(accessoryProps) => (
          <AddIcon {...accessoryProps} style={iconStyle} />
        )}
        onPress={shouldShowModal ? showModal : onAdd}
      />
    </>
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
