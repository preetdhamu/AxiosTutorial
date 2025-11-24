import React from 'react';
import { FlatList } from 'react-native';

import {  styles as mainStyles } from '../PopularNewSection';
import PopularNewsSectionItemShimmer from './PopularNewsSectionItemShimmer';

const SHIMMER_COUNT = 5;

const PopularNewSectionShimmer = () => {
  const shimmerData = Array.from({ length: SHIMMER_COUNT }, (_, i) => i);

  return (
    <FlatList
      horizontal
      data={shimmerData}
      keyExtractor={item => item.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={mainStyles.scrollContent}
      renderItem={() => <PopularNewsSectionItemShimmer />}
    />
  );
};

export default PopularNewSectionShimmer;
