import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Constants
import {servicesTabs} from '../../constants';
// Global Styles
import globalColors from '../../styles/colors';
// My Components
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import GenericCard from '../cards/generic-card';
// Types
import {NextServiceCardProps} from '../../types/components/services';

const NextServiceCard = (props: NextServiceCardProps): React.ReactElement => {
  const navigation = useNavigation();

  const onPressDelete = () => props.onPressDeleteModal();
  const onPressEdit = () => props.onPressEditModal();
  const onPressPending = () => props.onPressPendingModal();
  const onPressRate = () =>
    navigation.navigate('RateService', {
      appointmentId: props.service?.id,
      services: props.service?.services,
    });

  return (
    <GenericCard
      contentTextStyle={styles.subtitleCard}
      coverImageStyle={styles.coverImage}
      isDisabled={props.service?.rate !== 0}
      styleCard={props.styleCard}
      key={props.service?.id}
      data={{
        additionalContent: [
          <View key={`petData-${props.service?.id}`}>
            <DefaultText
              key={`petName-${props.service?.id}`}
              style={styles.petName}>
              {props.service?.pet.name}
            </DefaultText>

            <DefaultText
              key={`services-${props.service?.id}`}
              style={styles.serviceName}>
              {props.service?.services
                ? props.service?.services
                    ?.split('\n')
                    .join('')
                    .split(/ - \$\S*/)
                    .filter(Boolean)
                    .join(', ')
                : 'Consulta'}
            </DefaultText>
          </View>,
        ],
        additionalButtons:
          props.tab === servicesTabs[0].id
            ? [
                !props.service?.is_accepted && (
                  <AnchorText
                    key={`pending-${props.service?.id}`}
                    onPress={() => {}}
                    style={styles.buttonEdit}
                    isDisabled
                    isSubmit>
                    Pendiente
                  </AnchorText>
                ),
                props.service?.is_accepted && (
                  <AnchorText
                    key={`delete-${props.service?.id}`}
                    onPress={() => onPressDelete()}
                    style={styles.buttonDelete}
                    isSubmit>
                    Eliminar
                  </AnchorText>
                ),
                props.service?.is_accepted && (
                  <AnchorText
                    key={`edit-${props.service?.id}`}
                    onPress={onPressEdit}
                    style={styles.buttonEdit}
                    isSubmit>
                    Editar
                  </AnchorText>
                ),
              ]
            : [
                <AnchorText
                  key={`rate-${props.service?.id}`}
                  onPress={onPressRate}
                  style={styles.buttonEdit}
                  isDisabled={props.service?.rate !== 0}
                  isSubmit>
                  {props.service?.rate === 0 ? 'Calificar' : 'Calificado'}
                </AnchorText>,
              ],
        content: props.service?.admin_name,
        title: moment(
          props.service?.date + ' ' + props.service?.start_time,
        ).format('DD/MM/YYYY, h:mm A'),
        coverImage:
          props.service?.pet_image[0]?.file ??
          require('../../assets/images/pets/add-pet-image.png'),
      }}
      onClick={
        props.tab === servicesTabs[0].id
          ? !props.service?.is_accepted
            ? onPressPending
            : onPressEdit
          : onPressRate
      }
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
