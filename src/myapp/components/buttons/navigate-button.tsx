import React from 'react';
import {StyleService} from '@ui-kitten/components';
import {TouchableOpacity, Dimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components
import {DropRightIcon} from '../icons';
import DefaultText from '../../components/texts/default-text';
import TitleHeader from '../../components/texts/title-header';
// Types
import {NavigateButtonProps} from '../../types/components/buttons';

const NavigateButton = (props: NavigateButtonProps): React.ReactElement => {
  const navigation = useNavigation();
  const navigateToScreen = () => {
    const params = {setValue: props.setValue};
    if (props.data) {
      props.destination &&
        navigation.navigate(props.destination, {...params, data: props.data});
    } else {
      props.destination && navigation.navigate(props.destination, params);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      <View>
        {props.title ? (
          <View style={styles.titleContent}>
            <TitleHeader style={styles.title}>{props.title}</TitleHeader>
          </View>
        ) : (
          <DefaultText>{}</DefaultText>
        )}

        <View style={styles.content}>
          <DefaultText style={styles.subtitle}>{props.subtitle} </DefaultText>
        </View>
      </View>
      <View style={styles.containerIcon}>
        <DefaultText>{}</DefaultText>
        <View style={styles.arrowIcon}>
          <DropRightIcon style={{top: -2}} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    width: width - globalVars.outsidePadding - 22,
    borderRadius: 18,
    backgroundColor: globalColors.white,
    marginBottom: 14,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 14,
    fontSize: 16,
  },
  subtitle: {
    marginLeft: 14,
    fontSize: 14,
  },
  containerIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowIcon: {
    alignContent: 'flex-end',
    justifyContent: 'center',
  },

  titleContent: {
    marginTop: 15,
  },
  emptyTitle: {
    marginTop: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default NavigateButton;
