import {
  StyleService,
  useStyleSheet,
  Text,
  Card,
  List,
} from '@ui-kitten/components';
import React from 'react';
import {Image, Dimensions} from 'react-native';
import globalColors from '../../styles/colors';
export interface DatasGeneric {
  date?: Date | null;
  title: string;
  content: string;
  buttonText: string;
  buttonAlign: string;
  images?: string[];
  click: any;
}
const GenericCard = (props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const stylesCart = useStyleSheet(defaultStyle(props.data.buttonAlign));
  const renderServiceItem = (service) => {
    return (
      <Image
        style={{height: 50, width: 50, marginTop: 2}}
        source={require('../../layouts/visits/assets/dog-visit.png')}
      />
    );
  };
  return (
    <Card style={[styles.cardStyle, props.styleCard]}>
      {props.data.date ? (
        <Text style={styles.labelDate}>
          {props.data.date.getDate()}/{props.data.date.getMonth() + 1}/
          {props.data.date.getFullYear()}
        </Text>
      ) : (
        <Text></Text>
      )}
      <Text style={styles.h1Card}>{props.data.title}</Text>
      <Text style={styles.labelCard}>{props.data.content}</Text>
      {props.data.images.length > 0 ? (
        <List
          style={styles.servicesContainer}
          horizontal={true}
          data={props.data.images}
          renderItem={renderServiceItem}
        />
      ) : (
        <Text></Text>
      )}
      <Text
        style={stylesCart.header}
        onPress={() => {
          props.onClick(props.data);
        }}>
        {props.data.buttonText}
      </Text>
    </Card>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  h1Card: {
    color: globalColors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
  },
  title: {
    color: globalColors.black,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 24,
  },
  labelCard: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#707070',
    marginTop: 8,
    lineHeight: 24,
  },
  labelDate: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#707070',
    marginTop: 8,
  },
  cardStyle: {
    marginLeft: 24,
    marginBottom: 16,
    marginRight: 24,
    borderRadius: 18,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
    width: width,
    paddingTop: 5,
  },
});
const defaultStyle = (type) =>
  StyleService.create({
    header: {
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      textAlign: type,
      color: globalColors.greenSecondary,
      marginTop: 16,
    },
  });
export default GenericCard;
