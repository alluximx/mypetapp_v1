import React, {useContext} from 'react';
// My Components
import DefaultLayout from '../../../../components/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
// Context
import {AddPetContext} from '../../../../context/AddPetContext';

export default ({navigation}): React.ReactElement => {
  const {form, setForm} = useContext(AddPetContext);

  return (
    <DefaultLayout>
    
        <TitleHeader>¿Que raza es?</TitleHeader>
       
    </DefaultLayout>
  );
};