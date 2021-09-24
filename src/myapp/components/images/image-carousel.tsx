import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Global styles
import globalColors from '../../styles/colors';
// My Components
import SimplePaginationDot from '../adoption/simple-pagination-dot';
// Types
import {ImageCarouselProps} from '../../types/components/images';

const {width, height} = Dimensions.get('window');

const ImageCarousel = (props: ImageCarouselProps): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = offset / width; // your cell width
    setCurrentIndex(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.images}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} style={styles.carouselImage} />
        )}
        keyExtractor={(_, item) => item.toString()}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.50)', 'transparent']}
        style={styles.linearGradientTop}
      />
      <LinearGradient
        colors={['transparent', globalColors.black]}
        style={styles.linearGradient}>
        <SimplePaginationDot
          currentIndex={currentIndex}
          length={props.images.length}
          style={styles.paginationDots}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: '50%',
    marginBottom: '-15%',
  },
  carouselImage: {
    width: width,
    height: height * 0.45,
    resizeMode: 'cover',
  },
  linearGradientTop: {
    height: 100,
    width: width,
    position: 'absolute',
    top: 0,
  },
  linearGradient: {
    height: 150,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 80,
  },
});

export default ImageCarousel;
