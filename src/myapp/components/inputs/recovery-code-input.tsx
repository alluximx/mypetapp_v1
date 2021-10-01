import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const RecoveryCodeInput = (props): React.ReactElement => {
  return (
    <View
      style={[
        {...styles.inputContainer},
        props.isFocused && {...styles.inputContainerFocused},
      ]}>
      <Text style={styles.inputValueText}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 56,
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    width: 50,
    marginHorizontal: 4,
    justifyContent: 'center',
    paddingTop: 16,
  },
  inputContainerFocused: {
    borderColor: globalColors.greenPrimary,
    borderWidth: 1,
  },
  inputValueText: {
    height: 46,
    padding: 0,
    fontSize: 20,
    color: globalColors.darkerGray,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    textAlign: 'center',
  },
});

export default RecoveryCodeInput;
