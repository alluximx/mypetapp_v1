import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// Constants.
import {productPrices} from '../../../constants';
// Global Styles.
import globalColors from '../../../styles/colors';
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
import globalVars from '../../../styles/vars';

export default ({navigation, route}): React.ReactElement => {
  const [prices, setPrices] = useState([200, 600]);
  const [brand, setBrand] = useState(route.params.brand);
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
            onPress={() => navigation.goBack()}>
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

  const windowWidth = Dimensions.get('window').width;

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
          route.params.setBrand(brand);
          setBrand(brand);
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
        sliderLength={windowWidth - globalVars.outsidePadding * 2}
        snapped
        max={productPrices.MAX_PRICE}
        min={productPrices.MIN_PRICE}
        minMarkerOverlapDistance={100}
        onValuesChange={setPrices}
        trackStyle={styles.sliderTrack}
        selectedStyle={styles.sliderActiveTrack}
        step={50}
        values={prices}
      />
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
  },
  sliderActiveTrack: {
    backgroundColor: globalColors.greenSecondary,
  },
});
