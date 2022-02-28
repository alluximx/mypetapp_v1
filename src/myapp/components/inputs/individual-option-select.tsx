import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// Types
import {IndiviudalOptionSelectProps} from '../../types/components/inputs';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';

const IndividualOptionSelect = (
  props: IndiviudalOptionSelectProps,
): React.ReactElement => {
  const [statusButton, setStatusButton] = useState(props.enabled ?? false);

  const key = props.value;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={key}
      style={[
        styles.container,
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
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: globalColors.white,
  },
  optionSelected: {
    backgroundColor: globalColors.greenSecondary,
  },
  optionTitle: {
    justifyContent: 'flex-end',
    marginBottom: 0,
    fontSize: 16,
  },
  optionSubtitle: {
    justifyContent: 'flex-start',
  },
  optionTextSelected: {
    color: globalColors.white,
  },
});

export default IndividualOptionSelect;
