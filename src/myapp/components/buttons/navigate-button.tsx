import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles
import globalColors from '../../styles/colors';
// My Components
import {DropRightIcon} from '../icons';
import DefaultText from '../../components/texts/default-text';
import TitleHeader from '../../components/texts/title-header';
// Types
import {NavigateButtonProps} from '../../types/components/buttons';

const NavigateButton = (props: NavigateButtonProps): React.ReactElement => {
  const navigation = useNavigation();
  const navigateToScreen = () => {
    if (props.data) {
      props.destination &&
        navigation.navigate(props.destination, {data: props.data});
    } else {
      props.destination && navigation.navigate(props.destination);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      {props.title && props.subtitle ? (
        <View style={styles.containerPadding}>
          <TitleHeader style={styles.title}>{props.title}</TitleHeader>
          <DefaultText style={styles.subtitle}>{props.subtitle} </DefaultText>
        </View>
      ) : (
        <View style={styles.containerPlaceholder}>
          <DefaultText style={styles.placeholder}>
            {props.placeholder}
          </DefaultText>
        </View>
      )}
      <DropRightIcon style={styles.iconStyles} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    backgroundColor: globalColors.white,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 14,
  },
  placeholder: {
    color: globalColors.darkerGray,
  },
  iconStyles: {
    height: 40,
    width: 40,
    top: 0,
    right: 8,
  },
  containerPadding: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  containerPlaceholder: {
    paddingVertical: 27,
    paddingHorizontal: 16,
  },
});

export default NavigateButton;
