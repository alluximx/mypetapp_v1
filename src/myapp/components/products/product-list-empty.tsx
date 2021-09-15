import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
// Global Styles.
import globalVars from '../../styles/vars';
// My Components.
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';

const ProductListEmpty = (): React.ReactElement => (
  <View style={styles.emptyContainer}>
    <Image
      style={styles.emptyImage}
      source={require('./assets/no-results.png')}
    />
    <TitleHeader style={styles.emptyTitle}>
      No se encontraron resultados
    </TitleHeader>
    <DefaultText style={styles.emptySubtitle}>
      Intenta cambiar las opciones de filtros para obtener mejores resultados.
    </DefaultText>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    padding: globalVars.outsidePadding,
  },
  emptyImage: {
    width: '100%',
    maxHeight: 250,
    resizeMode: 'contain',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});

export default ProductListEmpty;
