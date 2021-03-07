import React from 'react';
import {
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {CategoryList} from './extra/category-list.component';
import {MessageCircleIcon} from './extra/icons';
import {Service, Profile} from './extra/data';

const profile: Profile = Profile.helenKuper();

const services: Service[] = [
  Service.service1(),
  Service.service2(),
  Service.service3(),
];

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const onAddPetButtonPress = (pet) => {
    navigation &&
      navigation.navigate('AddPet', {
        pet: pet,
      });
  };

  const onDetailPetButtonPress = (pet) => {
    navigation &&
      navigation.navigate('DetailPet', {
        pet: pet,
        id: pet.id,
      });
  };

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Text style={styles.profileLocation} category="s1">
        {props.item.category}
      </Text>
    </View>
  );

  const renderPostItem = (
    info: ListRenderItemInfo<Post>,
  ): React.ReactElement => (
    <View style={styles.profileLocationContainer}>
      <Card style={styles.card} info={info} footer={() => Footer(info)}>
        <ImageBackground style={styles.postItem} source={info.item.photo} />
      </Card>
    </View>
  );

  const renderButtons = () => {
    const pets = [{name: 'Argos'}];
    const views = [];
    pets.map((pet) => {
      views.push(
        <Button
          style={styles.profileButton}
          icon={MessageCircleIcon}
          onPress={(pet) => onDetailPetButtonPress(pet)}>
          {pet.name}
        </Button>,
      );
    });

    return views;
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <Layout style={styles.header} level="1">
        <View style={styles.profileContainer}>
          <View style={styles.profileDetailsContainer}>
            <Text category="h4">{profile.fullName}</Text>
            <View style={styles.profileLocationContainer}>
              <Text
                style={styles.profileLocation}
                appearance="hint"
                category="s1">
                {profile.location}
              </Text>
            </View>
          </View>
          <Avatar
            style={styles.profileAvatar}
            size="large"
            source={profile.photo}
          />
        </View>
        <View style={styles.profileButtonsContainer}>
          {renderButtons()}

          <Button
            appearance="outline"
            style={styles.profileButton}
            icon={MessageCircleIcon}
            onPress={onAddPetButtonPress}>
            +
          </Button>
        </View>
      </Layout>
      <CategoryList
        contentContainerStyle={styles.postsList}
        hint="¿Que necesitan tus mascotas hoy?"
        hintLink="MisPedidos"
        navigation={navigation}
        data={[...services, ...services]}
        renderItem={renderPostItem}
      />
      <Card style={styles.banner}>
        <Text style={styles.profileLocation} category="s1">
          ¡Haz un nuevo amigo!
        </Text>
        <Text style={styles.profileLocation} category="s2">
          Adopta una mascota hoy
        </Text>
      </Card>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  contentContainer: {
    flex: 1,
  },
  card: {
    borderWidth: 0,
  },
  header: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLocation: {
    marginHorizontal: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
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
  profileSocialsDivider: {
    marginHorizontal: -16,
  },
  profileSocialsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
    marginBottom: 8,
  },
  postsList: {
    paddingHorizontal: 8,
  },
  banner: {
    margin: 20,
    padding: 20,
  },
  postItem: {
    width: 144,
    height: 144,
    borderRadius: 4,
    borderWidth: 0,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  footerContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
