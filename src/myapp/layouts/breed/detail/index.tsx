import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import {Icon, Layout, List, Button, StyleService} from '@ui-kitten/components';
import PawBreed from '../../../components/utils/paw-breed';
export default ({navigation, route}): React.ReactElement => {
  const data = [route.params.breed];
  const image = require('../assets/dog-notFound.jpg');
  const renderDataItem = (service) => {
    return (
      <View style={styles.servicesContainer}>
        <Text style={styles.subtitulo}>Descripción general</Text>
        <Text style={styles.label}>{service.item.description}</Text>
        <Text style={styles.subtitulo}>Tamaño</Text>
        <Text style={styles.label}>{service.item.size.name}</Text>
        <Text style={styles.subtitulo}>Peso</Text>
        <Text style={styles.label}>
          Entre de {service.item.min_weight} y {service.item.max_weight} kg
        </Text>
        <Text style={styles.subtitulo}>Altura</Text>
        <Text style={styles.label}>
          Entre de {service.item.min_height} y {service.item.max_height} cm
        </Text>
        <Text style={styles.subtitulo}>Esperanza de vida</Text>
        <Text style={styles.label}>{service.item.life_expectancy} años</Text>
        <Text style={styles.subtitulo}>Criado para</Text>
        <Text style={styles.label}>{service.item.purpose}</Text>
        <Text style={styles.subtitulo}>Principales características</Text>
        <Text style={styles.label}>{service.item.main_characteristics}</Text>
        <Text style={styles.subtitulo}>Nivel energético</Text>
        <PawBreed
          numberTteam={5}
          number={parseInt(service.item.energy_level)}
        />
        <Text style={styles.subtitulo}>Tendencia a babear</Text>
        <PawBreed
          numberTteam={5}
          number={parseInt(service.item.slobber_level)}
        />
        <Text style={styles.subtitulo}>Tendencia a roncar</Text>
        <PawBreed
          numberTteam={5}
          number={parseInt(service.item.snoring_level)}
        />
        <Text style={styles.subtitulo}>Tendencia a ladrar</Text>
        <PawBreed
          numberTteam={5}
          number={parseInt(service.item.barking_level)}
        />
        <Text style={styles.subtitulo}>Necesidad de atención</Text>
        <PawBreed
          numberTteam={5}
          number={parseInt(service.item.attention_level)}
        />
      </View>
    );
  };
  return (
    <>
      {data[0].image == null ? (
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.petImageContainer}
        />
      ) : (
        <ImageBackground
          source={{uri: data[0].image}}
          resizeMode="cover"
          style={styles.petImageContainer}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          position: 'relative',
          marginTop: 88,
        }}></View>
      <View style={{marginBottom: 50, borderRadius: 40, overflow: 'hidden'}}>
        <ScrollView stickyHeaderIndices={[0]}>
          <View style={styles.titleCard}>
            <TitleHeader style={styles.bottomSpace}>
              {route.params.breed.breed.name}
            </TitleHeader>
          </View>
          <DefaultLayout
            statusBarTranslucent
            statusBarStyle={'light-content'}
            statusBarBackgroundColor={'rgba(230,240,233,0.50)'}
            style={styles.container}>
            <List
              style={styles.servicesContainer}
              data={data}
              renderItem={renderDataItem}
            />
          </DefaultLayout>
        </ScrollView>
      </View>
    </>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: height / 2 - 100,
    paddingTop: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 30,
  },
  petDataCards: {
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  petImageContainer: {
    width: width,
    flex: 1,
    height: height / 2,
    resizeMode: 'cover',
    position: 'absolute',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  bottomSpace: {
    marginBottom: 24,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginTop: 32,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginTop: 8,
    textAlign: 'justify',
    color: '#707070',
    lineHeight: 24,
  },
  pawPrint: {
    width: 60,
    height: 60,
  },
  titleCard: {
    backgroundColor: globalColors.backgroundDefault,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingTop: 32,
    position: 'absolute',
    top: height / 2 - 135,
    width: '100%',
  },
});
