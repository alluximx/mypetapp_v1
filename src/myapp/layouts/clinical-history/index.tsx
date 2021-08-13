import React from 'react';
import {Dimensions, ScrollView, View, Image} from 'react-native';
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  List,
  ListItem,
  TabView,
  Tab,
} from '@ui-kitten/components';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
      </View>
    </ListItem>
  );

  return (
    <ScrollView style={styles.contentContainer}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="Estatus Vacunas">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Estatus Vacunas</Text>
            <List data={data} renderItem={renderItem} />
          </Layout>
        </Tab>
        <Tab title="Desparasitaciones">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Desparasitaciones</Text>
            <List data={data} renderItem={renderItem} />
          </Layout>
        </Tab>
        <Tab title="Visitas">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Visitas</Text>
            <List data={data} renderItem={renderItem} />
          </Layout>
        </Tab>
      </TabView>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  container: {
    margin: 12,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
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
    width: 60,
    height: 60,
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
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
