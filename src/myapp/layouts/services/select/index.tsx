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
import DefaultText from '../../../components/texts/default-text';
import IndividualOptionSelect from '../../../components/inputs/individual-option-select';
import TitleHeader from '../../../components/texts/title-header';
// Utils
import {formatPrice, formatServices} from '../../../utils';

export default ({navigation, route}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState([]);
  const {admin, services, screenToReturn, screenFrom, sizeId} =
    route.params ?? {};

  const [servicesSelected, setServicesSelected] = useState([]);

  const salonServicesData = useGetSalonServices(admin, sizeId);

  useEffect(() => {
    setIsDisabled(servicesSelected.length === 0 || data.length === 0);
  }, [data, salonServicesData]);

  useEffect(() => {
    if (salonServicesData.isSuccess && salonServicesData.data?.data) {
      setData(salonServicesData.data.data);
      setIsLoading(false);

      if (services) {
        const storedServices = salonServicesData.data.data.map(
          (salonService) => {
            const servicesList = formatServices(services)
              .split(', ')
              .map((service) => service.trim());

            if (servicesList.includes(salonService.product?.name)) {
              return salonService.id;
            }
          },
        );
        setServicesSelected(storedServices);
      }
    }
  }, [salonServicesData.isSuccess]);

  const onRightPress = () => {
    const servicesList = servicesSelected.reduce(
      (previousService, currentService, index: number) => {
        const serviceData = data.find((item) => item?.id === currentService);
        return (
          previousService +
          `${serviceData?.product?.name} - $${formatPrice(
            serviceData?.price,
          )}` +
          (index === servicesSelected.length - 1 ? '' : ', ')
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

  /**********************
   *** Render Methods ***
   **********************/

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

  const renderEmpty = () => (
    <DefaultText>
      Lo sentimos. No hay servicios disponibles para tu mascota en este momento.
    </DefaultText>
  );

  return isLoading || salonServicesData.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <TitleHeader style={styles.title}>Servicios</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={data}
        ListEmptyComponent={renderEmpty}
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
