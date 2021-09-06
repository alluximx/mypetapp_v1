import {Card, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import moment from 'moment';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';
// Types.
import {DatasGeneric} from '../../types/components/cards';
import PreviewableImageList from '../modals/previewable-image-list';

const GenericCard = (props: DatasGeneric): React.ReactElement => {
  const {buttonAlign, buttonText, content, date, images, title} = props.data;
  const formattedDate = moment.utc(date).format('DD/MM/YYYY');
  const styles = useStyleSheet(themedStyles);
  const stylesCart = useStyleSheet(defaultStyle(buttonAlign));

  let imageList;
  if (images) {
    imageList = images.map((image) => {
      return {
        uri: image.file,
      };
    });
  }

  return (
    <Card style={[styles.cardStyle, props.styleCard]} disabled={true}>
      {date && (
        <DefaultText style={styles.labelDate}>{formattedDate}</DefaultText>
      )}
      <TitleHeader style={styles.title}>{title}</TitleHeader>
      <DefaultText style={styles.labelCard} numberOfLines={5} wrapText>
        {content}
      </DefaultText>
      {images && images.length > 0 && (
        <PreviewableImageList sources={imageList} />
      )}
      <AnchorText onPress={props.onClick} style={stylesCart.header}>
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
  labelDate: {
    fontSize: 14,
  },
  cardStyle: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 18,
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
