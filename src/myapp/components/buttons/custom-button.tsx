import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Spinner, Text} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {CustomButtonProps} from '../../types/components/buttons';
import useIsGuest from '../../hooks/useIsGuest';

const CustomButton = (props: CustomButtonProps): React.ReactElement => {
  const [isGuest, showModal, renderAlert] = useIsGuest();
  const shouldShowModal = props.isSubmit && isGuest;
  const loadingSpinner = () => (
    <View style={styles.spinner}>
      <Spinner size="medium" status="basic" />
    </View>
  );

  return props.isLight ? (
    // Light Button
    <>
      {shouldShowModal && renderAlert()}
      <Button
        activeOpacity={0.8}
        appearance="ghost"
        style={[styles.button, styles.lightButton, props.style]}
        onPress={shouldShowModal ? showModal : props.onPress}>
        {() => <Text style={styles.lightButtonText}>{props.children}</Text>}
      </Button>
    </>
  ) : (
    // Default Button...
    <>
      {shouldShowModal && renderAlert()}
      <Button
        activeOpacity={0.8}
        style={[
          styles.button,
          props.isDisabled
            ? styles.defaultButton
            : styles.defaultButtonDisabled,
          props.style,
        ]}
        onPress={shouldShowModal ? showModal : props.onPress}
        disabled={props.isDisabled}
        accessoryLeft={props.isLoading ? loadingSpinner : null}>
        {() =>
          !props.isLoading && (
            <Text style={styles.defaultButtonText}>{props.children}</Text>
          )
        }
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 0,
  },
  lightButton: {
    backgroundColor: globalColors.white,
    paddingVertical: 13,
  },
  lightButtonText: {
    color: globalColors.greenSecondary,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontSize: 17,
  },
  defaultButton: {
    backgroundColor: globalColors.lightGray,
    borderWidth: 0,
  },
  defaultButtonText: {
    color: globalColors.white,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontSize: 17,
  },
  defaultButtonDisabled: {
    backgroundColor: globalColors.greenSecondary,
  },
  spinner: {paddingHorizontal: 10},
});

export default CustomButton;
