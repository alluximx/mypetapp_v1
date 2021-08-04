import React, {useState} from 'react';
import {Card, StyleService, List} from '@ui-kitten/components';
import {View, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
//Global Styles
import globalColors from '../../styles/colors';
//My Components
import {DropDownIcon, DropUpIcon} from '../icons';
import AnchorText from '../texts/anchor-text';
import DefaultText from '../../components/texts/default-text';
import TitleHeader from '../../components/texts/title-header';
import VaccineImage from '../Vaccine/VaccineImage';

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

  const formattedDate = (date) => moment(date).format('DD/MM/YYYY');

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.vaccinesIndividual}>
        <View style={styles.left}>
          <VaccineImage id={item.id} />
          <DefaultText style={styles.text}>
            {formattedDate(item.date)}
          </DefaultText>
        </View>
        <AnchorText
          onPress={() => {
            props.navigation.navigate('EditVaccine', {
              vaccineId: props.data.id,
            });
          }}
          style={styles.edit}>
          Editar
        </AnchorText>
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.headerTitle}>
        <TitleHeader wrapText={true} style={styles.title}>
          {props.data.name}
        </TitleHeader>
        <View style={styles.right}>
          <DefaultText wrapText={true} style={styles.text}>
            {props.data.notification
              ? reminderEstablish(props.data.notification)
              : ''}
          </DefaultText>
          <TouchableOpacity style={styles.NotificationIcon}>
            <Image
              style={styles.ImageIcon}
              source={require('../assets/IconNotification1.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {props.data.validity === 'Unica' ? (
        <DefaultText style={styles.text}>{props.data.validity}</DefaultText>
      ) : (
        <DefaultText style={styles.text}>
          Vigencia: {formattedDate(props.data.validity)}
        </DefaultText>
      )}

      <View style={styles.headerTop}>
        {props.data.status == 'Activa' ? (
          <DefaultText style={styles.estausGreen}>
            {props.data.status}
          </DefaultText>
        ) : (
          <DefaultText style={styles.estausRed}>
            {props.data.status}
          </DefaultText>
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
    //width: 240,
  },
  vaccinesContainer: {
    marginTop: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  vaccinesIndividual: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
    marginTop: 8,
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
  },
  text: {
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
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginTop: -1,
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
});

export default VaccineCard;
