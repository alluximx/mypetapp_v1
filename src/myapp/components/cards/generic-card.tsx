import React from 'react';
import {Card, StyleService, useStyleSheet} from '@ui-kitten/components';
import moment from 'moment';
import {View} from 'react-native';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import PreviewableImage from '../modals/previewable-image';
import PreviewableImageList from '../modals/previewable-image-list';
import TitleHeader from '../texts/title-header';
// Types.
import {DatasGeneric} from '../../types/components/cards';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GenericCard = (props: DatasGeneric): React.ReactElement => {
  const {
    additionalButtons,
    additionalContent,
    buttonAlign,
    buttonColor,
    buttonText,
    content,
    coverImage,
    date,
    images,
    title,
  } = props.data;
  const formattedDate = moment.utc(date).format('DD/MM/YYYY');
  const styles = useStyleSheet(themedStyles);
  const stylesCart = useStyleSheet(defaultStyle(buttonAlign, buttonColor));

  const imageList = images
    ? images.map((image) => {
        return {
          uri: image.file,
        };
      })
    : [];

  return (
    <Card style={[styles.cardStyle, props.styleCard]} disabled={true}>
      <View style={styles.contentWrapper}>
        {coverImage && (
          <PreviewableImage
            source={{uri: coverImage}}
            style={[styles.coverImage, props.coverImageStyle]}
          />
        )}
        <View style={styles.cardContentContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onClick}
            style={styles.cardContentContainer}>
            {date && (
              <DefaultText style={styles.labelDate}>
                {formattedDate}
              </DefaultText>
            )}
            <TitleHeader style={[styles.title, props.titleStyle]}>
              {title}
            </TitleHeader>
            <DefaultText
              style={[styles.labelCard, props.contentTextStyle]}
              numberOfLines={5}
              wrapText>
              {content}
            </DefaultText>
            <View style={styles.additionalContentRow}>{additionalContent}</View>
          </TouchableOpacity>
          {imageList.length > 0 && <PreviewableImageList sources={imageList} />}
          {buttonText && (
            <AnchorText
              onPress={props.onClick}
              style={[stylesCart.header, props.buttonStyle]}>
              {buttonText}
            </AnchorText>
          )}
          <View style={styles.buttonRow}>{additionalButtons}</View>
        </View>
      </View>
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
  coverImage: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
    marginRight: 8,
    marginTop: 6,
    zIndex: 25,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  cardContentContainer: {
    flexGrow: 1,
    marginLeft: 6,
  },
  additionalContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const defaultStyle = (type, color) =>
  StyleService.create({
    header: {
      textAlign: type,
      marginTop: 16,
      color: color,
    },
  });

export default GenericCard;
