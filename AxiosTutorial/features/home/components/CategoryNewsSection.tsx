import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import colors from '../../../constants/color';
import ContentCardList from './ContentCardList';
import { newsData, NewsItem } from '../mockData/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CATEGORY_SECTION_HEIGHT = Math.round(SCREEN_HEIGHT * 0.788);

const CategoryNewsSection = ({ scrollEnabled, onInnerScrollTop }: any) => {
  const [activeTab, setActiveTab] = useState('All');
  const scrollRef = useRef(null);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);

  const tabs = [
    'All',
    'Technology',
    'Sports',
    'Business',
    'Entertainment',
    'Health',
    'Politics',
    'Finance',
  ];

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredNews(newsData);
    } else {
      setFilteredNews(newsData.filter(item => item.category === activeTab));
    }
  }, [activeTab]);

  const handleTabPress = (tab: string, index: number) => {
    setActiveTab(tab);

    scrollRef.current?.scrollTo({
      x: index * 100 - 50,
      animated: true,
    });
  };

  const handleInnerScroll = (event: any) => {
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

      <View>
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
        <ScrollView
          style={{ height: CATEGORY_SECTION_HEIGHT }}
          scrollEnabled={scrollEnabled}
          onScroll={handleInnerScroll}
          scrollEventThrottle={16}
          // showsVerticalScrollIndicator={false}
        >
          <ContentCardList items={filteredNews} />
        </ScrollView>
      </View>
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    gap: 10,
    borderBottomColor: colors.cardUpperLayer,
    borderBottomWidth: 2,
    paddingVertical: 10,
    position: 'relative',
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
