import {StyleSheet} from 'react-native';
import globalColors from './colors';
import globalVars from './vars';

export default StyleSheet.create({
  defaultContainer: {
    padding: globalVars.outsidePadding,
    backgroundColor: globalColors.backgroundDefault,
  },
  // ANCHOR TEXT
  anchorText: {
    color: globalColors.greenSecondary,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    borderRadius: 10,
  },
  // CUSTOM BUTTON
  defaultButton: {
    backgroundColor: globalColors.white,
    paddingVertical: 13,
  },
  defaultButtonText: {
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },
  defaultLayout: {
    padding: globalVars.outsidePadding,
    backgroundColor: globalColors.backgroundDefault,
    flex: 1,
  },
  // CLOSE BUTTON
  closeButton: {
    width: 45,
    height: 45,
    marginLeft: -5,
  },
});
