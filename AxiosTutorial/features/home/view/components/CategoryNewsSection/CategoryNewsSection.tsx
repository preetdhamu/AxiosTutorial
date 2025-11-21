import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ContentCardListShimmer from './components/ContentCardListShimmer';
import colors from '../../../../../constants/color';
import { tabs } from '../../../viewModel/HomeViewModel';
import HeaderSection from '../HeaderSection/HeaderSection';

interface Props {
  useNewHeader?: boolean;
  activeTab: string;
  onTabPress: (tab: string, index: number) => void;
  scrollRef?: any;
  categoryData?: any;
  onSeeAll?: () => void;
  goBack?: () => void;
}

const CategoryNewsSection: React.FC<Props> = ({
  useNewHeader,
  activeTab,
  onTabPress,
  scrollRef,
  categoryData,
  onSeeAll,
  goBack,
}) => {
  return (
    <View >
      {/* Header Row */}

      {useNewHeader ? (
        <HeaderSection
          title="Category News"
          showBackAction
          onBackPress={goBack}
        />
      ) : (
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Category News</Text>
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tabs */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => onTabPress(tab, index)}
            style={styles.tabButton}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTab]}
            >
              {tab}
            </Text>

            {activeTab === tab && <View style={styles.indicator} />}
          </Pressable>
        ))}
      </ScrollView>

      {!categoryData && (
        <View style={styles.renderItem}>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <ContentCardListShimmer key={i} />
            ))}
        </View>
      )}
    </View>
  );
};

export default CategoryNewsSection;

const styles = StyleSheet.create({
 
  tabText: {
    color: colors.placeHolderColor,
    fontSize: 14,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: '600',
  },

  activeTab: { color: colors.primary },

  indicator: {
    position: 'absolute',
    height: 3,
    width: 35,
    backgroundColor: 'black',
    borderRadius: 20,
    bottom: -12,
  },
  tabButton: { alignItems: 'center', paddingHorizontal: 10, marginRight: 8 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal : 16 ,
    backgroundColor: colors.backgroundColor,
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
  tabRow: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    borderBottomColor: colors.cardUpperLayer,
    backgroundColor: colors.backgroundColor,
  },
  renderItem: { 
    paddingHorizontal: 16 
  },
});
