import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import style from '../../styles/style';

const CustomButton = (props): React.ReactElement => {
  return props.type === 'primary' ? (
    <Button
      appearance="ghost"
      style={[style.button, style.defaultButton, props.style]}
      onPress={props.onPress}>
      {() => <Text style={style.defaultButtonText}>{props.children}</Text>}
    </Button>
  ) : (
    // Not finished yet...
    <Button
      appearance="control"
      style={[style.button, style.defaultButton, props.style]}
      onPress={props.onPress}>
      {() => <Text style={style.defaultButtonText}>{props.children}</Text>}
    </Button>
  );
};

export default CustomButton;
