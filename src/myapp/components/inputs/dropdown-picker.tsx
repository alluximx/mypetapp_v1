import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// My Components.
import {DropDownIcon} from '../icons';
// Types.
import {DropdownPickerProps} from '../../types/components/inputs';

const DropdownPicker = (props: DropdownPickerProps): React.ReactElement => {
  const {currentValue, data, placeholder, setCurrentValue} = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <RNPickerSelect
      value={currentValue}
      onValueChange={setCurrentValue}
      placeholder={{
        value: '',
        label: placeholder ?? 'Seleccione una opción...',
      }}
      pickerProps={{
        mode: 'dropdown',
        onBlur: () => setIsDropdownOpen(false),
        onFocus: () => setIsDropdownOpen(true),
      }}
      Icon={() => <DropDownIcon />}
      useNativeAndroidPickerStyle={false}
      items={data}
      style={
        !isDropdownOpen
          ? selectorStyles
          : {
              inputAndroid: {
                ...selectorStyles.inputAndroid,
                borderWidth: 1,
                borderColor: globalColors.greenSecondary,
              },
            }
      }
    />
  );
};

const selectorStyles = {
  inputAndroid: {
    backgroundColor: globalColors.lightGreen,
    height: 56,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: globalVars.fontRegular,
    color: globalColors.black,
  },
  placeholder: {
    color: globalColors.lightGray,
  },
};

export default DropdownPicker;
