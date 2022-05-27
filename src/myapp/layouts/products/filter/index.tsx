import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {List} from '@ui-kitten/components';
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
import {Brand, Product, Pet} from '../../../types/models';

export default ({navigation, route}): React.ReactElement => {
  const [prices, setPrices] = useState(route.params.prices);
  const [brand, setBrand] = useState(route.params.brand);
  /* const [size, setSize] = useState(route.params.size); */
  const [sizes, setSizes] = useState<Array<string>>(route.params.sizes);
  const {data: sizesData, isLoading: sizesLoading} = useGetSizes();
  const {data: brandsData, isLoading: brandsLoading} = useGetBrands();
  const {data: productsData, isLoading: productsLoading} = useProductsList(
    route.params.category,
    route.params.name,
    brand,
    sizes,
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
    setSizes([]);
    route.params.setSizes([]);
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
        return {id: sizeItem.id, name: sizeItem.name};
      })
    : [];
  const windowWidth = Dimensions.get('window').width;

  const toggleSize = (id) => {
    if (sizes.includes(id)) {
      setSizes(sizes.filter((idItem) => idItem !== id));
      route.params.setSizes(sizes.filter((idItem) => idItem !== id));
    } else {
      setSizes((prevArray) => [...prevArray, id]);
      route.params.setSizes((prevArray) => [...prevArray, id]);
    }
  };

  return brandsLoading || productsLoading || sizesLoading ? (
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
      <View>
        <TitleHeader>Tamaño</TitleHeader>
        <List
          data={dataSizes}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                toggleSize(item.id);
              }}
              style={[
                styles.filterOption,
                sizes.includes(item.id) && styles.filterOptionEnabled,
                index === 0 && styles.filterOptionLeftSpacing,
                index === dataSizes.length - 1 &&
                  styles.filterOptionRightSpacing,
              ]}>
              <TitleHeader
                style={[
                  styles.filterOptionText,
                  sizes.includes(item.id) && styles.filterOptionTextEnabled,
                ]}>
                {item.name}
              </TitleHeader>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.filterOptionsContainer}
        />
      </View>
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
  brandSelector: {marginBottom: 16},
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
  filterOptionsContainer: {
    marginTop: 16,
    backgroundColor: globalColors.backgroundDefault,
    marginBottom: 16,
  },
  filterOption: {
    paddingVertical: 6,
    paddingBottom: 2,
    paddingHorizontal: 16,
    backgroundColor: globalColors.backgroundDefault,
    borderRadius: 10,
    marginRight: 10,
  },
  filterOptionEnabled: {
    backgroundColor: globalColors.greenSecondary,
  },
  filterOptionText: {
    color: globalColors.lightGray,
    fontSize: 16,
  },
  filterOptionTextEnabled: {
    color: globalColors.white,
  },
  filterOptionLeftSpacing: {
    marginLeft: 0,
  },
  filterOptionRightSpacing: {
    marginRight: 0,
  },
  resultSection: {
    flexGrow: 1,
    flexBasis: 300,
  },
});
