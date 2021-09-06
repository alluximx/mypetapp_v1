import React from 'react';
import {Image, StyleSheet} from 'react-native';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';
import GenericCard from '../../components/cards/generic-card';
// Global Styles
import globalVars from '../../styles/vars';

export default ({navigation, route}): React.ReactElement => {
  //const data = null;
  const data = {
    buttonAlign: 'right',
    buttonText: 'Eliminar',
    date: null,
    content: 'Calle bosque del Valle 123,\n 54123, Gualajara Jalisco',
    images: null,
    styleCard: {},
    title: 'Karen Beltran',
  };

  return data ? (
    <DefaultLayout>
      <TitleHeader>Direcciones</TitleHeader>
      <DefaultText style={{marginBottom: 16}}>
        Puedes guardar hasta 3 direcciones
      </DefaultText>
      <GenericCard
        data={data}
        styleCard={{marginHorizontal: 0}}
        onClick={null}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../../assets/images/pets/petDirecciones.png')}
      />
      <TitleHeader style={styles.center}>Direcciones</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        No tienes Direcciones guardadas.
      </DefaultText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
    padding: 10,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: globalVars.fontBold,
  },
});
