import {Platform} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const putImage = (data: any) => {
  const realPath =
    Platform.OS === 'ios'
      ? decodeURIComponent(data.file.uri.replace('file://', ''))
      : data.file.uri;
  const newData = [
    {name: 'visit', data: data.idVisit},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(realPath),
    },
    {name: 'is_prescription', data: data.isPrescription},
  ];
  return api.put('api/v1/visit-images/' + data.id + '/', newData, true, true);
};

const useUpdateImage = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => putImage(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['visits-image', variables.idVisit]);
    },
  });
};
export default useUpdateImage;
