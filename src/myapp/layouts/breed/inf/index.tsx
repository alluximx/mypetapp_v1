import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Input,
  Icon,
  Card,
  List,
  Spinner,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import DefaultLayout from '../../../components/layouts/default-layout';
import globalColors from '../../../styles/colors';
import {Dimensions, TouchableWithoutFeedback, Image, View} from 'react-native';
import useBreedsInformation from '../../../hooks/breed/useBreedsInformation';
import UserInput from '../../../components/inputs/user-input';
import {TextInput} from 'react-native-gesture-handler';

const InfBreedScreen = ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const data = useBreedsInformation();
  const [breeds, setBreeds] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [name, setName] = React.useState('');
  useEffect(() => {
    if (data.data) {
      setBreeds(data.data.data);
      setList(data.data.data);
    }
  }, [data.data]);
  const onFilter = async (event: string) => {
    let aux = list.filter((breed) => {
      return (
        breed.breed.name
          .toLocaleUpperCase()
          .indexOf(event.toLocaleUpperCase()) >= 0
      );
    });
    if (event == '') {
      //aux.push(data.refetch());
      data.refetch();
    }
    setBreeds(aux);
    setName(event);
  };
  const renderServiceItem = (service) => {
    const param = service.item;
    return (
      <Card
        style={styles.cardStyle}
        onPress={() => navigation.navigate('DetailBreed', {breed: param})}>
        <View style={{flexDirection: 'row'}}>
          {service.item.image == null ? (
            <Image
              style={{width: 48, height: 48, margin: 1}}
              source={require('../assets/dog.png')}
            />
          ) : (
            <Image
              style={{width: 48, height: 48, margin: 1}}
              source={{uri: service.item.image}}
            />
          )}
          <Text style={styles.tituloCard}>{service.item.breed.name}</Text>
        </View>
      </Card>
    );
  };
  const renderIcon = (props) => <Icon {...props} name={'search'} />;
  return (
    <DefaultLayout style={[styles.container, {color: 'black'}]}>
      <Layout
        style={[
          styles.formContainer,
          {backgroundColor: globalColors.backgroundDefault},
        ]}>
        <Text style={styles.title}>Características de Razas</Text>
        <Layout style={styles.filter}>
          {/* {<UserInput
                        value={name}
                        placeholder="Nombre"
                        onChangeText={onFilter}
                    />} */}
          <Input
            placeholder="Nombre"
            accessoryLeft={renderIcon}
            style={styles.inputContainer}
            onChangeText={onFilter}
            textStyle={{minHeight: 50, fontSize: 20}}
          />
        </Layout>

        {data.isLoading ? (
          <View style={styles.viewContainer}>
            <Spinner size="large" status="success" />
          </View>
        ) : breeds.length > 0 ? (
          <List
            style={styles.servicesContainer}
            data={breeds}
            renderItem={renderServiceItem}
          />
        ) : (
          <Layout
            style={[
              styles.formContainer,
              {backgroundColor: globalColors.backgroundDefault},
            ]}>
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
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
    width: width,
  },
  title: {
    marginTop: 20,
    marginLeft: 24,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  filter: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    borderRadius: 4,
    backgroundColor: globalColors.backgroundDefault,
  },
  cardLayout: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor: globalColors.backgroundDefault,
  },
  cardStyle: {
    marginBottom: 16,
    borderRadius: 16,
    height: 80,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20,
  },
  tituloCard: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginTop: 14,
    marginLeft: 15,
  },
  imgNot: {
    width: width,
    height: 320,
  },
  labelNot: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
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
