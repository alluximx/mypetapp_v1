import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {AnchorTextProps} from '../../types/components/texts';
// Hooks
import useIsGuest from '../../hooks/useIsGuest';

const AnchorText = (props: AnchorTextProps): React.ReactElement => {
  const [isGuest, showModal, renderAlert] = useIsGuest();
  const shouldShowModal = props.isSubmit && isGuest;
  return (
    <>
      {shouldShowModal && renderAlert()}
      <TouchableOpacity
        disabled={props.isDisabled ?? false}
        activeOpacity={0.8}
        onPress={shouldShowModal ? showModal : props.onPress}>
        <Text
          style={[
            styles.anchorText,
            props.isDisabled && styles.disabledText,
            props.style,
          ]}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  anchorText: {
    color: globalColors.greenSecondary,
    fontSize: 16,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  disabledText: {
    color: globalColors.lightGray,
  },
});

export default AnchorText;
