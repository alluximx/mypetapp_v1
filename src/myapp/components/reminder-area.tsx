import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
//UI Kitten
import {StyleService} from '@ui-kitten/components';
//Global Styles
import globalColors from '../styles/colors';
import globalVars from '../styles/vars';
//My components
import DefaultText from './texts/default-text';
import TitleHeader from './texts/title-header';

interface reminderAreaProps {
  title: string;
  date: string;
}

const ReminderArea = (props): React.ReactElement => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.NotificationIcon}>
          <Image
            style={styles.ImageIcon}
            source={require('./assets/IconNotification.png')}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 20}}>
          <TitleHeader style={styles.tiltleText}>{'Parainfluenza'}</TitleHeader>
          <DefaultText style={styles.defaultText} children="21/02/2021" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderArea;

const {width} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    width: width - globalVars.outsidePadding - 15,
    height: 90,
    borderRadius: 18,
    backgroundColor: globalColors.greenPrimary,
    marginBottom: 8,
  },
  ViewContainer: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  tiltleText: {
    color: globalColors.white,
    fontSize: 16,
  },
  defaultText: {
    color: globalColors.white,
    fontSize: 14,
  },
  NotificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: globalColors.greenTertiary,
  },
  ImageIcon: {
    alignContent: 'center',
    marginLeft: 8,
    marginTop: 7,
    minWidth: 35,
    minHeight: 35,
  },
});
