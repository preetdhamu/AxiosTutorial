/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from '../../../../../util/Shimmer';

const ContentCardListShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Shimmer width={110} height={100} radius={16} />

        <View style={styles.mainContent}>
          <Shimmer width={80} height={12} radius={6} style={{ marginBottom: 6 }} />

          <Shimmer width="90%" height={16} radius={6} style={{ marginBottom: 6 }} />

          <Shimmer width="70%" height={16} radius={6} style={{ marginBottom: 12 }} />

          <View style={styles.profileRow}>
            <Shimmer width={30} height={30} radius={30} />
            <Shimmer width={120} height={14} radius={6} />
          </View>

        </View>
      </View>
    </View>
  );
};

export default ContentCardListShimmer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  card: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  mainContent: {
    flex: 3,
    paddingRight: 15,
    justifyContent: 'flex-start',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
