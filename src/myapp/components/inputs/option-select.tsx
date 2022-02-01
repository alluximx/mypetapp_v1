import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types.
import {Option, OptionSelectProps} from '../../types/components/inputs';
// My components
import TitleHeader from '../texts/title-header';

export const OPTION_GAP = 16;
const {width} = Dimensions.get('window');
const LIST_ITEM_HEIGHT = 56;

const OptionSelect = (props: OptionSelectProps): React.ReactElement => {
  const renderOption = ({item}: {item: Option}) => {
    const {isDisabled, key, title, value} = item;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisabled}
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
          isDisabled && styles.optionDisabled,
          props.optionStyle,
        ]}
        onPress={() => {
          props.setCurrentValue(key);
        }}>
        {title && (
          <TitleHeader
            style={[
              props.titleStyle,
              props.currentValue === key && styles.optionTextSelected,
            ]}>
            {title}
          </TitleHeader>
        )}
        <Text
          style={[
            styles.optionText,
            props.currentValue === key && styles.optionTextSelected,
            props.textStyle,
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <List
      contentContainerStyle={props.containerStyle}
      data={props.data}
      getItemLayout={(data, index) => ({
        length: LIST_ITEM_HEIGHT,
        offset: LIST_ITEM_HEIGHT * index,
        index,
      })}
      horizontal={props.horizontal ?? false}
      ListEmptyComponent={props.emptyComponent}
      ListFooterComponent={props.footerComponent}
      ListHeaderComponent={props.headerComponent}
      numColumns={props.numColumns && props.numColumns}
      renderItem={renderOption}
      scrollEnabled={
        props.horizontal ? (props.enableScroll ? true : false) : true
      }
      columnWrapperStyle={props.columnWrapperStyle ?? null}
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
  optionDisabled: {
    backgroundColor: globalColors.lightGray,
  },
});

export default OptionSelect;
