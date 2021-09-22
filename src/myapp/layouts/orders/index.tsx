import React from 'react';
import {ScrollView, View, Image} from 'react-native';
import {
  Layout,
  StyleService,
  List,
  ListItem,
  useStyleSheet,
  Button,
  Text,
} from '@ui-kitten/components';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const InstallButton = (props) => <Button size="tiny">INSTALL</Button>;

  const data = new Array(8).fill({
    date: '12 de Febrero - 15 de Febrero',
    status: 'Entregado',
  });

  const renderItem = ({item, index}) => (
    <ListItem>
      <Image
        style={[styles.image, {tintColor: null}]}
        source={require('../home/assets/image-pet-1.jpg')}
      />
      <View>
        <Text category="s1">Entrega estimada:</Text>
        <Text category="s1">{`${item.date} ${index + 1}`}</Text>
        <Text appearance="hint" category="p2">
          {`${item.status} ${index + 1}`}
        </Text>
        {InstallButton}
      </View>
    </ListItem>
  );

  return (
    <ScrollView style={styles.contentContainer}>
      <Layout style={styles.header} level="1">
        <View style={styles.profileContainer}>
          <List data={data} renderItem={renderItem} />
        </View>
      </Layout>
      <Button size="tiny">Ver todos mis pedidos</Button>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 0,
    marginHorizontal: 8,
    overflow: 'hidden',
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
