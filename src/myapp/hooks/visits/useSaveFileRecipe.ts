import {useMutation} from 'react-query';
import api from '../../services/app-services';

const postPetImage = (url) => {
  return api.download(url);
};

const useSaveFileRecipe = () => useMutation((url) => postPetImage(url));

export default useSaveFileRecipe;
