import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// ui-kitten
import {List} from '@ui-kitten/components';
// Hooks
import useGetSalonServices from '../../../hooks/aesthetics/useGetSalonServices';
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';
// My Components
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import IndividualOptionSelect from '../../../components/inputs/individual-option-select';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const {admin, screenToReturn, screenFrom, sizeId} = route.params ?? {};

  const salonsData = useGetSalonServices(admin, sizeId);
  const isDisabled = false;

  useEffect(() => {
    if (salonsData.isSuccess && salonsData.data?.data) {
      setData(salonsData.data.data);
      setIsLoading(false);
    }
  }, [salonsData.isSuccess]);

  const removeFromArray = (value) => {
    const indx = data.indexOf(value);
    if (indx > -1) {
      data.splice(indx, 1);
    }
  };

  // const onSubmit = () => {
  //   const dataSubmit = [];
  //   data.forEach((selectElement) => {
  //     auxData.forEach((element) => {
  //       if (selectElement === element.id) {
  //         const auxElement = {id: selectElement, name: element.subtitle};
  //         dataSubmit.push(auxElement);
  //       }
  //     });
  //   });

  //   navigation.navigate(screenToReturn, {
  //     data: {serviceData: dataSubmit, screenFrom: screenFrom},
  //   });
  // };

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    onRightPress: () => {},
    setIsLoading,
    data: [],
  });

  const renderOption = (service) => {
    return (
      <IndividualOptionSelect
        setCurrentValue={(newValue) => {
          // setData(newValue);
        }}
        title={service.item.title}
        subtitle={service.item.subtitle}
        style={{marginBottom: 15}}
        value={service.item.id}
      />
    );
  };
  return isLoading || salonsData.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader>Servicios</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={data}
        renderItem={renderOption}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
