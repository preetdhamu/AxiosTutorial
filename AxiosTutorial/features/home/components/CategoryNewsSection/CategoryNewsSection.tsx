/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  // Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';

import colors from '../../../../constants/color';
import ContentCardList from './components/ContentCardList';
import { getNewsByCategory } from '../../../../api/newsApi';
import { setCategoryNews } from '../../../../store/slices/newsSlice';
import { RootState } from '../../../../store/store';
import ContentCardListShimmer from './components/ContentCardListShimmer';
import { useNavigation } from '@react-navigation/native';
import HeaderSection from '../HeaderSection/HeaderSection';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import CommonErrorDialog from '../../../../util/CommonErrorDialog';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// const CATEGORY_SECTION_HEIGHT = Math.round(SCREEN_HEIGHT * 0.788);

// NewsData.io official category list
const tabs = [
  'All',
  'Business',
  'Crime',
  'Domestic',
  'Education',
  'Entertainment',
  'Environment',
  'Food',
  'Health',
  'Lifestyle',
  'Science',
  'Sports',
  'Technology',
  'Top',
  'Tourism',
  'World',
];

const CategoryNewsSection = ({
  useNewHeader = false,
}: {
  useNewHeader: boolean;
}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const categoryData = useSelector(
    (state: RootState) => state.categories[activeTab],
  );
  const items = categoryData?.results ?? [];
  const nextPageToken = categoryData?.nextPage ?? null;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [error, setError] = useState<string | null>(null);
  const loadNews = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getNewsByCategory({
        category: activeTab === 'All' ? null : activeTab.toLowerCase(),
        page: nextPageToken,
      });
      dispatch(
        setCategoryNews({
          category: activeTab,
          results: response.data.results,
          nextPage: response.data.nextPage,
        }),
      );
    } catch (err: any) {
      console.log('Category load error:', err);
      setError(err.message || 'Something went wrong while fetching Category news.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!categoryData) {
      loadNews();
    }
  }, [activeTab]);

  const handleTabPress = (tab: string, index: number) => {
    setActiveTab(tab);
    scrollRef.current?.scrollTo({
      x: index * 80 - 60,
      animated: true,
    });
  };

  return (
    <View style={styles.section}>
      {/* Header */}

      {useNewHeader ? (
        <HeaderSection
          title="Category News"
          showBackAction={true}
          onBackPress={() => navigation.goBack()}
        />
      ) : (
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Category News</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryNews')}>
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
            onPress={() => handleTabPress(tab, index)}
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

      {!categoryData ? (
        <View style={{ paddingVertical: 16 }}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <ContentCardListShimmer key={i} />
            ))}
        </View>
      ) : (
        <FlashList
          data={items}
          renderItem={({ item, index }) => (
            <ContentCardList item={item} index={index} />
          )}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={() => {
            if (nextPageToken && !loading) loadNews();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <View style={{ paddingVertical: 16 }}>
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <ContentCardListShimmer key={i} />
                  ))}
              </View>
            ) : null
          }
        />
      )}
      <CommonErrorDialog
        visible={!!error}
        message={error || ''}
        onClose={() => setError(null)}
      />
    </View>
  );
};

export default CategoryNewsSection;

const styles = StyleSheet.create({
  section: {
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
  tabRow: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.cardUpperLayer,
  },
  tabButton: { alignItems: 'center', paddingHorizontal: 10 },
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
});
