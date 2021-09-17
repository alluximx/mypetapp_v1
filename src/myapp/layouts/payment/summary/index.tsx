import React, {useState} from 'react';
import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/default-layout';
import {View, ScrollView} from 'react-native';
import globalColors from '../../../styles/colors';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import CustomButton from '../../../components/buttons/custom-button';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <ScrollView>
        <Layout style={styles.layoutPort}>
          <TitleHeader>Pago</TitleHeader>
          <TitleHeader style={styles.titleText}>Dirección de envío</TitleHeader>
          <NavigateButton
            navigation={navigation}
            subtitle={'Selecciona dirección de envio'}
            destination={'Home'}
          />
          <TitleHeader style={styles.titleText}>Método de pago</TitleHeader>
          <NavigateButton
            navigation={navigation}
            subtitle={'Selecciona el método de pago'}
            destination={'Home'}
          />
          <TitleHeader style={styles.titleText}>Método de envío</TitleHeader>
          <DefaultText>El costo base del envio es de $90.</DefaultText>
          <View style={styles.summaryContainer}>
            <View style={styles.infoSummary1}>
              <DefaultText style={styles.defaultText}>Subtotal</DefaultText>
              <DefaultText style={styles.defaultText}>Envío</DefaultText>
              <TitleHeader style={styles.defaultText}>Total</TitleHeader>
            </View>
            <View style={styles.infoSummary2}>
              <DefaultText style={styles.defaultText}>$400.00</DefaultText>
              <DefaultText style={styles.defaultText}>$90.00</DefaultText>
              <TitleHeader style={styles.defaultText}>$452.00</TitleHeader>
            </View>
          </View>
          <CustomButton
            isDisabled={true}
            onPress={() => {
              // Hacer pedido
            }}>
            Hacer Pedido
          </CustomButton>
        </Layout>
      </ScrollView>
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    paddingBottom: 16,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 12,
  },
  titleText: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  defaultText: {
    marginTop: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  infoSummary1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoSummary2: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
