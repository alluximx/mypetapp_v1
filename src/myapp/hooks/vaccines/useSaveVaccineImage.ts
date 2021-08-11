import {useMutation} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const postVaccineImage = (data) => {
  const newData = [
    {name: 'vaccine', data: data.vaccine},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(data.file.uri),
    },
  ];
  return api.post('api/v1/vaccine-images/', newData, true, true);
};

const useSaveVaccineImage = () =>
  useMutation((data: any) => postVaccineImage(data));

export default useSaveVaccineImage;
