import React, {useContext} from 'react';
import {useRoute} from '@react-navigation/native';
// My Components
import DefaultLayout from '../../../../components/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
import CustomButton from '../../../../components/buttons/custom-button';
import CloseButton from '../../../../components/buttons/close-button';

// Context
import {AddPetContext} from '../../../../context/AddPetContext';
//Hook
import useGetBreeds from '../../../../hooks/useGetBreeds';
// Types
import {HomeRouteParams} from '../../../../types/navigation/home-navigator';

export default ({navigation}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);

  const route = useRoute<HomeRouteParams>();
  //console.log(route.params);
  const userQuery = useGetBreeds(route.params.isGuest);
  console.log(userQuery);
  
  //const res;
  return (
    <DefaultLayout>
        
        <TitleHeader>¿Que raza es?</TitleHeader>
      
       
    </DefaultLayout>
  );
};