import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';
import moment from 'moment';

const postMedicalVisit = (data: any) => {
  const formattedData = {
    ...data,
    visit_date: moment.utc(data.visit_date).format('YYYY-MM-DD'),
  };
  return api.post('api/v1/vetvisits/', formattedData, true);
};

const useAddMedicalVisit = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const useSaveImg = useSaveVisitImage();

  const saveImage = (
    fieldName: string,
    data: {},
    isPrescription: 'true' | 'false',
    id: string,
  ) => {
    const newData = {
      idVisit: id,
      file: data[fieldName],
      isPrescription: isPrescription,
    };

    if (data[fieldName]) {
      useSaveImg.mutate(newData);
    }
  };

  return useMutation((data: any) => postMedicalVisit(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      saveImage('prescription', variables, 'true', response.data.id);
      saveImage('additional1', variables, 'false', response.data.id);
      saveImage('additional2', variables, 'false', response.data.id);
      saveImage('additional3', variables, 'false', response.data.id);
      queryClient.invalidateQueries(['visits-information', variables.user_pet]);
      queryClient.invalidateQueries([
        'vets-clients-visits',
        variables.user_pet,
      ]);
      navigation.goBack();
    },
  });
};

export default useAddMedicalVisit;
