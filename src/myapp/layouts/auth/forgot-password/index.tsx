import React from 'react';
import {View} from 'react-native';
import {StyleService, Button, Input, Text, Layout} from '@ui-kitten/components';
import {EmailIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';

export default ({navigation}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();

  const onResetPasswordButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <KeyboardAvoidingView>
      <Layout style={styles.formContainer} level="1">
        <Text style={styles.forgotPasswordLabel} category="h4" status="control">
          ¿Olvidaste tu contraseña?
        </Text>
        <Text style={styles.forgotPasswordLabel} status="control">
          Porfavor ingresa tu correo electrónico
        </Text>
        <View style={styles.formContainer}>
          <Input
            style={styles.emailInput}
            status="control"
            placeholder="Email"
            icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Button size="giant" onPress={onResetPasswordButtonPress}>
          CAMBIAR CONTRASEÑA
        </Button>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleService.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
    color: 'text-hint-color',
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
  },
});
