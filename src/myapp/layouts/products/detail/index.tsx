import React, {useEffect, useState, useRef} from 'react';
import {
  Layout,
  Spinner,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {Dimensions, Image, View, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
// Global Styles
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
// Hooks
import useSaveProductCart from '../../../hooks/products/useSaveProductCart';
import useVariants from '../../../hooks/products/useVariants';
// My Components
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import SimplePaginationDot from '../../../components/adoption/SimplePaginationDot';
import TitleHeader from '../../../components/texts/title-header';
// Models
import {BaseModel, Variant} from '../../../types/models';

const INITIAL_INDEX = 0;

export default ({route}): React.ReactElement => {
  const dataVariants = useVariants(route.params.id);
  const saveProductCart = useSaveProductCart();
  const styles = useStyleSheet(themedStyles);
  const [presentationValue, setPresentationValue] = useState('1');
  const [amountValue, setAmountValue] = useState('1');
  const [variantsList, setVariantsList] = useState([]);
  const [amountList, setAmountList] = useState([]);
  const [variant, setVariant] = useState<Variant>();
  const [isLoadingVariant, setIsLoadingVariant] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const dataImg = [];
  const [dataImages, setDataimages] = useState([]);

  const findVariant = (value) => {
    const variantFilter = dataVariants.data.data.filter(
      (item: BaseModel) => item.id === value,
    );
    setVariant(variantFilter[0]);
    setIsLoadingVariant(false);
  };

  useEffect(() => {
    if (dataVariants.data?.data.length > 0) {
      const aux = [];
      dataVariants.data.data.forEach((element: BaseModel) => {
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
      setDataimages(dataImg);
    }
  }, [variant]);

  const actionButton = () => {
    const data = {item: presentationValue, quantity: parseInt(amountValue, 10)};
    saveProductCart.mutate(data);
  };

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  return (
    <DefaultLayout
      statusBarTranslucent
      statusBarStyle="dark-content"
      statusBarBackgroundColor="transparent"
      style={styles.container}>
      {dataVariants.isLoading || !variant ? (
        <View style={styles.containerSpinner}>
          <View style={styles.viewContainer}>
            <Spinner size="large" status="success" />
          </View>
        </View>
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
                          data={dataImages}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                          ref={carouselRef}
                          onScroll={(e) => {
                            const offset = e.nativeEvent.contentOffset.x;
                            const index = offset / width;
                            setCurrentIndex(index);
                          }}
                          renderItem={({item}) => {
                            const {uri} = item;
                            return (
                              <View
                                style={{
                                  width: width,
                                  height: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={{uri: uri}}
                                  style={{
                                    width: '100%',
                                    height: height * 0.3,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            );
                          }}
                          keyExtractor={(_, item) => item.toString()}
                        />
                        <SimplePaginationDot
                          currentIndex={currentIndex}
                          length={dataImages.length}
                          color={'#000'}
                          style={{
                            position: 'absolute',
                            bottom: 10,
                          }}
                        />
                      </View>
                    ) : (
                      <Image
                        style={styles.imageProduct}
                        source={{
                          uri: route.params.cover_image,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Image
                    style={styles.imageProduct}
                    source={{
                      uri: route.params.cover_image,
                    }}
                  />
                )}
              </>
            )}
          </View>

          <View style={styles.containerDetail}>
            <ScrollView>
              <Layout style={styles.layoutPort}>
                <TitleHeader>{route.params.name}</TitleHeader>
                <DefaultText>{route.params.brand.name}</DefaultText>
                <TitleHeader
                  style={[
                    globalStyles.highlightedText,
                    {marginTop: 15, marginBottom: 15},
                  ]}>
                  {variant ? '$' + variant.price : '$0.00'}
                </TitleHeader>
                <DefaultText>{route.params.description}</DefaultText>
                <DropdownPicker
                  currentValue={presentationValue}
                  data={variantsList}
                  disabledPlaceholder={true}
                  placeholder="Presentación"
                  setCurrentValue={(value) => {
                    setIsLoadingVariant(true);
                    setPresentationValue(value);
                    findVariant(value);
                  }}
                  style={{marginTop: 24}}
                />
                <DropdownPicker
                  currentValue={amountValue}
                  data={amountList}
                  disabledPlaceholder={true}
                  placeholder="Cantidad"
                  setCurrentValue={(value) => {
                    setAmountValue(value);
                  }}
                  style={{marginTop: 5, marginBottom: 20}}
                  disabled={!(amountList.length > 0)}
                />
                <CustomButton
                  isLoading={saveProductCart.isLoading}
                  isDisabled={isDisabledButton || amountValue === ''}
                  onPress={actionButton}
                  isSubmit>
                  Agregar al Carrito
                </CustomButton>
              </Layout>
            </ScrollView>
          </View>
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
    paddingBottom: 0,
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
});
