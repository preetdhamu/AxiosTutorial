import React from 'react';
import { View } from 'react-native';

import { CARD_WIDTH, styles as mainStyles } from '../PopularNewSection';
import Shimmer from '../../../../../../shared/components/Shimmer';

const PopularNewsSectionItemShimmer = () => {
  return (
    <View style={[mainStyles.card, { width: CARD_WIDTH }]}>
      {/* Thumbnail shimmer */}
      <Shimmer width="100%" height={200} radius={16} />

      <View style={mainStyles.shimmerView}>
        <View style={[mainStyles.overlay, { width: CARD_WIDTH }]}>
          <Shimmer
            width={80}
            height={12}
            radius={6}
            style={mainStyles.shimmerSpace}
          />

          <Shimmer
            width={100}
            height={20}
            radius={10}
            style={mainStyles.shimmerSpace}
          />

          <Shimmer
            width={60}
            height={14}
            radius={6}
            style={mainStyles.shimmerSpace}
          />

          <Shimmer
            width="90%"
            height={25}
            radius={6}
            style={[mainStyles.shimmerSpace, { marginBottom: 10 }]}
          />
        </View>
      </View>
    </View>
  );
};

export default PopularNewsSectionItemShimmer;
