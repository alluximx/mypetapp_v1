import React, {useEffect} from 'react';
import moment from 'moment';
// Hooks.
import useVisitImage from '../../hooks/visits/useVisitImage';
// My Components.
import GenericCard from '../cards/generic-card';
import globalColors from '../../styles/colors';

interface VisitCardImgProps {
  data: any;
  navigation: any;
  route: any;
  visit?: any;
}

const VisitCardImg = ({
  data,
  navigation,
  route,
  visit,
}: VisitCardImgProps): React.ReactElement => {
  const {details, id, title, user_pet, visit_date} = data;
  const {data: visitData, isLoading} = useVisitImage(id);
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    if (visitData) {
      setImages(visitData.data);
    }
  }, [visitData]);

  const newData = {
    date: visit_date == null ? null : new Date(visit_date),
    buttonAlign: 'right',
    buttonColor: globalColors.greenSecondary,
    buttonText: 'Editar',
    content: details,
    data: visit,
    images,
    styleCard: {},
    title,
  };

  const onEdit = () => {
    navigation.navigate('NewVisitMedical', {
      isEdit: true,
      pet: route.params.pet,
      visit: {
        date: data.visit_date,
        details,
        idVisit: data.id,
        images,
        title,
        user_pet,
      },
    });
  };

  return !isLoading && <GenericCard data={newData} onClick={onEdit} />;
};

export default VisitCardImg;
