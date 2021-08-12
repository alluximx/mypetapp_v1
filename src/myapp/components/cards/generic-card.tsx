import {Card, List, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Image, Dimensions} from 'react-native';
import moment from 'moment';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';
// Types.
import {DatasGeneric} from '../../types/components/cards';

const GenericCard = (props: DatasGeneric): React.ReactElement => {
  const {buttonAlign, buttonText, content, date, images, title} = props.data;
  const formattedDate = moment(date).format('DD/MM/YYYY');
  const styles = useStyleSheet(themedStyles);
  const stylesCart = useStyleSheet(defaultStyle(buttonAlign));

  const renderServiceItem = (service) => {
    return (
      <Image style={styles.imageStyles} source={{uri: service.item.file}} />
    );
  };

  return (
    <Card style={[styles.cardStyle, props.styleCard]}>
      {date && (
        <DefaultText style={styles.labelDate}>{formattedDate}</DefaultText>
      )}
      <TitleHeader style={styles.title}>{title}</TitleHeader>
      <DefaultText style={styles.labelCard} numberOfLines={5} wrapText>
        {content}
      </DefaultText>
      {images.length > 0 && (
        <List
          data={images}
          horizontal={true}
          renderItem={renderServiceItem}
          style={styles.servicesContainer}
        />
      )}
      <AnchorText onPress={() => props.onClick()} style={stylesCart.header}>
        {buttonText}
      </AnchorText>
    </Card>
  );
};

const themedStyles = StyleService.create({
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  labelCard: {
    marginTop: 4,
  },
  imageStyles: {
    height: 40,
    width: 40,
    marginTop: 16,
    marginRight: 16,
  },
  labelDate: {
    fontSize: 14,
  },
  cardStyle: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 18,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
    paddingTop: 5,
  },
});

const defaultStyle = (type) =>
  StyleService.create({
    header: {
      textAlign: type,
      marginTop: 16,
    },
  });

export default GenericCard;
