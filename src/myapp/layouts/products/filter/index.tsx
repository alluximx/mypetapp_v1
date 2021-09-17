import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// Constants.
import {productPrices} from '../../../constants';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks.
import useGetBrands from '../../../hooks/brands/useGetBrands';
import useProductsList from '../../../hooks/products/useProductsList';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import TitleHeader from '../../../components/texts/title-header';
// Types
import {Brand, Product} from '../../../types/models';

export default ({navigation, route}): React.ReactElement => {
  const [prices, setPrices] = useState(route.params.prices);
  const [brand, setBrand] = useState(route.params.brand);
  const {data: brandsData, isLoading: brandsLoading} = useGetBrands();
  const {data: productsData, isLoading: productsLoading} = useProductsList(
    route.params.category,
    route.params.name,
    brand,
  );

  const filteredData =
    productsData?.data?.filter(
      (product: Product) =>
        prices[0] <= product.range_prices.price__min &&
        prices[1] >= product.range_prices.price__max,
    ) ?? [];

  useEffect(() => {
    route.params.setPrices(prices);
  }, [prices]);

  const clearFilters = () => {
    setPrices([productPrices.MIN_PRICE, productPrices.MAX_PRICE]);
    route.params.setPrices([productPrices.MIN_PRICE, productPrices.MAX_PRICE]);
    setBrand('');
    route.params.setBrand('');
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <AnchorText
            style={styles.headerRight}
            onPress={() => navigation.goBack()}>
            Aplicar
          </AnchorText>
        );
      },
    });
  }, [navigation]);

  const data = brandsData
    ? brandsData?.data.map((brandItem: Brand) => {
        return {value: brandItem.id, label: brandItem.name};
      })
    : [];

  const windowWidth = Dimensions.get('window').width;

  return brandsLoading || productsLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>Filtros</TitleHeader>
      <DefaultText style={styles.results}>
        {filteredData.length ?? 0} resultados
      </DefaultText>
      <DropdownPicker
        currentValue={brand}
        data={data}
        placeholder="Marca"
        setCurrentValue={(brandId: string) => {
          route.params.setBrand(brandId);
          setBrand(brandId);
        }}
        style={styles.brandSelector}
      />
      <TitleHeader>Rango de Precio</TitleHeader>
      <View style={styles.pricesBoundsContainer}>
        <DefaultText>${prices[0]}</DefaultText>
        <DefaultText>${prices[1]}</DefaultText>
      </View>
      <MultiSlider
        allowOverlap={false}
        customMarker={() => (
          <View style={styles.selectorContainer}>
            <Image
              style={[styles.selector]}
              source={require('../../../assets/images/sliders/slider.png')}
            />
          </View>
        )}
        sliderLength={windowWidth - globalVars.outsidePadding * 2 - 20}
        snapped
        max={productPrices.MAX_PRICE}
        min={productPrices.MIN_PRICE}
        minMarkerOverlapDistance={70}
        onValuesChange={setPrices}
        markerOffsetX={10}
        trackStyle={styles.sliderTrack}
        selectedStyle={styles.sliderActiveTrack}
        step={50}
        values={prices}
      />
      <AnchorText style={styles.clearFilters} onPress={clearFilters}>
        Limpiar filtros
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  results: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
  brandSelector: {marginBottom: 32},
  pricesBoundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    backgroundColor: globalColors.greenSecondary,
    width: 34,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: globalColors.white,
    borderStyle: 'solid',
  },
  selector: {
    height: 6,
    width: 12,
  },
  sliderTrack: {
    backgroundColor: globalColors.lightGray,
    height: 4,
    marginLeft: 5,
  },
  sliderActiveTrack: {
    backgroundColor: globalColors.greenSecondary,
  },
  clearFilters: {
    textAlign: 'center',
    marginTop: 24,
  },
});
