import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Input} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../styles/colors';
// Types.
import {SearchInputProps} from '../../types/components/inputs';

const SearchInput = (props: SearchInputProps): React.ReactElement => {
  const renderIcon = (props) => <Icon {...props} name={'search'} />;

  return (
    <Input
      placeholder={props.placeholder ?? 'Nombre'}
      accessoryLeft={renderIcon}
      style={[styles.inputContainer, props.style]}
      onChangeText={props.onFilter}
      textStyle={styles.inputText}
    />
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
  },
  inputText: {
    minHeight: 46,
    fontSize: 16,
  },
});

export default SearchInput;
