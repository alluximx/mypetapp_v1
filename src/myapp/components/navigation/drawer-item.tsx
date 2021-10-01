import React from 'react';
import {
  Image,
  ImageSourcePropType,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import globalVars from '../../styles/vars';
import globalColors from '../../styles/colors';

interface DrawerItemProps {
  title: string;
  currentTab: string;
  setCurrentTab: (title: string) => void;
  image: ImageSourcePropType;
  urlKey: string;
  params: {};
  onPressOption: (urlKey: string, params: {}) => void;
}

const DrawerItem = (props: DrawerItemProps) => {
  // If active, change color.
  const color =
    props.currentTab === props.title ? 'white' : globalColors.greenSecondary;

  return (
    <TouchableOpacity
      onPress={() => {
        props.setCurrentTab(props.title);
        props.onPressOption(props.urlKey, props.params);
      }}>
      <View style={styles.itemContainer}>
        <Image
          source={props.image}
          style={[
            styles.icon,
            {
              tintColor: color,
            },
          ]}></Image>

        <Text
          style={[
            styles.text,
            {
              color: color,
            },
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 16,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    paddingLeft: 15,
  },
});

export default DrawerItem;
