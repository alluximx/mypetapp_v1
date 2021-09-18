import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components
import CustomButton from '../buttons/custom-button';
import DropdownPicker from '../inputs/dropdown-picker';
import TitleHeader from '../texts/title-header';
// Types
import {EditProductModalProps} from '../../types/components/modals';
import {VariantOption} from '../../types/models';

const EditProductModal = (props: EditProductModalProps) => {
  const {
    onAccept,
    onCancel,
    presentationId,
    quantity,
    variantsList,
    visible,
  } = props;

  const [presentationValue, setPresentationValue] = useState(presentationId);
  const amountList = [];

  const currentVariant = variantsList.find((variant: VariantOption) => {
    return variant.value === presentationValue;
  });

  for (let i = 1; i < currentVariant?.stock + 1 ?? 0; i++) {
    amountList.push({
      label: `${i}`,
      value: `${i}`,
    });
  }

  const [amountValue, setAmountValue] = useState(
    amountList.length > 0 ? amountList[quantity - 1].value : '',
  );

  const isDisabled = amountValue === '' || presentationValue === '';

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <TitleHeader style={styles.modalTitle}>Editar Producto</TitleHeader>
            <DropdownPicker
              style={{marginTop: 24}}
              data={variantsList}
              currentValue={presentationValue}
              placeholder="Presentación"
              setCurrentValue={(value: string) => {
                setPresentationValue(value);
                setAmountValue(amountList[0].value);
              }}
            />
            <DropdownPicker
              style={{marginTop: 5, marginBottom: 20}}
              data={amountList}
              disabled={!(amountList.length > 0)}
              currentValue={amountValue}
              placeholder="Cantidad"
              setCurrentValue={setAmountValue}
            />
          </View>
          <View>
            <CustomButton onPress={onAccept} isDisabled={isDisabled}>
              Guardar
            </CustomButton>
            <TouchableOpacity activeOpacity={0.8} onPress={onCancel}>
              <Text style={styles.textCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
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
