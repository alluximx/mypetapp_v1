import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
// Hooks
import useTermsAndConditions from '../../hooks/terms/useTermsAndConditions';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import DefaultText from '../../components/texts/default-text';
import TitleHeader from '../../components/texts/title-header';
import CustomSpinner from '../../components/custom-spinner';

export default (): React.ReactElement => {
  const {data, isLoading} = useTermsAndConditions();

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <ScrollView>
        <TitleHeader style={styles.textSpace}>
          Términos y Condiciones
        </TitleHeader>
        <DefaultText style={styles.textSpace}>
          {data?.data[0]?.terms}
        </DefaultText>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  textSpace: {
    marginBottom: 24,
  },
});
