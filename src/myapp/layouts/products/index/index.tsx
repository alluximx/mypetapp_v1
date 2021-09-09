import React, {useLayoutEffect, useEffect, useState} from 'react';
// My components
import DefaultText from '../../../components/texts/default-text';

export default (): React.ReactElement => {
  console.log('hola mundo');
  return <DefaultText children="Hola Mundo" />;
};
