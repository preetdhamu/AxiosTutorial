import { StyleSheet, View } from 'react-native';
import React from 'react';

import { ContentCardItem } from './ContentCardItem';
import { NewsItem } from '../../../../models/NewsItem';

type Props = {
  item: NewsItem;
  index: number;
};

// List Component
const ContentCardList = ({ item, index }: Props) => {
  return (
    <View key={index} style={styles.container}>
      <ContentCardItem
        key={index}
        category={item?.category}
        title={item?.title}
        photo={item?.image_url}
      />
    </View>
  );
};

export default ContentCardList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
});
