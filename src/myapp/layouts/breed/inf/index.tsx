import {
  Card,
  Icon,
  Input,
  Layout,
  List,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Dimensions, Image, Platform, View} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks
import useBreedsInformation from '../../../hooks/breed/useBreedsInformation';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';

const InfBreedScreen = ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const data = useBreedsInformation();
  const [breeds, setBreeds] = React.useState([]);
  const [list, setList] = React.useState([]);

  useEffect(() => {
    if (data.data) {
      setBreeds(data.data.data);
      setList(data.data.data);
    }
  }, [data.data]);

  const onFilter = async (event: string) => {
    const aux = list.filter(
      ({breed}) =>
        breed.name.toLocaleUpperCase().indexOf(event.toLocaleUpperCase()) >= 0,
    );
    if (event === '') {
      data.refetch();
    }
    setBreeds(aux);
  };

  const renderBreedItem = ({item}) => (
    <Card
      style={styles.cardStyle}
      onPress={() => navigation.navigate('DetailBreed', {breed: item})}>
      <View style={styles.cardContent}>
        {item.image == null ? (
          <Image
            style={styles.cardImage}
            source={require('../assets/dog.png')}
          />
        ) : (
          <Image style={styles.cardImage} source={{uri: item.image}} />
        )}
        <Text style={styles.tituloCard} ellipsizeMode="tail" numberOfLines={2}>
          {item.breed.name}
        </Text>
      </View>
    </Card>
  );

  const renderIcon = (props) => <Icon {...props} name={'search'} />;

  return (
    <DefaultLayout style={styles.container}>
      <Layout style={styles.formContainer}>
        <TitleHeader style={styles.title}>Características de Razas</TitleHeader>
        <Layout style={styles.filter}>
          <Input
            placeholder="Nombre"
            accessoryLeft={renderIcon}
            style={styles.inputContainer}
            onChangeText={onFilter}
            textStyle={styles.filterInput}
          />
        </Layout>

        {data.isLoading ? (
          <View style={styles.viewContainer}>
            <Spinner size="large" status="success" />
          </View>
        ) : breeds.length > 0 ? (
          <List
            style={styles.listContainer}
            data={breeds}
            renderItem={renderBreedItem}
          />
        ) : (
          <Layout style={styles.formContainer}>
            <Image
              style={styles.imgNot}
              source={require('../assets/breed-not-found.png')}
            />
            <Text style={styles.labelNot}>No se encontraron resultados</Text>
          </Layout>
        )}
      </Layout>
    </DefaultLayout>
  );
};
const {width} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
    width: width,
    backgroundColor: globalColors.backgroundDefault,
  },
  title: {
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 0,
  },
  filter: {
    marginVertical: 24,
    marginHorizontal: 24,
    borderRadius: 4,
    backgroundColor: globalColors.backgroundDefault,
  },
  filterInput: {
    height: 46,
    fontSize: 16,
  },
  cardStyle: {
    marginBottom: 16,
    borderRadius: 16,
    height: 80,
    marginRight: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardImage: {
    width: 48,
    height: 48,
  },
  listContainer: {
    backgroundColor: 'transparent',
    marginLeft: 24,
    marginRight: 12,
  },
  tituloCard: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontSize: 16,
    marginLeft: 15,
    maxWidth: '75%',
  },
  imgNot: {
    width: width,
    height: 320,
  },
  labelNot: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: 24,
    color: globalColors.darkerGray,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
  },
});
export default InfBreedScreen;
