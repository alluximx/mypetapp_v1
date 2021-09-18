import React from 'react';
import {StyleService} from '@ui-kitten/components';
import {TouchableOpacity, Dimensions, View} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components
import {DropRightIcon} from '../icons';
import DefaultText from '../../components/texts/default-text';
import TitleHeader from '../../components/texts/title-header';

const NavigateButton = (props): React.ReactElement => {
  const navigateToScreen = () => {
    if (props.data) {
      props.destination &&
        props.navigation.navigate(props.destination, {data: props.data});
    } else {
      props.destination && props.navigation.navigate(props.destination);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      {props.title ? (
        <TitleHeader style={styles.title}>{props.title}</TitleHeader>
      ) : (
        <TitleHeader>{}</TitleHeader>
      )}
      <View style={styles.content}>
        <DefaultText style={styles.subtitle} children={props.subtitle} />
        <DropRightIcon style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    width: width - globalVars.outsidePadding - 22,
    height: 70,
    borderRadius: 18,
    backgroundColor: globalColors.white,
    marginBottom: 14,
  },
  title: {
    marginLeft: 14,
    fontSize: 16,
  },
  subtitle: {
    marginLeft: 14,
    fontSize: 14,
  },
  arrowIcon: {
    alignContent: 'flex-end',
    top: -5,
  },
  content: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NavigateButton;
