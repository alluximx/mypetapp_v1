import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {
  Button,
  Text,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from '../../auth/sign-up/extra/profile-avatar.component';
import {PlusIcon} from '../../auth/sign-up/extra/icons';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onEventPetButtonPress = (event) => {
    navigation &&
      navigation.navigate(event.name, {
        pet: event.pet,
      });
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  );

  const renderButtons = () => {
    const events = [{name: 'vaccine'}, {name: 'deworm'}, {name: 'visit'}];
    const views = [];
    events.map((event) => {
      views.push(
        <Button
          style={styles.profileButton}
          onPress={(pet) => onEventPetButtonPress(pet)}>
          {event.name}
        </Button>,
      );
    });

    return views;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfileAvatar
          style={styles.profileAvatar}
          resizeMode="center"
          editButton={renderEditAvatarButton}
          source={require('../../home/assets/image-pet-1.jpg')}
        />
      </View>
      <Layout style={styles.formContainer} level="1">
        <Text>Molly</Text>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Text>Schnauzer (H)</Text>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Text>3 años</Text>
        <Text>22 de Septiembre</Text>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Text>Ver historial clínico</Text>
      </Layout>

      <View style={styles.profileButtonsContainer}>{renderButtons()}</View>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'color-primary-default',
    tintColor: 'color-primary-default',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 30,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-hint-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
