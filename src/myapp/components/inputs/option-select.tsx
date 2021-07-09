import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types
import {OptionSelectProps} from '../../types/components/inputs';

const width = Dimensions.get('window').width;
const optionGap = 16;

const OptionSelect = (props: OptionSelectProps): React.ReactElement => {
  const renderOption = (option) => {
    const {key, value} = option.item;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={key}
        style={[
          styles.option,
          props.currentValue == key && styles.optionSelected,
          props.horizontal && {
            marginRight: optionGap,
            width:
              width / props.data.length -
              globalVars.outsidePadding * 2 +
              optionGap,
          },
          props.optionStyle,
        ]}
        onPress={() => {
          props.setCurrentValue(key);
        }}>
        <Text
          style={[
            styles.optionText,
            props.currentValue == key && styles.optionTextSelected,
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <List
      showsHorizontalScrollIndicator={props.horizontal ? false : true}
      scrollEnabled={props.horizontal ? false : true}
      data={props.data}
      style={styles.optionsContainer}
      renderItem={renderOption}
      horizontal={props.horizontal}
    />
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 32,
    backgroundColor: globalColors.backgroundDefault,
  },
  option: {
    padding: 16,
    backgroundColor: globalColors.white,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: globalColors.greenSecondary,
  },
  optionText: {
    fontSize: 16,
    fontFamily: globalVars.fontRegular,
  },
  optionTextSelected: {
    color: globalColors.white,
  },
});

export default OptionSelect;
