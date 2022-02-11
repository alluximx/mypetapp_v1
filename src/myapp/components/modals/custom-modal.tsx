import React from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components
import CustomButton from '../buttons/custom-button';
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';

const CustomModal = ({
  visible,
  title,
  text,
  onAccept,
  onCancel = null,
  showCancel,
  labelAccept,
}) => {
  return (
    <View>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.pawImage}
              source={require('../../assets/images/paw.png')}
            />
            <TitleHeader style={styles.modalTitle}>{title}</TitleHeader>
            <View style={styles.textContainer}>
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
            </View>
            <CustomButton onPress={onAccept} isLight={true}>
              {labelAccept}
            </CustomButton>
            {showCancel ? (
              <TouchableOpacity activeOpacity={0.8} onPress={onCancel}>
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
    maxHeight: '90%',
    minHeight: '50%',
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
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 28,
  },
  modalTitle: {
    color: globalColors.white,
    marginTop: 0,
  },
  modalText: {
    color: globalColors.white,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 'auto',
  },
});

export default CustomModal;
