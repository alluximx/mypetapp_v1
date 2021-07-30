import React, {useEffect} from 'react';
import {Text} from '@ui-kitten/components';
import GenericCard from '../cards/generic-card';
import moment from 'moment';
import useVisitImage from '../../hooks/visits/useVisitImage';
const VisitCardImg = (props): React.ReactElement => {
  const data = useVisitImage(props.data.id);
  //const [newData, setNewData] = React.useState(props.data);
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    if (data.data) {
      setImages(data.data.data);
    }
  }, [data.data]);
  // useEffect(() => {
  //   const auxData = {
  //     date: newData.date == null ? null : new Date(newData.date),
  //     title: newData.title,
  //     content: newData.content,
  //     buttonText: 'Editar',
  //     buttonAlign: 'right',
  //     images: images,
  //     styleCard: {},
  //     data: newData.data,
  //   };
  //   setNewData(auxData);
  // }, [images]);
  const newData = {
    date:
      props.data.visit_date == null ? null : new Date(props.data.visit_date),
    title: props.data.title,
    content: props.data.details,
    buttonText: 'Editar',
    buttonAlign: 'right',
    images: images,
    styleCard: {},
    data: props.data,
  };
  const onEdit = (params) => {
    const formattedDate = moment(params.date).format('YYYY-MM-DD');
    props.navigation.navigate('NewVisitMedical', {
      pet: props.route.params.pet,
      visit: {
        idVisit: params.data.id,
        title: params.title,
        details: params.content,
        date: formattedDate,
        images: params.images,
      },
      isGuardar: false,
    });
  };
  return !data.isLoading && <GenericCard data={newData} onClick={onEdit} />;
};
export default VisitCardImg;
