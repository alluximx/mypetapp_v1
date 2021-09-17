import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components
import CustomButton from '../buttons/custom-button';
import DropdownPicker from '../inputs/dropdown-picker';
import TitleHeader from '../texts/title-header';

const EditProductModal = ({onAccept, onCancel, visible}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TitleHeader style={styles.modalTitle}>Editar Producto</TitleHeader>
          {/* <DropdownPicker
            style={{marginTop: 24}}
            data={variantsList}
            currentValue={presentationValue}
            placeholder="Presentación"
            disabledPlaceholder={true}
            setCurrentValue={(value) => {
              setIsLoadingVariant(true);
              setPresentationValue(value);
              findVariant(value);
            }}
          />
          <DropdownPicker
            style={{marginTop: 5, marginBottom: 20}}
            data={amountList}
            currentValue={amountValue}
            placeholder="Cantidad"
            disabledPlaceholder={true}
            setCurrentValue={(value) => {
              setAmountValue(value);
            }}
          /> */}
          <CustomButton onPress={onAccept}>Guardar</CustomButton>
          <TouchableOpacity activeOpacity={0.8} onPress={onCancel}>
            <Text style={styles.textCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: globalColors.backgroundDefault,
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
    color: globalColors.greenSecondary,
    fontFamily: globalVars.fontBold,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 28,
  },
  modalTitle: {
    marginTop: 0,
  },
  modalText: {
    color: globalColors.white,
    marginBottom: 'auto',
  },
});

export default EditProductModal;
