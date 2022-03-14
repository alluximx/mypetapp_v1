import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import moment from 'moment';
// UI Kitten
import {StyleService} from '@ui-kitten/components';
// Global Styles
import globalColors from '../styles/colors';
import globalVars from '../styles/vars';
// My components
import DefaultText from './texts/default-text';
import TitleHeader from './texts/title-header';

const ReminderArea = (props): React.ReactElement => {
  const date = moment(props.data.date).format('DD/MM/YYYY');

  const editDestination = props.data.is_vaccine
    ? 'EditVaccine'
    : 'EditDeworming';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate(editDestination, {
          vaccineId: props.data.id_record,
          petId: props.data.petId,
        });
      }}>
      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.NotificationIcon}>
          <Image
            style={styles.ImageIcon}
            source={require('./assets/IconNotification.png')}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 20}}>
          <TitleHeader style={styles.tiltleText}>{props.data.name}</TitleHeader>
          <DefaultText style={styles.defaultText} children={date} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderArea;

const {width} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    width: width - globalVars.outsidePadding - 22,
    height: 80,
    borderRadius: 18,
    backgroundColor: globalColors.greenPrimary,
    marginBottom: 14,
  },
  ViewContainer: {
    marginLeft: 20,
    marginTop: 15,
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
