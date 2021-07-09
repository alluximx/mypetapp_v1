import {StyleSheet} from 'react-native';
import globalVars from './vars';
import globalColors from './colors';

export default StyleSheet.create({
  highlightedText: {
    color: globalColors.greenPrimary,
  },
  mixedTextContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mixedTextContainerLink: {marginLeft: 5},
});
