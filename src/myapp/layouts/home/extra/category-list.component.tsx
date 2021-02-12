import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Layout,
  List,
  ListElement,
  ListProps,
  Text,
} from '@ui-kitten/components';

export interface CategoryListProps extends ListProps {
  hint: string;
}

export const CategoryList = (props: CategoryListProps): ListElement => {
  const {hint, hintLink, ...listProps} = props;

  return (
    <React.Fragment>
      <Layout style={styles.container}>
        <Text style={styles.hint} category="s2">
          {hint}
        </Text>
        <Text style={styles.hintLink} category="s2">
          {hintLink}
        </Text>
      </Layout>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        {...listProps}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  hint: {
    flex: 3,
    margin: 16,
  },
  hintLink: {
    flex: 1,
    margin: 16,
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
