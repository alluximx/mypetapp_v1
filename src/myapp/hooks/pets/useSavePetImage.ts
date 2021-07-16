import {Platform} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/app-services';

const postPetImage = (data) => {
  const newData = [
    {name: 'pet_image', data: JSON.stringify(data.pet_image)},
    getFileData(data.file),
  ];
  return api.post('api/v1/pets_images/', newData, true, true);
};

const getFileData = (imageData) => {
  try {
    const realPath =
      Platform.OS === 'ios'
        ? decodeURIComponent(imageData.uri.replace('file://', ''))
        : imageData.uri;
    let file = RNFetchBlob.wrap(realPath);
    return {
      name: imageData.fileName,
      filename: imageData.fileName,
      type: imageData.type,
      data: file,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const useSavePetImage = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postPetImage(data), {
    onSuccess: (response, variables) => {
      console.log('RESPONSE: ', response);
      console.log('VARIABLES: ', variables);
      // queryClient.invalidateQueries('my-pet-image');
    },
  });
};

export default useSavePetImage;
