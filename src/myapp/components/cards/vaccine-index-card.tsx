import React, {useState} from 'react';
import {Card, StyleService, List} from '@ui-kitten/components';
import {View, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
// Global Styles
import globalColors from '../../styles/colors';
// My Components
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

  const editDestination = props.vaccine ? 'EditVaccine' : 'EditDeworming';

  const formattedDate = (date) => moment(date).format('DD/MM/YYYY');

  const renderItem = ({item}) => {
    return (
      <View style={styles.vaccinesIndividual}>
        <View style={styles.left}>
          {props.vaccine && <VaccineImage id={item.id} />}
          <DefaultText style={styles.text}>
            {formattedDate(item.date)}
          </DefaultText>
        </View>
        <AnchorText
          onPress={() => {
            props.navigation.navigate(editDestination, {
              vaccineId: item.id,
            });
          }}
          style={styles.edit}
          isSubmit>
          Editar
        </AnchorText>
      </View>
    );
  };

  return (
    <Card style={styles.container} disabled={true}>
      <View style={styles.headerTitle}>
        <TitleHeader wrapText={true} style={styles.title}>
          {props.data.name}
        </TitleHeader>
        {props.data.notification && (
          <View style={styles.right}>
            <DefaultText wrapText={true} style={styles.text}>
              {reminderEstablish(props.data.notification)}
            </DefaultText>
            <TouchableOpacity style={styles.notificationIcon}>
              <Image
                style={styles.imageIcon}
                source={require('../assets/IconNotification1.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {props.data.validity === 'Unica' ? (
        <DefaultText style={styles.text}>{props.data.validity}</DefaultText>
      ) : (
        <DefaultText style={styles.text}>
          Vigencia: {formattedDate(props.data.validity)}
        </DefaultText>
      )}

      <View style={styles.headerTop}>
        {props.data.status === 'Activa' ? (
          <DefaultText style={styles.statusGreen}>
            {props.data.status}
          </DefaultText>
        ) : (
          <DefaultText style={styles.statusRed}>
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
      {isOpen && props.data.vaccineDates && (
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
    marginTop: 16,
    borderRadius: 18,
  },
  vaccinesContainer: {
    marginTop: 16,
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
  },
  text: {
    fontSize: 14,
  },
  statusGreen: {
    color: globalColors.greenSecondary,
    marginTop: 4,
    fontSize: 14,
  },
  statusRed: {
    color: globalColors.red,
    marginTop: 4,
    fontSize: 14,
  },
  right: {
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: -5,
  },
  left: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  arrowIcon: {
    alignContent: 'flex-end',
    top: 0,
    right: 0,
  },
  edit: {
    alignContent: 'flex-end',
  },
  notificationIcon: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: 50,
    backgroundColor: globalColors.greenSecondary,
    alignContent: 'flex-end',
    marginRight: 5,
    marginLeft: 10,
    marginTop: -1,
  },
  imageIcon: {
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
