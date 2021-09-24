import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
import globalVars from '../../../styles/vars';
// Hooks
import useSaveProductCart from '../../../hooks/products/useSaveProductCart';
import useVariants from '../../../hooks/products/useVariants';
// Models
import {Variant, VariantOption} from '../../../types/models';
// My Components
import CustomButton from '../../../components/buttons/custom-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import ImageCarousel from '../../../components/images/image-carousel';
import TitleHeader from '../../../components/texts/title-header';

const {height} = Dimensions.get('window');

export default ({route}): React.ReactElement => {
  const {data, isLoading} = useVariants(route.params.id);
  const saveProductCart = useSaveProductCart();

  const [variantsList, setVariantsList] = useState([]);
  const [amountList, setAmountList] = useState([]);
  const [presentationValue, setPresentationValue] = useState('');
  const [amountValue, setAmountValue] = useState(null);
  const [variant, setVariant] = useState(null);

  const findVariant = (variantId: string) => {
    const foundVariant = variantsList.find(
      (item: VariantOption) => item.value === variantId,
    );
    return foundVariant;
  };

  const calculateAmountList = (stock: number) => {
    const newAmountList = [];

    for (let i = 1; i < stock + 1; i++) {
      newAmountList.push({
        label: `${i}`,
        value: `${i}`,
      });
    }

    return newAmountList;
  };

  useEffect(() => {
    const results = data?.data;
    if (results?.length > 0) {
      setVariantsList(
        results.map((variantItem: VariantItem) => ({
          images: variantItem.images.map((image) => ({
            uri: 'https://mpa-stage.s3.amazonaws.com/media/' + image.image,
          })),
          label: variantItem.name,
          price: variantItem.price,
          stock: variantItem.stock,
          value: variantItem.id,
        })),
      );
      setPresentationValue(results[0].id);
      setVariant(results[0]);
      const calculatedAmountList = calculateAmountList(results[0].stock);
      setAmountList(calculatedAmountList);
      setAmountValue(calculatedAmountList[0].value);
    }
  }, [data?.data]);

  useEffect(() => {
    if (presentationValue) {
      const foundVariant = findVariant(presentationValue);
      setVariant(foundVariant);
      const recalculatedAmountList = calculateAmountList(foundVariant.stock);
      setAmountList(recalculatedAmountList);
      setAmountValue(recalculatedAmountList[0]?.value);
    }
  }, [presentationValue]);

  const actionButton = () => {
    const formattedData = {
      item: presentationValue,
      quantity: parseInt(amountValue, 10),
    };
    saveProductCart.mutate(formattedData);
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout
      statusBarTranslucent
      statusBarStyle="light-content"
      statusBarBackgroundColor="transparent"
      style={styles.container}>
      <View style={styles.imageContainer}>
        {variant ? (
          variant?.images?.length > 0 && (
            <ImageCarousel
              gradientBottomStyles={styles.gradientBottom}
              gradientTopStyles={styles.gradientTop}
              images={variant.images}
              imagesStyle={styles.images}
              style={styles.containerCarousel}
            />
          )
        ) : (
          <Image
            style={styles.imageProduct}
            source={{
              uri: route.params.cover_image,
            }}
          />
        )}
      </View>

      <View style={styles.containerDetail}>
        <TitleHeader style={styles.title}>{route.params.name}</TitleHeader>
        <DefaultText style={styles.subtitle}>
          {route.params.brand.name}
        </DefaultText>
        <ScrollView style={styles.layoutPort}>
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
            placeholder="Presentación"
            setCurrentValue={setPresentationValue}
            style={styles.variantDrop}
          />
          <DropdownPicker
            currentValue={amountValue}
            data={amountList}
            disabled={!(amountList.length > 0)}
            placeholder="Cantidad"
            setCurrentValue={setAmountValue}
            style={styles.quantityDrop}
          />
          <CustomButton
            isLoading={saveProductCart.isLoading}
            isDisabled={amountValue === '' || presentationValue === ''}
            onPress={actionButton}
            style={styles.button}>
            Agregar al Carrito
          </CustomButton>
        </ScrollView>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.white,
    paddingHorizontal: 0,
    marginTop: -10,
  },
  containerDetail: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '60%',
  },
  title: {
    marginHorizontal: globalVars.outsidePadding,
    paddingTop: 18,
  },
  subtitle: {
    marginHorizontal: globalVars.outsidePadding,
    paddingBottom: 8,
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
  images: {
    marginBottom: '15%',
    alignSelf: 'center',
    height: height * 0.25,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: '40%',
    marginBottom: -30,
  },
  gradientBottom: {
    height: 110,
  },
  gradientTop: {
    height: 40,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 12,
    backgroundColor: globalColors.backgroundDefault,
    paddingRight: 12,
  },
  variantDrop: {marginTop: 24},
  quantityDrop: {marginTop: 5, marginBottom: 20},
  containerCarousel: {
    height: '112%',
  },
  button: {
    marginBottom: globalVars.outsidePadding,
  },
});
