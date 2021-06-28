import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
// My components
import AnchorText from '../../components/texts/anchor-text';
import CustomButton from '../../components/buttons/custom-button';
import DefaultLayout from '../../components/default-layout';
// Global styles.
import globalColors from '../../styles/colors';

export default ({navigation}): React.ReactElement => {
  const onStartButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onSignInTextPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onSignInAsInvitedTextPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  return (
    <DefaultLayout style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-white.png')}
        />
        <Image
          style={styles.dogImage}
          source={require('./assets/dog-image.png')}
        />
        <Text style={styles.h1} category="h1">
          Todos los servicios para el cuidado de tu mascota en un solo lugar.
        </Text>
        <CustomButton
          type="primary"
          style={styles.signUpButton}
          onPress={onStartButtonPress}>
          ¡Empieza Ahora!
        </CustomButton>
        <View style={styles.signInTextContainer}>
          <Text style={styles.signInText}>Si ya tienes cuenta</Text>
          <AnchorText style={styles.signInLink} onPress={onSignInTextPress}>
            Inicia Sesión
          </AnchorText>
        </View>
      </View>
      <AnchorText
        style={styles.signInAsInvited}
        onPress={onSignInAsInvitedTextPress}>
        Ingresar como invitado
      </AnchorText>
    </DefaultLayout>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.greenPrimary,
    justifyContent: 'space-around',
  },
  logo: {
    marginTop: '10%',
    resizeMode: 'contain',
    width: '30%',
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: height - 420,
    maxHeight: 350,
    marginVertical: 5,
  },
  h1: {
    color: globalColors.white,
    fontSize: 24,
    lineHeight: 34,
    marginBottom: 24,
    fontFamily: 'Montserrat-Bold',
  },
  signUpButton: {
    marginBottom: 24,
  },
  signInTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    textAlign: 'center',
    color: globalColors.white,
  },
  signInLink: {
    paddingLeft: 5,
  },
  signInAsInvited: {
    textAlign: 'center',
    marginVertical: 20,
  },
});
