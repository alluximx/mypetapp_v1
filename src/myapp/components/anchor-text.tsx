import React from 'react';
import {Text} from '@ui-kitten/components';
import style from '../styles/style';

const AnchorText = (props): React.ReactElement => {
  return (
    <Text style={[style.anchorText, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export default AnchorText;
