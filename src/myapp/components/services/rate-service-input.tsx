import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../styles/colors';
// Types.
import {RateServiceInputProps} from '../../types/components/services';

const RateServiceInput = (props: RateServiceInputProps): React.ReactElement => {
  const renderStar = ({item}): React.ReactElement => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={() => props.setValue(item)}>
      <Image
        source={
          props.value >= item
            ? require('./assets/star-full.png')
            : require('./assets/star-empty.png')
        }
        style={styles.star}
      />
    </TouchableOpacity>
  );
  return (
    <List
      data={[1, 2, 3, 4, 5]}
      horizontal
      renderItem={renderStar}
      style={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.backgroundDefault,
    flexGrow: 0,
    marginBottom: 32,
  },
  star: {
    height: 48,
    width: 48,
    marginRight: 8,
  },
});

export default RateServiceInput;
