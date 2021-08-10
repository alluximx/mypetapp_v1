import {useMutation, useQueryClient} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const postVisitImage = (data) => {
  const newData = [
    {name: 'visit', data: data.idVisit},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(data.file.uri),
    },
    {name: 'is_prescription', data: data.isPrescription},
  ];
  return api.post('api/v1/visit-images/', newData, true, true);
};

const useSaveVisitImage = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => postVisitImage(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['visits-image', variables.idVisit]);
    },
  });
};

export default useSaveVisitImage;
