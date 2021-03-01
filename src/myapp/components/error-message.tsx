import React from 'react';
import {Icon, Layout, Text, useTheme} from '@ui-kitten/components';

export const ErrorMessage = ({message}: ErrorMessageProps) => {
  const theme = useTheme();

  return (
    <Layout style={[{flexDirection: 'row'}]}>
      <Icon
        name="alert-triangle-outline"
        fill={theme['color-danger-default']}
        width={20}
        height={20}
        style={{marginRight: 4}}
      />
      <Text category="p1" status="danger">
        {message}
      </Text>
    </Layout>
  );
};

export interface ErrorMessageProps {
  message: string;
}
