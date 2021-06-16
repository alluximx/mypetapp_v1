import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Input} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

const RecoveryCodeInput = (props): React.ReactElement => {
  const inputRef = useRef();
  // const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputOutline: string = isFocused
    ? globalColors.greenSecondary
    : globalColors.lightGreen;

  return (
    <View
      style={[
        {...styles.inputContainer},
        props.isFocused && {...styles.inputContainerFocused},
      ]}>
      {/* <Input
        ref={inputRef}
        style={[
          styles.inputValue,
          {
            borderColor: inputOutline,
          },
        ]}
        textStyle={styles.inputValueText}
        keyboardType="numeric"
        value={props.value}
        // onChangeText={(val) => {
        //   // setValue(val);
        //   // props.nextInput(inputRef);
        // }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      /> */}
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
    textAlign: 'center',
  },
});

export default RecoveryCodeInput;
