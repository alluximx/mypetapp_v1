import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Spinner,
} from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/default-layout';
import {Dimensions, Image, View, ScrollView} from 'react-native';
import globalColors from '../../../styles/colors';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import CustomButton from '../../../components/buttons/custom-button';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import globalStyles from '../../../styles/style';
import useVariants from '../../../hooks/products/useVariants';
import LinearGradient from 'react-native-linear-gradient';
import SimplePaginationDot from '../../../components/adoption/SimplePaginationDot';
import {FlatList} from 'react-native-gesture-handler';

const INITIAL_INDEX = 0;
export default ({navigation, route}): React.ReactElement => {
  const routeProduct = {
    id: 'dcd718c7-1f73-4aa9-baba-c95b5bd40f14',
    name: 'Croquetas de Salmón',
    description:
      'Wholehearted Libre de Granos Alimento Natural para todas las Etapas de Vida Receta Salmón y Chícharo, nutre a tu mascota con un delicioso sabor.',
    brand: {
      id: '224739da-ae2a-4270-a6f6-ab8a507494c8',
      name: 'Whole hearted',
      is_active: true,
    },
    category: {
      id: 'e8a055f4-85bb-4032-8b45-139a74ccdec2',
      name: 'Comida',
      is_active: true,
    },
    is_active: true,
    cover_image:
      'https://mpa-stage.s3.amazonaws.com/media/products_covers/image1.jpg',
  };

  const dataVariants = useVariants(routeProduct.id);
  const styles = useStyleSheet(themedStyles);
  const [isLoding, setIsLoding] = useState(false);
  const [presentationValue, setPresentationValue] = useState('1');
  const [amountValue, setAmountValue] = useState('1');
  const [variantsList, setVariantsList] = useState([]);
  const [amountList, setAmountList] = useState([]);
  const [variant, setVariant] = useState();
  const [isLoadingVariant, setIsLoadingVariant] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const dataImg = [];

  const findVariant = (value) => {
    const variantFilter = dataVariants.data.data.filter(
      (item) => item.id === value,
    );
    setVariant(variantFilter[0]);
    setIsLoadingVariant(false);
  };
  useEffect(() => {
    if (dataVariants.data?.data.length > 0) {
      const aux = [];
      dataVariants.data.data.forEach((element) => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setVariantsList(aux);
      setPresentationValue(dataVariants.data?.data[0].id);
      setVariant(dataVariants.data?.data[0]);
    }
  }, [dataVariants.data]);

  useEffect(() => {
    if (variant) {
      const aux = [];
      if (variant.stock > 0) {
        for (let i = 1; i <= variant.stock; i++) {
          aux.push({
            value: `${i}`,
            label: `${i}`,
          });
        }
        setIsDisabledButton(false);
      }
      setAmountList(aux);
      setAmountValue('1');
      variant.images.forEach((element) => {
        dataImg.push({
          uri: 'https://mpa-stage.s3.amazonaws.com/media/' + element.image,
        });
      });
    }
  }, [variant]);

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  return (
    <DefaultLayout
      statusBarTranslucent
      statusBarStyle={'light-content'}
      statusBarBackgroundColor={'transparent'}
      style={styles.container}>
      {dataVariants.isLoading || !variant ? (
        <DefaultLayout style={styles.containerSpinner}>
          <View style={styles.viewContainer}>
            <Spinner size="large" status="success" />
          </View>
        </DefaultLayout>
      ) : (
        <>
          <View style={styles.imageContainer}>
            {isLoadingVariant ? (
              <View style={styles.viewContainer}>
                <Spinner size="large" status="success" />
              </View>
            ) : (
              <>
                {variant ? (
                  <>
                    {variant.images.length > 0 ? (
                      <View style={styles.containerCarousel}>
                        <FlatList
                          data={dataImg}
                          horizontal
                          pagingEnabled
                          ref={carouselRef}
                          onScroll={(e) => {
                            const offset = e.nativeEvent.contentOffset.x;
                            const index = offset / 300; // your cell height
                            setCurrentIndex(index);
                          }}
                          renderItem={({item}) => {
                            const {uri} = item;
                            return (
                              <Image
                                source={{uri: uri}}
                                style={{
                                  width: width,
                                  height: height * 0.45,
                                  resizeMode: 'cover',
                                }}
                              />
                            );
                          }}
                          keyExtractor={(_, item) => item.toString()}
                        />
                        <LinearGradient
                          colors={['rgba(0,0,0,0.50)', 'transparent']}
                          style={styles.linearGradientTop}
                        />
                        <LinearGradient
                          colors={['transparent', globalColors.black]}
                          style={styles.linearGradient}>
                          <SimplePaginationDot
                            currentIndex={currentIndex}
                            length={dataImg.length}
                            style={{position: 'absolute', bottom: 80}}
                          />
                        </LinearGradient>
                      </View>
                    ) : (
                      <Image
                        style={styles.imageProduct}
                        source={{
                          uri: routeProduct.cover_image,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Image
                    style={styles.imageProduct}
                    source={{
                      uri: routeProduct.cover_image,
                    }}
                  />
                )}
              </>
            )}
          </View>

          <DefaultLayout style={styles.containerDetail}>
            <ScrollView>
              <Layout style={styles.layoutPort}>
                <TitleHeader>{routeProduct.name}</TitleHeader>
                <DefaultText>{routeProduct.brand.name}</DefaultText>
                <TitleHeader
                  style={[
                    globalStyles.highlightedText,
                    {marginTop: 15, marginBottom: 15},
                  ]}>
                  {variant ? '$' + variant.price : '$0.00'}
                </TitleHeader>
                <DefaultText>{routeProduct.description}</DefaultText>
                <DropdownPicker
                  style={{marginTop: 24}}
                  data={variantsList}
                  currentValue={presentationValue}
                  placeholder="Presentación"
                  disabledPlaceholder={true}
                  setCurrentValue={(value) => {
                    setIsLoadingVariant(true);
                    setPresentationValue(value);
                    findVariant(value);
                  }}
                />
                <DropdownPicker
                  style={{marginTop: 5, marginBottom: 20}}
                  data={amountList}
                  currentValue={amountValue}
                  placeholder="Cantidad"
                  disabledPlaceholder={true}
                  setCurrentValue={(value) => {
                    setAmountValue(value);
                  }}
                />
                <CustomButton
                  isLoading={isLoding}
                  isDisabled={isDisabledButton || amountValue === ''}
                  onPress={() => {
                    navigation.navigate('AdoptionFilter');
                  }}>
                  Agregar al Carrito
                </CustomButton>
              </Layout>
            </ScrollView>
          </DefaultLayout>
        </>
      )}
    </DefaultLayout>
  );
};

const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 0,
    paddingBottom: 16,
  },
  containerDetail: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '60%',
  },
  containerSpinner: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 0,
  },
  imageProduct: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageContainer: {
    height: '40%',
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 12,
  },
  viewContainer: {
    height: '40%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCarousel: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: '100%',
    marginBottom: '-15%',
  },
  linearGradientTop: {
    height: 100,
    width: width,
    position: 'absolute',
    top: 0,
  },
  linearGradient: {
    height: 150,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
});
