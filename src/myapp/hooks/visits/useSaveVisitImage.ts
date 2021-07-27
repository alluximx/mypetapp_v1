import {useMutation} from 'react-query';
import api from '../../services/app-services';

const postVisitImage = (data) => {
  const newData = [
    {name: 'visit', data: data.idVisita},
    {name: 'file', filename: 'visit-img.png', data: data.img},
  ];
  return api.post('api/v1/visit-images/', newData, true, true);
};
const useSaveVisitImage = () =>
  useMutation((data: any) => postVisitImage(data));

export default useSaveVisitImage;
