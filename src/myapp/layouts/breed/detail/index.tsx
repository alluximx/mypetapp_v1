import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {List} from '@ui-kitten/components';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import PawBreed from '../../../components/utils/paw-breed';
import TitleHeader from '../../../components/texts/title-header';

export default ({route}): React.ReactElement => {
  const data = [route.params.breed];
  const image = require('../assets/dog-notFound.jpg');
  const renderDataItem = ({item}) => {
    return (
      <View style={styles.servicesContainer}>
        <Text style={styles.subtitulo}>Descripción general</Text>
        <Text style={styles.label}>{item.description}</Text>
        <Text style={styles.subtitulo}>Tamaño</Text>
        <Text style={styles.label}>{item.size.name}</Text>
        <Text style={styles.subtitulo}>Peso</Text>
        <Text style={styles.label}>
          Entre de {item.min_weight} y {item.max_weight} kg
        </Text>
        <Text style={styles.subtitulo}>Altura</Text>
        <Text style={styles.label}>
          Entre de {item.min_height} y {item.max_height} cm
        </Text>
        <Text style={styles.subtitulo}>Esperanza de vida</Text>
        <Text style={styles.label}>{item.life_expectancy} años</Text>
        <Text style={styles.subtitulo}>Principales características</Text>
        <Text style={styles.label}>{item.main_characteristics}</Text>
        <Text style={styles.subtitulo}>Nivel energético</Text>
        <PawBreed numberTteam={5} number={parseInt(item.energy_level, 2)} />
        <Text style={styles.subtitulo}>Tendencia a babear</Text>
        <PawBreed numberTteam={5} number={parseInt(item.slobber_level, 2)} />
        <Text style={styles.subtitulo}>Tendencia a ladrar</Text>
        <PawBreed numberTteam={5} number={parseInt(item.barking_level, 2)} />
        <Text style={styles.subtitulo}>Necesidad de atención</Text>
        <PawBreed numberTteam={5} number={parseInt(item.attention_level, 2)} />
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
          marginTop: 92,
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
            statusBarStyle={'dark-content'}
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
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    marginTop: 32,
  },
  label: {
    fontSize: 16,
    fontFamily: globalVars.fontRegular,
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
