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
import {formatPrice} from '../../../utils';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const {directoryId, serviceIndexes, screenToReturn, screenFrom, sizeId} =
    route.params ?? {};

  const [servicesSelected, setServicesSelected] = useState(
    serviceIndexes ?? [],
  );

  const salonsData = useGetSalonServices(directoryId, sizeId);
  const isDisabled = false;

  useEffect(() => {
    if (salonsData.isSuccess && salonsData.data?.data) {
      setData(salonsData.data.data);
      setIsLoading(false);
    }
  }, [salonsData.isSuccess]);

  const onRightPress = () => {
    const servicesList = servicesSelected.reduce(
      (previousService, currentService) => {
        const serviceData = data.find((item) => item?.id === currentService);
        return (
          previousService +
          `${serviceData?.product?.name} - $${formatPrice(
            serviceData?.price,
          )}\n`
        );
      },
      '',
    );

    navigation.navigate(screenToReturn, {
      serviceData: servicesList,
      serviceIndexes: servicesSelected,
      screenFrom: screenFrom,
    });
  };

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    onRightPress,
    setIsLoading,
    data: servicesSelected,
  });

  const renderOption = ({item}) => (
    <IndividualOptionSelect
      enabled={servicesSelected.includes(item.id)}
      setCurrentValue={(newValue) => {
        if (servicesSelected.includes(newValue)) {
          setServicesSelected(
            servicesSelected.filter((value: string) => value !== newValue),
          );
        } else {
          setServicesSelected([...servicesSelected, newValue]);
        }
      }}
      style={styles.optionStyle}
      subtitle={item.product.name}
      title={'$' + formatPrice(item.price)}
      value={item.id}
    />
  );

  return isLoading || salonsData.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Servicios</TitleHeader>
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
  title: {
    marginBottom: 24,
  },
  optionStyle: {
    marginBottom: 16,
  },
});
