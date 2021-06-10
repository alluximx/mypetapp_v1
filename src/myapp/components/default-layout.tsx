import React from 'react';
import {Layout} from '@ui-kitten/components';
import style from '../styles/style';

const DefaultLayout = (props): React.ReactElement => {
  return (
    <Layout style={[style.defaultLayout, props.style]}>{props.children}</Layout>
  );
};

export default DefaultLayout;
