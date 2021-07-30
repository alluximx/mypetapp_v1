import React, {useState} from 'react';
import {Card, Text, StyleService, List} from '@ui-kitten/components';
import {View, TouchableOpacity, Image} from 'react-native';
//Global Styles
import globalColors from '../../styles/colors';
//My Components
import {NotificationIConGreen, DropDownIcon, DropUpIcon} from '../icons';

const VaccineCard = (props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  function handleIConPress() {
    setIsOpen(!isOpen);
  }

  const reminderEstablish = (days) => {
    let day = days;
    let complement: string;
    if (days % 7 === 0) {
      if (days / 7 === 1) {
        complement = 'semana';
      } else {
        complement = 'semanas';
      }
      day = days / 7;
    } else {
      days === 1 ? (complement = 'día') : (complement = 'días');
    }
    return day + ` ` + complement + ` antes`;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.vaccinesIndividual}>
        <View style={styles.left}>
          <NotificationIConGreen style={styles.bellIcon} />
          <Text>{item.date}</Text>
        </View>
        <Text style={styles.edit}>Editar</Text>
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.headerTitle}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {props.data.name}
        </Text>
        <View style={styles.right}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
            {props.data.notification
              ? reminderEstablish(props.data.notification)
              : ''}
          </Text>
          <TouchableOpacity style={styles.NotificationIcon}>
            <Image
              style={styles.ImageIcon}
              source={require('../assets/IconNotification1.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {props.data.validity === 'Unica' ? (
        <Text style={styles.text}>{props.data.validity}</Text>
      ) : (
        <Text style={styles.text}>Vigencia: {props.data.validity}</Text>
      )}

      <View style={styles.headerTop}>
        {props.data.status == 'Activa' ? (
          <Text style={styles.estausGreen}>{props.data.status}</Text>
        ) : (
          <Text style={styles.estausRed}>{props.data.status}</Text>
        )}
        <TouchableOpacity onPress={handleIConPress}>
          {!isOpen ? (
            <DropDownIcon style={styles.arrowIcon} />
          ) : (
            <DropUpIcon style={styles.arrowIcon} />
          )}
        </TouchableOpacity>
      </View>
      {isOpen &&
        (props.data.vaccineDates ? (
          <View style={styles.vaccinesContainer}>
            <List
              style={styles.listContainer}
              data={props.data.vaccineDates}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <View style={styles.vaccinesContainer}></View>
        ))}
    </Card>
  );
};

const styles = StyleService.create({
  container: {
    marginTop: 20,
    borderRadius: 18,
    //width: 400,
  },
  vaccinesContainer: {
    marginTop: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    //minWidth: 300,
  },
  vaccinesIndividual: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  title: {
    color: globalColors.black,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
    //maxWidth: 100,
  },
  text: {
    color: globalColors.black,
    fontSize: 14,
  },
  estausGreen: {
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
    fontSize: 14,
  },
  estausRed: {
    color: globalColors.red,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
    fontSize: 14,
  },
  right: {
    //maxWidth: 90,
    flexDirection: 'row',
    alignContent: 'flex-end',
    marginTop: 7,
    marginRight: -5,
  },
  left: {
    flexDirection: 'row',
    marginTop: 10,
    alignContent: 'flex-start',
  },
  arrowIcon: {
    alignContent: 'flex-end',
    top: 0,
    right: -7,
  },
  edit: {
    marginTop: 10,
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    alignContent: 'flex-end',
  },
  NotificationIcon: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: 50,
    backgroundColor: globalColors.greenSecondary,
    alignContent: 'flex-end',
    marginTop: -5,
    marginLeft: 5,
  },
  ImageIcon: {
    alignContent: 'center',
    marginLeft: 5,
    marginTop: 5,
    minWidth: 20,
    minHeight: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
  bellIcon: {
    top: 0,
  },
});

export default VaccineCard;
