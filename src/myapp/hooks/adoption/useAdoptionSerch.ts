import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import api from '../../services/app-services';
const useAdoptionSerch = (data) => {
  return useQuery(
    [
      'adoption-serch',
      data.stateId,
      data.municipalityId,
      data.query,
      data.status,
    ],
    () =>
      api.get(
        'api/v1/addoption_publications/?state=' +
          data.stateId +
          '&municipality=' +
          data.municipalityId +
          '' +
          data.query,
        true,
      ),
    {enabled: data.status},
  );
};
export default useAdoptionSerch;
