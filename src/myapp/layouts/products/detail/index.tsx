import React, {useEffect, useState} from 'react';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
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
  const [presentationValue, setPresentationValue] = useState('2');
  const [amountValue, setAmountValue] = useState('2');

  const presentation = [
    {label: '200 grs', value: '1'},
    {label: '250 grs', value: '2'},
    {label: '300 grs', value: '3'},
  ];

  const amount = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ];

  return (
    <DefaultLayout
      statusBarTranslucent
      statusBarStyle={'light-content'}
      statusBarBackgroundColor={'transparent'}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageProduct}
          source={{
            uri: routeProduct.cover_image,
          }}
        />
      </View>
      <ScrollView>
        <DefaultLayout style={styles.containerDetail}>
          <Layout style={styles.layoutPort}>
            <TitleHeader>{routeProduct.name}</TitleHeader>
            <DefaultText>{routeProduct.brand.name}</DefaultText>
            <TitleHeader
              style={[
                globalStyles.highlightedText,
                {marginTop: 15, marginBottom: 15},
              ]}>
              $200
            </TitleHeader>
            <DefaultText>{routeProduct.description}</DefaultText>
            <DropdownPicker
              style={{marginTop: 24}}
              data={presentation}
              currentValue={presentationValue}
              placeholder="Presentación"
              setCurrentValue={(value) => {
                setPresentationValue(value);
              }}
            />
            <DropdownPicker
              style={{marginTop: 5, marginBottom: 20}}
              data={amount}
              currentValue={amountValue}
              placeholder="Cantidad"
              setCurrentValue={(value) => {
                setAmountValue(value);
              }}
            />
            <CustomButton
              isLoading={isLoding}
              onPress={() => {
                setIsLoding(true);
              }}>
              Agregar al Carrito
            </CustomButton>
          </Layout>
        </DefaultLayout>
      </ScrollView>
    </DefaultLayout>
  );
};
const {width} = Dimensions.get('window');
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
});
