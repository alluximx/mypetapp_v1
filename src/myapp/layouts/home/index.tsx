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
  Divider,
  Card,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileSocial} from './extra/profile-social.component';
import {CategoryList} from './extra/category-list.component';
import {MessageCircleIcon, PersonAddIcon, PinIcon} from './extra/icons';
import {Post, Profile} from './extra/data';

const profile: Profile = Profile.helenKuper();

const plantPosts: Post[] = [Post.plant1(), Post.plant2(), Post.plant3()];

const travelPosts: Post[] = [Post.travel1(), Post.travel2(), Post.travel3()];

const stylePosts: Post[] = [Post.style1(), Post.style2(), Post.style3()];

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const onFollowButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onMessageButtonPress = (): void => {
    navigation && navigation.navigate('Chat1');
  };

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="small">
        {props.item.category}
      </Button>
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
          <Button
            style={styles.profileButton}
            icon={PersonAddIcon}
            onPress={onFollowButtonPress}>
            Molly
          </Button>
          <Button
            appearance="outline"
            style={styles.profileButton}
            icon={MessageCircleIcon}
            onPress={onMessageButtonPress}>
            Argos
          </Button>
        </View>
        <Divider style={styles.profileSocialsDivider} />
        {/* <View style={styles.profileSocialsContainer}>
          <ProfileSocial hint="Followers" value={`${profile.followers}`} />
          <ProfileSocial hint="Following" value={`${profile.following}`} />
          <ProfileSocial hint="Posts" value={`${profile.posts}`} />
        </View> */}
      </Layout>
      <CategoryList
        contentContainerStyle={styles.postsList}
        hint="¿Que necesitan tus mascotas hoy?"
        data={[...plantPosts, ...plantPosts]}
        renderItem={renderPostItem}
      />
      <CategoryList
        contentContainerStyle={styles.postsList}
        hint="Style"
        data={[...stylePosts, ...stylePosts]}
        renderItem={renderPostItem}
      />
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
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
  postItem: {
    width: 144,
    height: 144,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
