import React from 'react';
import {
  ScrollView,
  View,
  ListRenderItemInfo,
  ImageBackground,
} from 'react-native';
import {
  Button,
  Text,
  Layout,
  Card,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from '../../auth/sign-up/extra/profile-avatar.component';
import {PlusIcon} from '../../auth/sign-up/extra/icons';
import {Service} from '../extra/data';
import {CategoryList} from '../extra/category-list.component';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const services: Service[] = [
    Service.travel1(),
    Service.travel2(),
    Service.travel3(),
  ];

  const onEventPetButtonPress = (event) => {
    navigation &&
      navigation.navigate(event.name, {
        pet: event.pet,
      });
  };

  const onClinicalHistoryButtonPress = (event) => {
    navigation &&
      navigation.navigate('ClinicalHistory', {
        pet: event.pet,
      });
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Text style={styles.profileLocation} category="s1">
        {props.item.category}
      </Text>
    </View>
  );

  const renderPostItem = (
    info: ListRenderItemInfo<Service>,
  ): React.ReactElement => (
    <View style={styles.profileLocationContainer}>
      <Card style={styles.card} info={info} footer={() => Footer(info)}>
        <ImageBackground style={styles.postItem} source={info.item.photo} />
      </Card>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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
        <Text
          style={styles.clinicHistoryText}
          onPress={onClinicalHistoryButtonPress}>
          Ver historial clínico
        </Text>
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <CategoryList
          contentContainerStyle={styles.postsList}
          hint="Agregar"
          hintLink=""
          navigation={navigation}
          data={[...services]}
          renderItem={renderPostItem}
        />
      </Layout>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  card: {
    borderWidth: 0,
  },
  clinicHistoryText: {
    textDecorationLine: 'underline',
  },
  postItem: {
    width: 144,
    height: 144,
    borderRadius: 4,
    borderWidth: 0,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  profileLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  postsList: {
    paddingHorizontal: 8,
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
  footerContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
