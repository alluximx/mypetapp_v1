import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  TabView,
  Tab,
} from '@ui-kitten/components';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ScrollView style={styles.contentContainer}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="Estatus Vacunas">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Estatus Vacunas</Text>
          </Layout>
        </Tab>
        <Tab title="Desparacitaciones">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Desparacitaciones</Text>
          </Layout>
        </Tab>
        <Tab title="Visitas">
          <Layout style={styles.tabContainer}>
            <Text category="h5">Visitas</Text>
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
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
