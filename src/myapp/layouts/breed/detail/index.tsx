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
  const data = route.params.breed;
  const image = require('../assets/dog-notFound.jpg');
  return (
    <>
      {data.image == null ? (
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.petImageContainer}
        />
      ) : (
        <ImageBackground
          source={{uri: data.image}}
          resizeMode="cover"
          style={styles.petImageContainer}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          position: 'relative',
          marginTop: 124,
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
            <View style={styles.servicesContainer}>
              <Text style={styles.subtitulo}>Descripción general</Text>
              <Text style={styles.label}>{data.description}</Text>
              <Text style={styles.subtitulo}>Tamaño</Text>
              <Text style={styles.label}>{data.size.name}</Text>
              <Text style={styles.subtitulo}>Peso</Text>
              <Text style={styles.label}>
                Entre de {data.min_weight} y {data.max_weight} kg
              </Text>
              <Text style={styles.subtitulo}>Altura</Text>
              <Text style={styles.label}>
                Entre de {data.min_height} y {data.max_height} cm
              </Text>
              <Text style={styles.subtitulo}>Esperanza de vida</Text>
              <Text style={styles.label}>{data.life_expectancy} años</Text>
              <Text style={styles.subtitulo}>Principales características</Text>
              <Text style={styles.label}>{data.main_characteristics}</Text>
              <Text style={styles.subtitulo}>Nivel energético</Text>
              <PawBreed
                numberTteam={5}
                number={parseInt(data.energy_level, 10)}
              />
              <Text style={styles.subtitulo}>Tendencia a babear</Text>
              <PawBreed
                numberTteam={5}
                number={parseInt(data.slobber_level, 10)}
              />
              <Text style={styles.subtitulo}>Tendencia a ladrar</Text>
              <PawBreed
                numberTteam={5}
                number={parseInt(data.barking_level, 10)}
              />
              <Text style={styles.subtitulo}>Necesidad de atención</Text>
              <PawBreed
                numberTteam={5}
                number={parseInt(data.attention_level, 10)}
              />
            </View>
          </DefaultLayout>
        </ScrollView>
      </View>
    </>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: height / 2 - 210,
    paddingTop: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 60,
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
    marginTop: 16,
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
    top: height / 2 - 170,
    width: '100%',
  },
});
