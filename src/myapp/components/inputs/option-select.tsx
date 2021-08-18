import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types.
import {OptionSelectProps} from '../../types/components/inputs';

const {height, width} = Dimensions.get('window');
const OPTION_GAP = 16;
const LIST_ITEM_HEIGHT = 56;

const OptionSelect = (props: OptionSelectProps): React.ReactElement => {
  const renderOption = (option) => {
    const {key, value} = option.item;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={key}
        style={[
          styles.option,
          props.currentValue === key && styles.optionSelected,
          props.horizontal && {
            marginRight: OPTION_GAP,
            width:
              width / props.data.length -
              globalVars.outsidePadding * 2 +
              OPTION_GAP,
          },
          props.optionStyle,
        ]}
        onPress={() => {
          props.setCurrentValue(key);
        }}>
        <Text
          style={[
            styles.optionText,
            props.currentValue === key && styles.optionTextSelected,
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectedIndex = props.data
    .map((option) => option.key)
    .indexOf(props.currentValue);

  return (
    <List
      data={props.data}
      getItemLayout={(data, index) => ({
        length: LIST_ITEM_HEIGHT,
        offset: LIST_ITEM_HEIGHT * index,
        index,
      })}
      horizontal={props.horizontal ?? false}
      renderItem={renderOption}
      onScroll={(e) => {
        // console.log(e);
      }}
      scrollEnabled={props.horizontal ? false : true}
      showsHorizontalScrollIndicator={props.horizontal ? false : true}
      style={[styles.optionsContainer, props.style]}
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
    height: 56,
  },
  optionSelected: {
    backgroundColor: globalColors.greenSecondary,
  },
  optionText: {
    fontSize: 16,
    fontFamily: globalVars.fontRegular,
    color: globalColors.darkerGray,
  },
  optionTextSelected: {
    color: globalColors.white,
  },
});

export default OptionSelect;
