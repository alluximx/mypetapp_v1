import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
// Hooks.
import useGetBrands from '../../../hooks/brands/useGetBrands';
import useProductsList from '../../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../../../components/custom-spinner';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import AnchorText from '../../../components/texts/anchor-text';

export default ({navigation, route}): React.ReactElement => {
  const [prices, setPrices] = useState([200, 600]);
  const [brand, setBrand] = useState<string>(route.params.brand);
  const {data: brandsData, isLoading: brandsLoading} = useGetBrands();
  const {data: productsData, isLoading: productsLoading} = useProductsList(
    route.params.category,
    route.params.name,
    brand,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <AnchorText
            style={styles.headerRight}
            onPress={() => {
              navigation.navigate('ProductList', {brand});
            }}>
            Aplicar
          </AnchorText>
        );
      },
    });
  }, [navigation]);

  const data = brandsData
    ? brandsData?.data.map((brandItem) => {
        return {value: brandItem.id, label: brandItem.name};
      })
    : [];

  return brandsLoading || productsLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>Filtros</TitleHeader>
      <DefaultText style={styles.results}>
        {productsData?.data.length ?? 0} resultados
      </DefaultText>
      <DropdownPicker
        currentValue={brand}
        data={data}
        placeholder="Marca"
        setCurrentValue={(brand: string) => {
          setBrand(brand);
        }}
      />
      <TitleHeader>Rango de Precio</TitleHeader>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  results: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
});
