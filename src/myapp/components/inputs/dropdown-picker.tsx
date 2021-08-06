import React, {useEffect, useRef, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Animated, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components.
import {DropDownIcon} from '../icons';
// Types.
import {DropdownPickerProps} from '../../types/components/inputs';

const DropdownPicker = (props: DropdownPickerProps): React.ReactElement => {
  const {
    currentValue,
    data,
    disabled = false,
    placeholder,
    setCurrentValue,
  } = props;
  const focusAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: props.currentValue !== '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [props.currentValue]);

  return (
    <View style={[styles.container, props.style]}>
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
              outputRange: !disabled
                ? [globalColors.darkGray, globalColors.lightGray]
                : [globalColors.darkGray, globalColors.darkGray],
            }),
          },
        ]}>
        {props.placeholder}
      </Animated.Text>

      <RNPickerSelect
        Icon={() => (
          <DropDownIcon
            style={disabled && {tintColor: globalColors.darkGray}}
          />
        )}
        items={data}
        onValueChange={setCurrentValue}
        pickerProps={{
          mode: 'dropdown',
          onBlur: () => setIsDropdownOpen(false),
          onFocus: () => setIsDropdownOpen(true),
        }}
        placeholder={{
          value: '',
          label: placeholder ?? 'Seleccione una opción...',
        }}
        style={
          !isDropdownOpen
            ? !disabled
              ? selectorStyles
              : selectorStylesDisabled
            : {
                inputAndroid: {
                  ...selectorStyles.inputAndroid,
                  borderWidth: 1,
                  borderColor: globalColors.greenSecondary,
                },
              }
        }
        useNativeAndroidPickerStyle={false}
        value={currentValue}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  inputLabel: {
    color: globalColors.darkGray,
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    left: 16,
    position: 'absolute',
    zIndex: 5,
  },
});

const selectorStyles = {
  inputAndroid: {
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    color: globalColors.black,
    fontFamily: globalVars.fontRegular,
    fontSize: 16,
    height: 56,
    padding: 15,
    paddingBottom: -20,
  },
  placeholder: {
    color: 'transparent',
  },
};

const selectorStylesDisabled = {
  inputAndroid: {
    ...selectorStyles.inputAndroid,
    backgroundColor: globalColors.lightGray,
  },
  placeholder: {
    color: 'transparent',
  },
};

export default DropdownPicker;
