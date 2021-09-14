import React from 'react';
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
  const text = props.text ? props.text : 'Recordatorio';
  const disable = props.isDisable ? props.isDisable : false;
  const isReminder = props.isNotReminder ? props.isNotReminder : false;
  return (
    <View style={[styles.container, props.style]}>
      <Card style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>{text}</Text>
          <Toggle
            checked={props.isActive}
            onChange={props.setIsActive}
            status="success"
            disabled={disable}
            style={styles.toggleInput}>
            {''}
          </Toggle>
        </View>
      </Card>
      {props.isActive && !isReminder && (
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
  container: {
    marginVertical: 16,
  },
  cardContainer: {
    borderRadius: 8,
    height: 56,
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
  option: {marginTop: 16},
});

export default ReminderInput;
