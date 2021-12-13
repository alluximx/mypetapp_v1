import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
// UI-kitten
import {StyleService} from '@ui-kitten/components';
// Hook
import useGetVaccineImage from '../../hooks/vaccines/useGetVaccineImage';
import PreviewableImage from '../modals/previewable-image';

const VaccineImage = (props): React.ReactElement => {
  const [vaccineImage, setVaccineImage] = useState([]);
  const vaccinesImageQuery = useGetVaccineImage(props.id);

  useEffect(() => {
    if (vaccinesImageQuery.data) {
      const data = vaccinesImageQuery.data.data.map((obj: any) => {
        return {img: obj.file};
      });
      setVaccineImage(data);
    }
  }, [vaccinesImageQuery.data]);

  return vaccinesImageQuery.isLoading ? null : vaccineImage.length > 0 ? (
    <PreviewableImage
      style={styles.imgStyle}
      source={{uri: vaccineImage[0]?.img}}
    />
  ) : (
    <TouchableOpacity style={styles.notificationIcon}>
      <Image
        style={styles.bellIcon}
        source={require('../assets/IconVaccine.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleService.create({
  bellIcon: {
    top: 0,
    marginLeft: 10,
  },
  imgStyle: {
    width: 38,
    height: 30,
    marginRight: 10,
    marginLeft: -5,
  },
  notificationIcon: {
    Width: 30,
    Height: 30,
    borderRadius: 10,
    backgroundColor: globalColors.white,
    marginTop: -5,
    marginLeft: -15,
    marginRight: 6,
  },
});

export default VaccineImage;
