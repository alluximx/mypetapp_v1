import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetPaymentMethod = (cardId: string, enabled: boolean = false) =>
  useQuery(
    ['user-card', cardId],
    () => api.get(`api/v1/user-list-cards/?id=${cardId}`, true),
    {enabled},
  );

export default useGetPaymentMethod;
