import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
// Env
import environments from '../../../environments';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks.
import useAdoptionRequestAll from '../../../hooks/adoption/useAdoptionRquestAll';
import useAdoptionRequest from '../../../hooks/adoption/useAdoptionRequest';
// My Components.
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import ImageCarousel from '../../../components/images/image-carousel';
import TitleHeader from '../../../components/texts/title-header';

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
      uri: environments.IMAGES_HOST + element.image,
    });
  });

  return (
    <>
      <ImageCarousel images={dataImg} />
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
          <DefaultText style={styles.breedName}>
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
            }}
            isSubmit>
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

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  breedName: {
    marginTop: -8,
    marginBottom: 32,
  },
  bottomSpace: {
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
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
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    color: globalColors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lugarText: {
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    color: globalColors.darkGray,
  },
  finalText: {
    fontFamily: globalVars.fontRegular,
    fontSize: 14,
    color: globalColors.darkGray,
    marginBottom: 10,
  },
  titleCard: {
    backgroundColor: globalColors.backgroundDefault,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingTop: 28,
    width: '100%',
  },
});
