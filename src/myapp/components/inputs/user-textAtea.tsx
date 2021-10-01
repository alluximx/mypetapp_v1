import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input} from '@ui-kitten/components';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {UserInputProps} from '../../types/components/inputs';

const UserTextArea = (props: UserInputProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const focusAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const inputPadding: number = !isFocused && props.value === '' ? 0 : 16;
  const inputOutline: string = isFocused
    ? globalColors.greenSecondary
    : globalColors.lightGreen;

  const renderIcon = () => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Text style={styles.toggleShowText}>
        {secureTextEntry ? 'Mostrar' : 'Ocultar'}
      </Text>
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || props.value !== '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.inputLabel,
          // Label animations
          {
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 16],
            }),
            fontSize: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 16],
            }),
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [globalColors.darkGray, globalColors.lightGray],
            }),
          },
        ]}>
        {props.placeholder}
      </Animated.Text>
      <Input
        accessoryRight={props.isPassword ? renderIcon : null}
        autoCapitalize={props.autoCapitalize ? 'words' : 'none'}
        autoCorrect={false}
        onBlur={() => setIsFocused(false)}
        onChangeText={(value) => {
          props.onChangeText(value);
        }}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={props.isPassword ? secureTextEntry : null}
        style={[
          styles.inputValue,
          {
            borderColor: inputOutline,
          },
          props.error && props.error !== '' && styles.errorOutline,
        ]}
        textStyle={[styles.inputValueText, {paddingTop: inputPadding}]}
        value={props.value}
        multiline={true}
        maxLength={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 140,
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    marginBottom: 8,
  },
  inputLabel: {
    position: 'absolute',
    left: 16,
    color: globalColors.darkGray,
    fontSize: 14,
    fontFamily: globalVars.fontRegular,
  },
  inputValue: {
    backgroundColor: 'transparent',
    height: 56,
    borderRadius: 10,
  },
  inputValueText: {
    height: 46,
    padding: 0,
    fontSize: 16,
    marginRight: 10,
    minHeight: 129,
    textAlignVertical: 'top',
  },
  toggleShowText: {
    color: globalColors.greenSecondary,
    fontSize: 16,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  errorOutline: {
    borderColor: 'red',
  },
});

export default UserTextArea;
