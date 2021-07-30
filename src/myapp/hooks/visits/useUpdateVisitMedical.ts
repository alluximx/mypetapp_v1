import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';
import useUpdateImage from './useUpdateImage';
import useDeleteImages from './useDeleteImg';
import useDeleteVisit from './useDeleteVisit';
const postUpdateVisits = (data) => {
  const newData = {
    user_pet: data.user_pet,
    visit_date: data.visit_date,
    title: data.title,
    details: data.details,
  };
  return api.put('api/v1/vetvisits/' + data.id + '/', data, true);
};

const useUpdateVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const useSaveImg = useSaveVisitImage();
  const useUpdateImg = useUpdateImage();
  const useDeleteImg = useDeleteImages();
  const conditionUpdateImg = (fieldName, fieldEli, data, flag) => {
    const newData = {
      idVisita: data.id,
      img: data[fieldName]?.base64 ?? {},
      flag: flag,
      id: data[fieldEli][0]?.id ?? [],
    };
    if (
      Object.entries(data[fieldName]).length > 0 &&
      data[fieldEli].length > 0
    ) {
      useUpdateImg.mutate(newData);
    } else if (Object.entries(data[fieldName]).length > 0) {
      useSaveImg.mutate(newData);
    } else if (data[fieldEli].length > 0) {
      useDeleteImg.mutate(newData);
    }
    return null;
  };
  return useMutation((data: any) => postUpdateVisits(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      conditionUpdateImg('recetaValue', 'recetaEli', variables, 'true');
      conditionUpdateImg('adicional1', 'eliAdicional1', variables, 'false');
      conditionUpdateImg('adicional2', 'eliAdicional2', variables, 'false');
      conditionUpdateImg('adicional3', 'eliAdicional3', variables, 'false');
      queryClient.invalidateQueries('visits-information');
      queryClient.invalidateQueries(['visits-image', variables.id]);
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateVisitMedical;
