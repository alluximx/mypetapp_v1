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
import useGetSizes from '../../../hooks/sizes/useGetSizes';
import useProductsList from '../../../hooks/products/useProductsList';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import TitleHeader from '../../../components/texts/title-header';
// Types.
import {Brand, Product,Pet} from '../../../types/models';
export default ({navigation, route}): React.ReactElement => {
  const [prices, setPrices] = useState(route.params.prices);
  const [brand, setBrand] = useState(route.params.brand);
  const [size,setSize]= useState(route.params.size);
  const {data: sizesData, isLoading: sizesLoading} = useGetSizes();
  const {data: brandsData, isLoading: brandsLoading} = useGetBrands();
  const {data: productsData, isLoading: productsLoading} = useProductsList(
    route.params.category,
    route.params.name,
    brand,
  );

  const [currentMinAndMax, setCurrentMinAndMax] = useState([
    productPrices.MIN_PRICE,
    productPrices.MAX_PRICE,
  ]);
  const [minAndMaxOfAll, setMinAndMaxOfAll] = useState([
    productPrices.MIN_PRICE,
    productPrices.MAX_PRICE,
  ]);

  const filteredData =
    productsData?.data?.filter(
      (product: Product) =>
        prices[0] <= product.range_prices.price__min &&
        prices[1] >= product.range_prices.price__max,
    ) ?? [];

  const getMinAndMax = () => {
    let minPrice = productPrices.MAX_PRICE;
    let maxPrice = productPrices.MIN_PRICE;

    for (const product of productsData?.data) {
      if (product.range_prices.price__min < minPrice) {
        minPrice = product.range_prices.price__min;
      }
      if (product.range_prices.price__max > maxPrice) {
        maxPrice = product.range_prices.price__max;
      }
    }

    return [minPrice, maxPrice];
  };

  useEffect(() => {
    if (productsData?.data) {
      const newMinAndMax = getMinAndMax();
      if (brand === '') {
        setMinAndMaxOfAll(newMinAndMax);
      }
      setCurrentMinAndMax(newMinAndMax);
    }
  }, [productsData, brand]);

  useEffect(() => {
    route.params.setPrices(prices);
  }, [prices]);

  const clearFilters = () => {
    setBrand('');
    route.params.setBrand('');
    setCurrentMinAndMax(minAndMaxOfAll);
    setPrices(minAndMaxOfAll);
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
    const dataSizes = sizesData
    ? sizesData?.data.map((sizeItem: Pet) => {
        return {value: sizeItem.id, label: sizeItem.name};
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
      <DropdownPicker
        currentValue={size}
        data={dataSizes}
        placeholder="Tamaño"
        setCurrentValue={(sizeId: string) => {
          route.params.setSize(sizeId);
          setSize(sizeId);
        }}
        style={styles.brandSelector}
      />
      <TitleHeader>Rango de Precio</TitleHeader>
      <View style={styles.pricesBoundsContainer}>
        <DefaultText>
          $
          {currentMinAndMax[0].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </DefaultText>
        <DefaultText>
          $
          {currentMinAndMax[1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </DefaultText>
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
        min={currentMinAndMax[0]}
        max={currentMinAndMax[1]}
        minMarkerOverlapDistance={70}
        onValuesChange={setPrices}
        markerOffsetX={10}
        trackStyle={styles.sliderTrack}
        selectedStyle={styles.sliderActiveTrack}
        step={10}
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
