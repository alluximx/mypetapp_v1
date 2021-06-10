import React from 'react';
import style from '../../styles/style';
import {Icon} from '@ui-kitten/components';
import globalColors from '../../styles/colors';

const CloseButton = ({navigation}): React.ReactElement => {
  return (
    <Icon
      style={style.closeButton}
      height={40}
      onPress={navigation.goBack}
      width={40}
      fill={globalColors.greenSecondary}
      name="close-outline"
    />
  );
};

export default CloseButton;
