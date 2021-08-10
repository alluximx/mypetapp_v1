import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';
import useUpdateImage from './useUpdateImage';
import useDeleteImages from './useDeleteImg';
const postUpdateVisits = (data) => {
  const newData = {
    user_pet: data.user_pet,
    visit_date: data.visit_date,
    title: data.title,
    details: data.details,
  };
  return api.put('api/v1/vetvisits/' + data.id + '/', data, true);
};

const useUpdateMedicalVisit = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const saveImgQuery = useSaveVisitImage();
  const updateImgQuery = useUpdateImage();
  const deleteImgQuery = useDeleteImages();

  const updateVisitImg = (
    fieldName: string,
    fieldChange: {id: string; type: string | null},
    data: {id: string},
    isPrescription: 'true' | 'false',
  ) => {
    const newData = {
      idVisit: data.id,
      file: data[fieldName],
      isPrescription: isPrescription,
      id: fieldChange.type === 'created' ? null : fieldChange.id,
    };

    // If image changed...
    if (fieldChange.type) {
      if (fieldChange.type === 'created') {
        saveImgQuery.mutate(newData);
      } else if (fieldChange.type === 'updated') {
        console.log('updated');
        console.log(newData);
        updateImgQuery.mutate(newData);
      } else {
        deleteImgQuery.mutate(newData);
      }
    }
  };

  return useMutation((data: any) => postUpdateVisits(data), {
    onSuccess: (response, variables) => {
      // if any visit image changed...
      const imagesChanged = Object.values(variables.imagesChanges).some(
        (image: {type: string | null}) => {
          return image.type !== null;
        },
      );

      if (imagesChanged) {
        const {
          prescriptionChange,
          additional1Change,
          additional2Change,
          additional3Change,
        } = variables.imagesChanges;

        updateVisitImg('prescription', prescriptionChange, variables, 'true');
        updateVisitImg('additional1', additional1Change, variables, 'false');
        updateVisitImg('additional2', additional2Change, variables, 'false');
        updateVisitImg('additional3', additional3Change, variables, 'false');
        queryClient.invalidateQueries(['visits-image', variables.id]);
      }
      queryClient.invalidateQueries('visits-information');
      navigation.goBack();
    },
  });
};

export default useUpdateMedicalVisit;
