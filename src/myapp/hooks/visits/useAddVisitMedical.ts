import {useQuery} from 'react-query';
import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';

const postAddVisits = (data) => api.post('api/v1/vetvisits/', data, true);
const useAddVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const useSaveImg = useSaveVisitImage();
  const saveImage = (fieldName, data, flag, id) => {
    const newData = {
      idVisit: id,
      img: data[fieldName]?.base64 ?? {},
      flag: flag,
    };
    if (data[fieldName]) {
      useSaveImg.mutate(newData);
    }
  };
  return useMutation((data: any) => postAddVisits(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      saveImage('prescriptionValue', variables, 'true', response.data.id);
      saveImage('additional1', variables, 'false', response.data.id);
      saveImage('additional2', variables, 'false', response.data.id);
      saveImage('additional3', variables, 'false', response.data.id);
      queryClient.invalidateQueries('visits-information');
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useAddVisitMedical;
