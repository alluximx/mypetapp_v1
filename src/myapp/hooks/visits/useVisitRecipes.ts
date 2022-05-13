import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVisitRecipe = (visitId: string) => {
  return useQuery(['visits-recipe', visitId], () =>
    api.get('api/v1/vets-admin-visit-documents/?vet_visit=' + visitId, true),
  );
};
export default useVisitRecipe;
