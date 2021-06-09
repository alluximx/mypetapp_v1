import {StyleSheet} from 'react-native';
import globalColors from './colors';
import globalVars from './vars';

export default StyleSheet.create({
  defaultContainer: {
    padding: globalVars.outsidePadding,
    backgroundColor: globalColors.backgroundDefault,
  },
  anchorText: {
    color: globalColors.greenSecondary,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'montserrat-bold',
  },
});
