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
import useAdoptionRequestAll from '../../../hooks/adoption/useAdoptionRquestAll';
import useAdoptionRequest from '../../../hooks/adoption/useAdoptionRequest';
import {useEffect} from 'react';

const INITIAL_INDEX = 0;
export default ({navigation, route}): React.ReactElement => {
  const dataImg = [];
  const dataAllowed = useAdoptionRequest(route.params.adoption.id);
  const data = useAdoptionRequestAll(route.params.adoption.association.id);
  const [isDisable, setIsDisable] = useState(false);
  const [totalAllowed, setTotalAllowed] = useState(0);
  const [associationAllowed, setAssociationAllowed] = useState(0);
  const nameAss = route.params.adoption.association.name;
  useEffect(() => {
    if (data.data) {
      const request = data.data.data;
      if (request.total_allowed_request > request.total_requests) {
        if (
          request.association_allowed_requests >
          request.association_total_request
        ) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else {
        setIsDisable(true);
      }
      setTotalAllowed(request.total_allowed_request);
      setAssociationAllowed(request.association_allowed_requests);
    }
    if (dataAllowed.data) {
      if (dataAllowed.data.data) {
        setIsDisable(true);
      }
    }
  }, [data.data, dataAllowed.data]);
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
            const index = offset / 300; // your cell height
            setCurrentIndex(parseInt(index, 3));
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
      <View style={styles.titleCard}>
        <TitleHeader style={styles.bottomSpace}>
          {route.params.adoption.name}
        </TitleHeader>
      </View>
      <ScrollView>
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
                  {route.params.adoption.ageNumber}
                  {route.params.adoption.ageNumber > 1
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
          <Text style={[styles.subTitle, {marginTop: 25}]}>{nameAss}</Text>
          <Text style={[styles.lugarText, {marginBottom: 16}]}>
            {route.params.adoption.municipality.name},{' '}
            {route.params.adoption.state.name}
          </Text>
          <DefaultText>{route.params.adoption.description}</DefaultText>
          <CustomButton
            style={{marginTop: 24, marginBottom: 22}}
            isDisabled={isDisable}
            onPress={() => {
              navigation.navigate('AdoptionRequest', {
                adoption: route.params.adoption,
              });
            }}>
            Quiero Adoptar
          </CustomButton>
          <Text style={styles.finalText}>
            Esta asociación solo permite {associationAllowed} solicitudes
            pendientes por usuario y en total no puedes tener más de{' '}
            {totalAllowed} solicitudes pendientes.
          </Text>
        </DefaultLayout>
      </ScrollView>
    </>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  bottomSpace: {
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: globalColors.darkerGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    marginBottom: 8,
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
  finalText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: globalColors.darkGray,
    marginBottom: 10,
  },
  titleCard: {
    backgroundColor: globalColors.backgroundDefault,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingTop: 32,
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
