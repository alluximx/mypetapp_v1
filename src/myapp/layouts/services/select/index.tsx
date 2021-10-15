import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// ui-kitten
import {List} from '@ui-kitten/components';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import IndividualOptionSelect from '../../../components/inputs/individual-option-select';
// Hooks
import useSetNavigationHeaders from '../../../hooks/navigation/useSetNavigationHeaders';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const data = [];
  const auxData = [
    {id: '1', title: '$200.00', subtitle: 'Baño'},
    {id: '2', title: '$200.00', subtitle: 'Corte'},
    {id: '3', title: '$200.00', subtitle: 'Uñas'},
    {id: '4', title: '$200.00', subtitle: 'Peinado'},
  ];

  const {screenToReturn, screenFrom} = route.params?.data ?? {};

  const isDisabled = false;

  const setData = (value) => {
    const exist = data.includes(value);
    exist ? removeFromArray(value) : data.push(value);
  };

  const removeFromArray = (value) => {
    const indx = data.indexOf(value);
    if (indx > -1) {
      data.splice(indx, 1);
    }
  };

  const onSubmit = () => {
    const dataSubmit = [];
    data.forEach((selectElement) => {
      auxData.forEach((element) => {
        if (selectElement === element.id) {
          const auxElement = {id: selectElement, name: element.subtitle};
          dataSubmit.push(auxElement);
        }
      });
    });

    navigation.navigate(screenToReturn, {
      data: {serviceData: dataSubmit, screenFrom: screenFrom},
    });
  };

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    onRightPress: onSubmit,
    setIsLoading,
    data: [],
  });

  const renderOption = (service) => {
    return (
      <IndividualOptionSelect
        setCurrentValue={(newValue) => {
          setData(newValue);
        }}
        title={service.item.title}
        subtitle={service.item.subtitle}
        style={{marginBottom: 15}}
        value={service.item.id}
      />
    );
  };
  return (
    <DefaultLayout>
      <TitleHeader>Servicios</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={auxData}
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
