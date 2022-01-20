import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles
import globalColors from '../../styles/colors';
// My Components
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import GenericCard from '../cards/generic-card';
// Types
import {NextServiceCardProps} from '../../types/components/services';
import {servicesTabs} from '../../constants';

const NextServiceCard = (props: NextServiceCardProps): React.ReactElement => {
  const navigation = useNavigation();

  const onPressDelete = () => {
    props.setShowDeleteModal(true);
  };
  const onPressEdit = () => {
    props.setShowEditModal(true);
  };
  const onPressRate = () => {
    navigation.navigate('RateService');
  };

  return (
    <GenericCard
      contentTextStyle={styles.subtitleCard}
      coverImageStyle={styles.coverImage}
      styleCard={props.styleCard}
      data={{
        additionalContent: [
          <View>
            <DefaultText style={styles.petName}>
              {props.service.pet.name}
            </DefaultText>
            <DefaultText style={styles.serviceName}>
              {props.service.services.join(', ')}
            </DefaultText>
          </View>,
        ],
        additionalButtons:
          props.tab === servicesTabs[0].id
            ? [
                <AnchorText
                  onPress={() => onPressDelete()}
                  style={styles.buttonDelete}
                  isSubmit>
                  Eliminar
                </AnchorText>,
                <AnchorText
                  onPress={onPressEdit}
                  style={styles.buttonEdit}
                  isSubmit>
                  Editar
                </AnchorText>,
              ]
            : [
                <AnchorText
                  onPress={onPressRate}
                  style={styles.buttonEdit}
                  isSubmit>
                  Calificar
                </AnchorText>,
              ],
        content: props.service.vet,
        title: moment(props.service.date).format('DD/MM/YYYY, HH:mm A'),
        coverImage: props.service.petImage.file,
      }}
      onClick={props.tab === servicesTabs[0].id ? onPressEdit : onPressRate}
      wrapTitle
      wrapContent
    />
  );
};

const styles = StyleSheet.create({
  subtitleCard: {
    fontSize: 14,
    marginTop: 0,
    marginBottom: 8,
  },
  coverImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  ratingCard: {marginTop: 8},
  petName: {
    fontSize: 14,
    color: globalColors.darkerGray,
  },
  serviceName: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonDelete: {
    color: globalColors.red,
    marginRight: 32,
  },
  buttonEdit: {
    color: globalColors.greenSecondary,
  },
});

export default NextServiceCard;
