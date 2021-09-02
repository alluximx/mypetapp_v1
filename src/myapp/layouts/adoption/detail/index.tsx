import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import CustomButton from '../../../components/buttons/custom-button';
import SimplePaginationDot from '../../../components/adoption/SimplePaginationDot';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const INITIAL_INDEX = 0;
export default ({navigation, route}): React.ReactElement => {
  const dataImg = [];

  route.params.adoption.images.forEach((element) => {
    dataImg.push({
      uri: 'https://mpa-stage.s3.amazonaws.com/media/' + element.image,
    });
  });
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  return (
    <>
      <View style={styles.container2}>
        <FlatList
          data={dataImg}
          horizontal
          pagingEnabled
          ref={carouselRef}
          onScroll={(e) => {
            const offset = e.nativeEvent.contentOffset.x;
            const index = offset / 400; // your cell height
            setCurrentIndex(index);
          }}
          renderItem={({item}) => {
            const {uri} = item;
            return (
              <Image
                source={{uri: uri}}
                style={{
                  width: width,
                  height: height * 0.45,
                  resizeMode: 'cover',
                }}
              />
            );
          }}
          keyExtractor={(_, item) => item.toString()}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.50)', 'transparent']}
          style={styles.linearGradientTop}
        />
        <LinearGradient
          colors={['transparent', globalColors.black]}
          style={styles.linearGradient}>
          <SimplePaginationDot
            currentIndex={currentIndex}
            length={dataImg.length}
            style={{position: 'absolute', bottom: 80}}
          />
        </LinearGradient>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.titleCard}>
          <TitleHeader style={styles.bottomSpace}>
            {route.params.adoption.name}
          </TitleHeader>
        </View>
        <DefaultLayout
          statusBarTranslucent
          statusBarStyle={'light-content'}
          statusBarBackgroundColor={'transparent'}
          style={styles.container}>
          <DefaultText style={{marginBottom: 30}}>
            {route.params.adoption.breed.name}
          </DefaultText>
          <View style={styles.viewText}>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View style={{flex: 1, alignSelf: 'stretch', width: '33%'}}>
                <Text style={styles.subTitle}>
                  {route.params.adoption.sex === 'H'
                    ? 'Hembra'
                    : route.params.adoption.sex === 'M' && 'Macho'}
                </Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch', width: '34%'}}>
                <Text style={styles.subTitle}>
                  {parseInt(route.params.adoption.ageNumber, 2)}
                  {parseInt(route.params.adoption.ageNumber, 2) > 1
                    ? route.params.adoption.ageType === 'Y'
                      ? '  Años'
                      : ' Meses'
                    : route.params.adoption.ageType === 'Y'
                    ? ' Año'
                    : ' Mes'}{' '}
                </Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch', width: '33%'}}>
                <Text style={styles.subTitle}>
                  {route.params.adoption.color}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.viewText}>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View style={{flex: 1, alignSelf: 'stretch', width: '33%'}}>
                <Text style={styles.subSubTitle}>Sexo</Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch', width: '34%'}}>
                <Text style={styles.subSubTitle}>Edad</Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch', width: '33%'}}>
                <Text style={styles.subSubTitle}>Color</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.subTitle, {marginTop: 25}]}>Mi nuevo hogar</Text>
          <Text style={[styles.lugarText, {marginBottom: 16}]}>
            {route.params.adoption.municipality.name},{' '}
            {route.params.adoption.state.name}
          </Text>
          <DefaultText>{route.params.adoption.description}</DefaultText>
          <CustomButton
            style={{marginTop: 24, marginBottom: 22}}
            onPress={() => {
              navigation.navigate('AdoptionRequest', {
                adoption: route.params.adoption,
              });
            }}>
            Quiero Adoptar
          </CustomButton>
          <Text style={styles.lugarText}>
            Esta asociación solo permite 2 solicitudes pendientes por usuario y
            en total no puedes tener más de 4 solicitudes pendientes.
          </Text>
        </DefaultLayout>
      </ScrollView>
    </>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingTop: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 60,
    height: height,
  },
  petImageContainer: {
    width: width,
    flex: 1,
    height: height / 2 - 25,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bottomSpace: {
    marginBottom: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  subTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: globalColors.darkerGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subSubTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: globalColors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lugarText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: globalColors.darkGray,
  },
  titleCard: {
    backgroundColor: globalColors.backgroundDefault,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingTop: 32,
    position: 'absolute',
    marginTop: 0,
    width: '100%',
  },
  container2: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: '50%',
    marginBottom: '-15%',
  },
  carousel: {
    backgroundColor: 'transparent',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  imageBackground: {
    flex: 1,
    width: 250,
    backgroundColor: '#EBEBEB',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
    fontSize: 18,
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
  },
  linearGradient: {
    height: 150,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  linearGradientTop: {
    height: 100,
    width: width,
    position: 'absolute',
    top: 0,
  },
});
