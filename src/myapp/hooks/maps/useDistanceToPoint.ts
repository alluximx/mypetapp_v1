import {useEffect, useState} from 'react';
import api from '../../services/app-services';

const useDistanceToPoint = (data: any) => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    (async () => {
      const formattedData = {
        latitude: data.latitude,
        longitude: data.longitude,
        [data.isVet ? 'veterinary' : 'salon']: data.id,
      };
      const response = await api.post(
        `api/v1/${
          data.isVet ? 'vets-directory' : 'salons-directory'
        }/get_distance/`,
        formattedData,
        true,
      );

      setDistance(response.data?.distance);
    })();
  }, [data.latitude, data.longitude]);

  return distance;
};

export default useDistanceToPoint;
