import React, {useState} from 'react';
import {List} from '@ui-kitten/components';
import {Image, ImageURISource, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EnhancedImageViewing from 'react-native-image-viewing';
// My Components.
import FocusAwareStatusBar from '../focus-aware-status-bar';
// Types.
import {PreviewableImageListProps} from '../../types/components/modals';
import globalColors from '../../styles/colors';

const PreviewableImageList = (props: PreviewableImageListProps) => {
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const ImageFooter = ({currentIndex}: {currentIndex: number}) => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{`${currentIndex + 1} / ${
        props.sources.length
      }`}</Text>
    </View>
  );

  const renderImageItem = (image: {index: number; item: ImageURISource}) => (
    <TouchableOpacity
      onPress={() => {
        setImageIndex(image.index);
        setVisible(true);
      }}>
      {visible && (
        <FocusAwareStatusBar backgroundColor="black" barStyle="light-content" />
      )}
      <Image style={styles.imageStyles} source={image.item} />
    </TouchableOpacity>
  );

  return (
    <>
      <EnhancedImageViewing
        animationType="slide"
        FooterComponent={({imageIndex: index}: {imageIndex: number}) => (
          <ImageFooter currentIndex={index} />
        )}
        imageIndex={imageIndex}
        images={props.sources}
        onRequestClose={() => setVisible(false)}
        presentationStyle="fullScreen"
        swipeToCloseEnabled={false}
        visible={visible}
      />
      <List
        data={props.sources}
        horizontal={true}
        renderItem={renderImageItem}
        style={styles.servicesContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    height: 40,
    width: 40,
    marginTop: 16,
    marginRight: 16,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
    paddingTop: 5,
  },
  footerContainer: {},
  footerText: {
    fontSize: 16,
    color: globalColors.white,
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.75)',
    maxWidth: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
});

export default PreviewableImageList;
