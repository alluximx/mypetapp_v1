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

  const renderItem = ({item, index}) => {
    /* console.log(item); */
    /* return <Text>Hola</Text>; */
    return (
      <View style={styles.vaccinesIndividual}>
        <NotificationIConGreen />
        <Text style={styles.left}>{item}</Text>
        <Text style={styles.edit}>Editar</Text>
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={styles.title}>{props.data.name}</Text>
        <Text style={styles.right}>{props.data.notification}</Text>
        <TouchableOpacity style={styles.NotificationIcon}>
          <Image
            style={styles.ImageIcon}
            source={require('../assets/IconNotification.png')}
          />
        </TouchableOpacity>
      </View>
      <Text>Vigencia: {props.data.validity}</Text>
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
      {isOpen && (
        <View style={styles.vaccinesContainer}>
          <List
            style={styles.listContainer}
            data={props.data.vaccineDates}
            renderItem={renderItem}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleService.create({
  container: {
    marginTop: 20,
    borderRadius: 18,
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
    paddingBottom: 10,
  },
  vaccinesIndividual: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  title: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
  },
  estausGreen: {
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
  },
  estausRed: {
    color: globalColors.red,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
  },
  right: {
    alignContent: 'flex-end',
    marginTop: 10,
    marginRight: -30,
  },
  left: {
    marginTop: 10,
    marginLeft: -150,
  },
  arrowIcon: {
    alignContent: 'flex-end',
    top: 0,
    right: 5,
  },
  notificationIcon: {
    alignContent: 'flex-end',
  },
  edit: {
    marginTop: 10,
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    alignContent: 'flex-end',
  },
  NotificationIcon: {
    minWidth: 35,
    minHeight: 35,
    borderRadius: 50,
    backgroundColor: globalColors.greenSecondary,
    alignContent: 'flex-end',
    marginTop: 5,
    marginRight: 0,
  },
  ImageIcon: {
    alignContent: 'center',
    marginLeft: 3,
    marginTop: 2,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
});

export default VaccineCard;
