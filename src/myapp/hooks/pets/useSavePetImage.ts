import {useMutation} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const postPetImage = (data) => {
  const newData = [
    {name: 'pet_image', data: data.pet_image},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(data.file.uri),
    },
  ];
  return api.post('api/v1/pets_images/', newData, true, true);
};

const useSavePetImage = () => useMutation((data: any) => postPetImage(data));

export default useSavePetImage;
