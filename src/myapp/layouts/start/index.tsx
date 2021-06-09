import React from 'react';
// ThirdParty Components
import {View, Image} from 'react-native';
import {Button, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
// My components
import AnchorText from '../../components/anchor-text';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

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
    <View style={styles.container}>
      <Image source={require('./assets/logo-white.png')}></Image>
      <Image
        style={styles.dogImage}
        source={require('./assets/dog-image.png')}></Image>
      <Text style={styles.h1} category="h1">
        Todos los servicios para el cuidado de tu mascota en un solo lugar.
      </Text>
      <Button
        appearance="ghost"
        style={styles.signUpButton}
        onPress={onStartButtonPress}>
        ¡Empieza Ahora!
      </Button>
      <Text style={styles.signInText}>
        Si ya tienes cuenta
        <AnchorText style={styles.signInLink} onPress={onSignInTextPress}>
          Inicia Sesión
        </AnchorText>
      </Text>
      <AnchorText onPress={onSignInAsInvitedTextPress}>
        Ingresar como invitado
      </AnchorText>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: globalColors.greenPrimary,
    padding: globalVars.outsidePadding,
    flex: 1,
  },
  dogImage: {
    justifyContent: 'center',
    height: '50%',
  },
  h1: {
    color: globalColors.white,
    fontSize: 24,
    marginBottom: 24,
    lineHeight: 34,
  },
  signUpButton: {
    backgroundColor: globalColors.white,
    fontSize: 17,
    marginBottom: 24,
  },
  signInText: {
    marginBottom: 34,
    textAlign: 'center',
  },
  signInLink: {
    paddingLeft: 10,
  },
});
