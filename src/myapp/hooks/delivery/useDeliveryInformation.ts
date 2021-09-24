import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useDeliveryInformation = () =>
  useQuery('delivery-info', () =>
    api.get('api/v1/delivery-information/', true),
  );

export default useDeliveryInformation;
