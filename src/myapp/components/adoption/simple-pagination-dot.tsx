import React from 'react';

import {View, StyleSheet} from 'react-native';

const genCircleStyle = (size: number) => {
  if (!size) {
    return {};
  }
  return {width: size, height: size, borderRadius: size / 2};
};

const Dot = ({
  isActive,
  color,
  activeDotSize,
  inActiveDotSize,
  dotSeparator,
}) => {
  const processedActiveDotStyle = [
    styles.activeDot,
    {
      backgroundColor: color,
      borderColor: color,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(activeDotSize),
    },
  ];
  const processedInActiveDotStyle = [
    styles.inActiveDot,
    {
      backgroundColor: 'transparent',
      borderColor: color,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(inActiveDotSize),
    },
  ];

  return (
    <View
      style={[
        styles.baseDot,
        isActive ? processedActiveDotStyle : processedInActiveDotStyle,
      ]}
    />
  );
};

const SimplePaginationDot = ({
  style,
  length,
  currentIndex = 0,
  color = '#fff',
  activeDotSize = 14,
  inActiveDotSize = 10,
  dotSeparator = 10,
}) => {
  const renderItem = (_: any, index: number) => (
    <Dot
      key={index}
      isActive={index === currentIndex}
      color={color}
      activeDotSize={activeDotSize}
      inActiveDotSize={inActiveDotSize}
      dotSeparator={dotSeparator}
    />
  );

  return (
    <View style={[styles.container, style]}>
      {Array(length).fill(0).map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseDot: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inActiveDot: {
    backgroundColor: 'transparent',
  },
});

export default SimplePaginationDot;
