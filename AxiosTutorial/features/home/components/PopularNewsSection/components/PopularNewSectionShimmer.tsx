import React from 'react';
import { FlatList, View } from 'react-native';
import Shimmer from '../../../../../util/Shimmer';
import { CARD_WIDTH, styles as mainStyles } from '../PopularNewSection';

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
      renderItem={() => (
        <View style={[mainStyles.card, { width: CARD_WIDTH }]}>
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
      )}
    />
  );
};

export default PopularNewSectionShimmer;
