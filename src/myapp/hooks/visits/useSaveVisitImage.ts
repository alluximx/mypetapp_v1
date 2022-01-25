import {Platform} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import ReactNativeBlobUtil from 'react-native-blob-util';
import api from '../../services/app-services';

const postVisitImage = (data: any) => {
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
      data: ReactNativeBlobUtil.wrap(realPath),
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
