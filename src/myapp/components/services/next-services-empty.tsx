import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
// Constants.
import {servicesTabs} from '../../constants';
// Global Styles.
import globalVars from '../../styles/vars';
// My Components.
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';
// Types.
import {NextServicesListProps} from '../../types/components/services';

const NextServicesEmpty = (
  props: NextServicesListProps,
): React.ReactElement => (
  <View style={styles.emptyContainer}>
    <Image
      style={styles.emptyImage}
      source={
        props.tab === servicesTabs[0].id
          ? require('./assets/active-services.png')
          : require('./assets/historic-services.png')
      }
    />
    <TitleHeader style={styles.emptyTitle}>
      {props.tab === servicesTabs[0].id
        ? 'Próximos Servicios'
        : 'Historial de Servicios'}
    </TitleHeader>
    <DefaultText style={styles.emptySubtitle}>
      {props.tab === servicesTabs[0].id
        ? 'Aún no tienes servicios programados.'
        : 'Aún no has realizado ningún servicio.'}
    </DefaultText>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    padding: globalVars.outsidePadding,
  },
  emptyImage: {
    flexShrink: 1,
    width: '120%',
    maxHeight: 320,
    resizeMode: 'cover',
    marginBottom: 16,
    marginTop: -10,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 5,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});

export default NextServicesEmpty;
