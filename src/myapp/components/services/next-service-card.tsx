import React, {useEffect} from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Constants
import {servicesTabs} from '../../constants';
// Global Styles
import globalColors from '../../styles/colors';
// Hooks
import useMyPetImage from '../../hooks/pets/useMyPetImage';
import useGetPet from '../../hooks/user/useGetPet';
// My Components
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import GenericCard from '../cards/generic-card';
// Types
import {NextServiceCardProps} from '../../types/components/services';

const NextServiceCard = (props: NextServiceCardProps): React.ReactElement => {
  const navigation = useNavigation();
  const petQuery = useGetPet(props.service.pet);
  const petImage = useMyPetImage(props.service.pet);
  const [petData, setPetData] = React.useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    if (petImage.isSuccess && petQuery.isSuccess) {
      setPetData({
        image: petImage.data?.data[0]?.file,
        name: petQuery.data?.data?.name,
      });
    }
  }, [petImage.data?.data, petQuery.data?.data]);

  const onPressDelete = () => props.onPressDeleteModal();
  const onPressEdit = () => props.onPressEditModal();
  const onPressRate = () => navigation.navigate('RateService');

  return (
    <GenericCard
      contentTextStyle={styles.subtitleCard}
      coverImageStyle={styles.coverImage}
      styleCard={props.styleCard}
      key={props.service.id}
      data={{
        additionalContent: [
          <View key={`petData-${props.service.id}`}>
            <DefaultText
              key={`petName-${props.service.id}`}
              style={styles.petName}>
              {petData.name}
            </DefaultText>
            {props.service?.services && (
              <DefaultText
                key={`services-${props.service.id}`}
                style={styles.serviceName}>
                {props.service.services
                  ?.map((service) => service.name)
                  .join(', ')}
              </DefaultText>
            )}
          </View>,
        ],
        additionalButtons:
          props.tab === servicesTabs[0].id
            ? [
                <AnchorText
                  key={`delete-${props.service.id}`}
                  onPress={() => onPressDelete()}
                  style={styles.buttonDelete}
                  isSubmit>
                  Eliminar
                </AnchorText>,
                <AnchorText
                  key={`edit-${props.service.id}`}
                  onPress={onPressEdit}
                  style={styles.buttonEdit}
                  isSubmit>
                  Editar
                </AnchorText>,
              ]
            : [
                <AnchorText
                  key={`rate-${props.service.id}`}
                  onPress={onPressRate}
                  style={styles.buttonEdit}
                  isSubmit>
                  Calificar
                </AnchorText>,
              ],
        content: props.service.vet,
        title: moment(
          props.service.date + ' ' + props.service.start_time,
        ).format('DD/MM/YYYY, h:mm A'),
        coverImage:
          petData.image ??
          require('../../assets/images/pets/add-pet-image.png'),
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
