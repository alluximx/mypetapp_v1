import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// Types
import {IndiviudalOptionSelectProps} from '../../types/components/inputs';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components
import TitleHeader from '../texts/title-header';
import DefaultText from '../texts/default-text';

const IndividualOptionSelect = (
  props: IndiviudalOptionSelectProps,
): React.ReactElement => {
  const [statusButton, setStatusButton] = useState(false);

  const key = props.value;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={key}
      style={[
        !statusButton && styles.option,
        statusButton && styles.optionSelected,
        props.style,
      ]}
      onPress={() => {
        props.setCurrentValue(key);
        setStatusButton(!statusButton);
      }}>
      {props.subtitle && (
        <DefaultText
          style={[
            styles.optionSubtitle,
            statusButton && styles.optionTextSelected,
          ]}>
          {props.subtitle}
        </DefaultText>
      )}
      {props.title && (
        <TitleHeader
          style={[
            styles.optionTitle,
            statusButton && styles.optionTextSelected,
          ]}>
          {props.title}
        </TitleHeader>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    backgroundColor: globalColors.white,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionSelected: {
    padding: 10,
    backgroundColor: globalColors.greenSecondary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionTitle: {
    justifyContent: 'flex-end',
  },
  optionSubtitle: {
    justifyContent: 'flex-start',
  },
  optionTextSelected: {
    color: globalColors.white,
  },
});

export default IndividualOptionSelect;
