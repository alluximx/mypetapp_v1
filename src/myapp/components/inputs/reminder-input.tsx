import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Toggle} from '@ui-kitten/components';
// Constants.
import {reminderOptions} from '../../constants';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components.
import OptionSelect from './option-select';
// Types.
import {ReminderInputProps} from '../../types/components/inputs';

const ReminderInput = (props: ReminderInputProps): React.ReactElement => {
  return (
    <View style={[styles.container, props.style]}>
      <Card style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Recordatorio</Text>
          <Toggle
            checked={props.isActive}
            onChange={props.setIsActive}
            status="success"
            style={styles.toggleInput}>
            {''}
          </Toggle>
        </View>
      </Card>
      {props.isActive && (
        <OptionSelect
          currentValue={props.value}
          data={reminderOptions}
          setCurrentValue={props.setValue}
          optionStyle={styles.option}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    borderRadius: 8,
    height: 56,
    marginVertical: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: globalColors.darkerGray,
  },
  toggleInput: {
    height: 26,
  },
  option: {marginBottom: 16},
});

export default ReminderInput;
