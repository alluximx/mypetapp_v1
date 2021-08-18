import {
  Layout,
  StyleService,
  useStyleSheet,
  List,
  Card,
} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import DefaultLayout from '../../../components/layouts/default-layout';
import globalColors from '../../../styles/colors';
import AnchorText from '../../../components/texts/anchor-text';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
export default ({navigation, route}): React.ReactElement => {
  const state = route.params.filter.state;
  const stateName = route.params.filter.stateName;
  const town = route.params.filter.town;
  const townName = route.params.filter.townName;
  const styles = useStyleSheet(themedStyles);
  let cont = 1;
  let auxData = [];
  let aux = [];
  let num = 0;
  route.params.data.forEach((element) => {
    if (element.status == 'PUBLICADO') {
      aux.push(element);
      num = num + 1;
    }
  });
  aux.length > 0 && auxData.push(aux);
  const listAdoption = aux;
  const numResult = num;
  navigation.setOptions({
    headerRight: () => (
      <AnchorText
        style={styles.headerRight}
        onPress={() => {
          navigation.navigate('AdoptionAdvanceFilter', {
            adoption: {
              num: numResult,
              state: state,
              stateName: stateName,
              town: town,
              townName: townName,
            },
            filters: {
              male: route.params.filters.male,
              feminine: route.params.filters.feminine,
              onetosix: route.params.filters.onetosix,
              sixtotwelve: route.params.filters.sixtotwelve,
              onetothree: route.params.filters.onetothree,
              threetofive: route.params.filters.threetofive,
              fiveormore: route.params.filters.fiveormore,
            },
          });
        }}>
        Filtrar
      </AnchorText>
    ),
  });
  const renderServiceItem = (services) => {
    let img = './../assets/abue.jpg';
    services.item.images.forEach((images) => {
      if (images.is_cover) {
        img = images.image;
      }
    });

    const auximg = 'https://mpa-stage.s3.amazonaws.com/media/' + img;
    return (
      <Card
        style={styles.cardStyle}
        onPress={() => {
          details(services.item);
        }}>
        <Image style={styles.cardImg} source={{uri: auximg}} />
        <View>
          <TitleHeader style={{marginTop: 8}}>{services.item.name}</TitleHeader>
          <DefaultText style={{alignItems: 'center'}}>
            {parseInt(services.item.ageNumber)}
            {parseInt(services.item.ageNumber) > 1
              ? services.item.ageType == 'Y'
                ? '  Años'
                : ' Meses'
              : services.item.ageType == 'Y'
              ? ' Año'
              : ' Mes'}{' '}
          </DefaultText>
          <Text
            style={{color: globalColors.greenPrimary, fontSize: 14}}
            onPress={() => {
              details(services.item);
            }}>
            Mi nuevo hogar
          </Text>
        </View>
      </Card>
    );
    // return (
    //   // <List horizontal={true} data={services.item} renderItem={renderCard} />
    // );
  };
  const renderCard = (services) => {
    let img = './../assets/abue.jpg';
    services.item.images.forEach((images) => {
      if (images.is_cover) {
        img = images.image;
      }
    });

    const auximg = 'https://mpa-stage.s3.amazonaws.com/media/' + img;
    return (
      <Card
        style={styles.cardStyle}
        onPress={() => {
          details(services.item);
        }}>
        <Image style={styles.cardImg} source={{uri: auximg}} />
        <TitleHeader style={{marginTop: 8}}>{services.item.name}</TitleHeader>
        <DefaultText style={{alignItems: 'center'}}>
          {parseInt(services.item.ageNumber)}
          {parseInt(services.item.ageNumber) > 1
            ? services.item.ageType == 'Y'
              ? '  Años'
              : ' Meses'
            : services.item.ageType == 'Y'
            ? ' Año'
            : ' Mes'}{' '}
        </DefaultText>
        <Text
          style={{color: globalColors.greenPrimary, fontSize: 14}}
          onPress={() => {
            details(services.item);
          }}>
          Mi nuevo hogar
        </Text>
      </Card>
    );
  };
  const details = (adoption) => {
    navigation.navigate('AdoptionDetail', {
      adoption: adoption,
    });
  };
  return (
    <DefaultLayout
      statusBarStyle={'light-content'}
      style={[styles.container, {color: 'black'}]}>
      {listAdoption.length > 0 ? (
        <>
          <TitleHeader>{numResult} Resultados</TitleHeader>
          <DefaultText>
            {townName}, {stateName}.
          </DefaultText>
          <List
            style={styles.servicesContainer}
            horizontal={false}
            data={listAdoption}
            renderItem={renderServiceItem}
            numColumns={2}
          />
        </>
      ) : (
        <Layout style={{backgroundColor: globalColors.backgroundDefault}}>
          <Image
            style={styles.dogImage}
            source={require('../assets/adoptionNo.png')}
          />
          <Layout style={styles.layoutPort}>
            <TitleHeader>No se encontraron resultados</TitleHeader>
            <DefaultText style={{alignItems: 'center'}}>
              Intenta cambiar las opciones de filtros para obtener mejores
              resultados.
            </DefaultText>
          </Layout>
        </Layout>
      )}
    </DefaultLayout>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 45,
    backgroundColor: globalColors.backgroundDefault,
  },
  headerRight: {
    marginRight: 12,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 320,
    maxHeight: width,
    marginVertical: 5,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 15,
    marginTop: 10,
  },
  cardStyle: {
    borderRadius: 18,
    backgroundColor: globalColors.white,
    width: '48%',
    height: 205,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
  },
  cardImg: {
    width: '150%',
    height: '55%',
    marginTop: -20,
    marginLeft: -28,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
});
