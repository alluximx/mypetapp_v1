import {Platform} from 'react-native';
import {useMutation} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const putVaccineImage = (data) => {
  const realPath =
    Platform.OS === 'ios'
      ? decodeURIComponent(data.file.uri.replace('file://', ''))
      : data.file.uri;
  const newData = [
    {name: 'vaccine', data: data.vaccine},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(realPath),
    },
  ];

  return api.put(
    `api/v1/vaccine-images/${data.vaccine_image_id}/`,
    newData,
    true,
    true,
  );
};

const useUpdateVaccineImage = () =>
  useMutation((data: any) => putVaccineImage(data));

export default useUpdateVaccineImage;
