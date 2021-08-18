import React, {useState} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EnhancedImageViewing from 'react-native-image-viewing';
// Types.
import {PreviewableImageProps} from '../../types/components/modals';
import FocusAwareStatusBar from '../focus-aware-status-bar';

const PreviewableImage = (props: PreviewableImageProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      {visible && (
        <FocusAwareStatusBar backgroundColor="black" barStyle="light-content" />
      )}
      <Image style={props.style} source={props.source} />
      <EnhancedImageViewing
        animationType="slide"
        imageIndex={0}
        images={props.source ? [props.source] : []}
        onRequestClose={() => setVisible(false)}
        presentationStyle="fullScreen"
        swipeToCloseEnabled={false}
        visible={visible}
      />
    </TouchableOpacity>
  );
};

export default PreviewableImage;
