import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
// My Components
import CustomButton from '../buttons/custom-button';
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';
// Global Styles
import globalColors from '../../styles/colors';

const CustomModal = ({
  visible,
  title,
  text,
  onAccept,
  onCancel,
  showCancel,
  labelAccept,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal tiene que ser cerrado');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.pawImage}
              source={require('../../assets/images/paw.png')}
            />
            <TitleHeader style={styles.modalTitle}>{title}</TitleHeader>
            {text
              .replace('\\n', '\n')
              .split('\n')
              .map((txt, key) => {
                return (
                  <DefaultText key={key} style={styles.modalText}>
                    {txt}
                  </DefaultText>
                );
              })}
            <CustomButton type="primary" onPress={onAccept}>
              {labelAccept}
            </CustomButton>
            {showCancel ? (
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.textCancel}>Cancelar</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: globalColors.greenPrimary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 24,
    marginBottom: 34,
    maxHeight: 500,
    height: '50%',
    overflow: 'hidden',
  },
  pawImage: {
    position: 'absolute',
    width: 150,
    height: 160,
    resizeMode: 'cover',
    top: -38,
    right: -44,
  },
  textCancel: {
    color: globalColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  modalTitle: {
    color: globalColors.white,
    marginTop: 0,
  },
  modalText: {
    color: globalColors.white,
    marginBottom: 'auto',
  },
});

export default CustomModal;
