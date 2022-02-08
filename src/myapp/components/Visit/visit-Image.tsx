import React, {useEffect} from 'react';
import moment from 'moment';
// Hooks.
import useVisitImage from '../../hooks/visits/useVisitImage';
// My Components.
import GenericCard from '../cards/generic-card';
import globalColors from '../../styles/colors';
import AnchorText from '../texts/anchor-text';

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

  const newData = {
    date: visit_date == null ? null : moment(visit_date).toDate(),
    additionalButtons: [
      <AnchorText key={`edit-${visit?.id}`} onPress={onEdit} isSubmit>
        Editar
      </AnchorText>,
    ],
    content: details,
    data: visit,
    images,
    styleCard: {},
    title,
  };

  return (
    !isLoading && (
      <GenericCard key={newData.data?.id} data={newData} onClick={null} />
    )
  );
};

export default VisitCardImg;
