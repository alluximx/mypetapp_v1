import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetSalonServices = (salonId: string, sizeId: string) =>
  useQuery(['salons-services', salonId, sizeId], () =>
    api.get(
      `api/v1/salons-services-variants/?product__admin__directory=${salonId}&size=${sizeId}`,
      true,
    ),
  );

export default useGetSalonServices;
