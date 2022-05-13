import React from 'react';
import {List} from '@ui-kitten/components';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import PreviewableImage from './previewable-image';
import globalColors from '../../styles/colors';
import DefaultText from '../texts/default-text';
import useSaveFileRecipe from '../../hooks/visits/useSaveFileRecipe';
import ReactNativeBlobUtil from 'react-native-blob-util';

const PreviewableDocsList = (props: any) => {
  const savePetImageQuery = useSaveFileRecipe();

  const renderImageItem = (data: {index: number; item: any}) => {
    const doc = data.item;
    return doc.extension !== 'pdf' ? (
      <View style={styles.itemContainer} key={data.index + data.item.uri}>
        <View style={styles.imageContainer}>
          <PreviewableImage
            source={{uri: doc.uri}}
            style={styles.imageStyles}
          />
        </View>
        <View style={{flex: 1.3}}>
          <DefaultText style={{color: globalColors.black}}>
            {doc.type}
          </DefaultText>
        </View>
        <View style={styles.descriptionContainer}>
          <DefaultText>{doc.description}</DefaultText>
        </View>
      </View>
    ) : (
      <View style={styles.itemContainer} key={data.index + data.item.uri}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              const android = ReactNativeBlobUtil.android;
              savePetImageQuery.mutate(data.item.uri, {
                onSuccess: (res) => {
                  if (res.path) {
                    android.actionViewIntent(res.path(), 'application/pdf');
                  }
                },
              });
            }}>
            <Image
              source={require('../../assets/images/download-pdf.png')}
              style={styles.imageStyles}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1.3}}>
          <DefaultText style={{color: globalColors.black}}>
            {doc.type}
          </DefaultText>
        </View>
        <View style={styles.descriptionContainer}>
          <DefaultText>{doc.description}</DefaultText>
        </View>
      </View>
    );
  };

  return (
    <List
      data={props.sources}
      horizontal={false}
      renderItem={renderImageItem}
      style={styles.servicesContainer}
    />
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    height: 40,
    width: 40,
    marginVertical: 5,
    marginRight: 5,
  },
  imageContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
    paddingTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1.5,
    paddingTop: 10,
  },
  descriptionContainer: {
    flex: 3.2,
    paddingLeft: 5,
  },
});

export default PreviewableDocsList;
