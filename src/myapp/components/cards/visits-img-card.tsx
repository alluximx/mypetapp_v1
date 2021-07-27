import React, {useState, useCallback} from 'react';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {StyleSheet, View, Image} from 'react-native';
import globalColors from '../../styles/colors';
import {Text} from '@ui-kitten/components';
const options: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
};
const VisitsImgCard = (props): React.ReactElement => {
  const [statusReceta, setStatusReceta] = useState(true);
  const [imageResponse, setImageResponse] = useState<any>(null);
  const onPress = useCallback(() => {
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error code: ', response.errorCode);
      } else {
        const img = response;
        props.onChangeText(img);
        setImageResponse(img);
        setStatusReceta(false);
      }
    });
  }, []);
  const onDelete = () => {
    setImageResponse(null);
    setStatusReceta(true);
  };
  return (
    <View style={styles.card}>
      {imageResponse == null ? (
        <Text></Text>
      ) : (
        <Image
          style={{
            width: 38,
            height: 38,
            marginRight: 4,
            marginLeft: 8,
            marginTop: 10,
          }}
          source={{uri: imageResponse.assets[0].uri}}
        />
      )}
      {statusReceta ? (
        <Text style={styles.addtext}>{props.obj.name}</Text>
      ) : (
        <Text style={styles.addtext2}>{props.obj.nameSeg}</Text>
      )}
      {statusReceta ? (
        <Text style={styles.addImg} onPress={onPress}>
          Agregar
        </Text>
      ) : (
        <Text style={styles.addImg2} onPress={onDelete}>
          Eliminar
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 56,
    borderRadius: 10,
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  addImg: {
    textAlign: 'right',
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    width: '28%',
    paddingTop: 14,
  },
  addtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '70%',
    paddingTop: 14,
    paddingLeft: 16,
  },
  addImg2: {
    textAlign: 'right',
    color: globalColors.red,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    width: '29%',
    paddingTop: 14,
  },
  addtext2: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '55%',
    paddingTop: 14,
  },
});
export default VisitsImgCard;
