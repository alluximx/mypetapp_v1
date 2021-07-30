import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import AnchorText from '../../components/texts/anchor-text';

interface SetNavigationHeadersProps {
  navigation: any;
  isDisabled: boolean;
  isLoading: boolean;
  onRightPress: () => void;
  setIsLoading: (value: boolean) => void;
}

const useSetNavigationHeaders = (props: SetNavigationHeadersProps) => {
  const {navigation, isLoading, isDisabled, onRightPress, setIsLoading} = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isDisabled}
            onPress={() => {
              onRightPress();
              setIsLoading(true);
            }}>
            Guardar
          </AnchorText>
        );
      },
    });
  }, [navigation, isDisabled, isLoading]);
};

const styles = StyleSheet.create({
  headerRight: {alignSelf: 'center'},
});

export default useSetNavigationHeaders;
