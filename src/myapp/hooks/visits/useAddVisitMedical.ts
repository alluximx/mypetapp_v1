import {useQuery} from 'react-query';
import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';

const postAddVisits = (data) => api.post('api/v1/vetvisits/', data, true);
const useAddVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const useSaveImg = useSaveVisitImage();

  return useMutation((data: any) => postAddVisits(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      if (variables.recetaValue) {
        console.log('verdadero');

        const newData = {
          idVisita: response.data.id,
          img: variables.recetaValue.base64,
        };
        useSaveImg.mutate(newData, {
          onSuccess: () => {
            // queryClient.invalidateQueries(['visits-information']);
            // navigation.goBack();
          },
        });
      }
      if (variables.adicional1) {
        console.log('verdadero');

        const newData = {
          idVisita: response.data.id,
          img: variables.adicional1.base64,
        };
        useSaveImg.mutate(newData, {
          onSuccess: () => {
            // queryClient.invalidateQueries(['visits-information']);
            // navigation.goBack();
          },
        });
      }
      if (variables.adicional2) {
        console.log('verdadero');

        const newData = {
          idVisita: response.data.id,
          img: variables.adicional2.base64,
        };
        useSaveImg.mutate(newData, {
          onSuccess: () => {
            // queryClient.invalidateQueries(['visits-information']);
            // navigation.goBack();
          },
        });
      }
      if (variables.adicional3) {
        console.log('verdadero');

        const newData = {
          idVisita: response.data.id,
          img: variables.adicional3.base64,
        };
        useSaveImg.mutate(newData, {
          onSuccess: () => {
            // queryClient.invalidateQueries(['visits-information']);
            // navigation.goBack();
          },
        });
      }
      queryClient.invalidateQueries(['visits-information']);
      navigation.goBack();
      // useSaveImg.mutate(
      //   {
      //     id: response.data.id,
      //     file: variables.base64,
      //   },
      //   {
      //     // Only after the pet image has been created...
      //     onSuccess: () => {
      //       navigation.navigate('Home');
      //       queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      //     },
      //   },
      // );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useAddVisitMedical;
