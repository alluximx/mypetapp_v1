import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import {Datepicker} from '@ui-kitten/components';
import moment from 'moment';
// Constants.
import {localeDateService} from '../../constants';
// My Components.
import {DropDownIcon} from '../icons';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {DatePickerProps} from '../../types/components/inputs';

const CalendarIcon = () => <DropDownIcon style={styles.arrowIcon} />;

const DatepickerInput = (props: DatePickerProps) => {
  const focusAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const minDate = props.minDate
    ? new Date(props.minDate)
    : new Date('Jan 01 1990');
  const maxDate = props.maxDate
    ? new Date(props.maxDate)
    : new Date('Dec 31 2050');

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: props.currentValue !== '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [props.currentValue]);

  return (
    <View>
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
      <Datepicker
        accessoryRight={CalendarIcon}
        controlStyle={styles.container}
        date={
          props.currentValue !== ''
            ? moment(props.currentValue).utc().toDate()
            : ''
        }
        dateService={localeDateService}
        disabled={props.disabled}
        max={maxDate}
        min={minDate}
        placeholder={(placeholderProps) => (
          <Text
            {...placeholderProps}
            style={[placeholderProps.style, styles.placeholder]}>
            Selecciona una fecha
          </Text>
        )}
        onSelect={(date: Date) => props.onSelect(date)}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    padding: 15,
    paddingTop: 25,
    marginBottom: 10,
  },
  arrowIcon: {
    top: -7,
    right: 0,
  },
  inputLabel: {
    color: globalColors.darkGray,
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    left: 16,
    position: 'absolute',
    zIndex: 5,
  },
  placeholder: {
    color: 'transparent',
  },
});

export default DatepickerInput;
