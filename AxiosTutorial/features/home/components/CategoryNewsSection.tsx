import React from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import colors from '../../../constants/color';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CATEGORY_SECTION_HEIGHT = Math.round(SCREEN_HEIGHT * 0.85);

const CategoryNewsSection = ({ scrollEnabled, onInnerScrollTop }) => {
  const handleInnerScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (yOffset <= 0) {
      onInnerScrollTop(true);
    }
  };

  return (
    <View style={styles.popularSection}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Category News</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <ScrollView
        style={{ height: CATEGORY_SECTION_HEIGHT }}
        scrollEnabled={scrollEnabled}
        onScroll={handleInnerScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 2500, backgroundColor: 'green' }} />
      </ScrollView>
    </View>
  );
};

export default CategoryNewsSection;

const styles = StyleSheet.create({
  popularSection: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  seeAll: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
});
