import React, {  useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../../../constants/color';
import { PopularNewSectionItem } from './components/PopularNewSectionItem';
import PopularNewSectionShimmer from './components/PopularNewSectionShimmer';
import HeaderSection from '../HeaderSection/HeaderSection';
import { FlashList } from '@shopify/flash-list';
import ContentCardListShimmer from '../CategoryNewsSection/components/ContentCardListShimmer';
import { NewsCache } from '../../../models/NewsCache';
import PopularNewsSectionItemShimmer from './components/PopularNewsSectionItemShimmer';
import ContentCardList from '../CategoryNewsSection/components/ContentCardList';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.6);

export interface HomeNewsProps {
  useNewHeader?: boolean;
  topHeadlines: NewsCache | null;
  loadMoreTopNews: () => void;
  onSeeAll?: () => void;
  goBack?: () => void;
}

const PopularNewSection: React.FC<HomeNewsProps> = ({
  useNewHeader = false,
  topHeadlines,
  loadMoreTopNews,
  onSeeAll,
  goBack,
}) => {
  const articles = topHeadlines?.results ?? [];
  const nextPageToken = topHeadlines?.nextPage ?? null;
  const isLoading =
    !topHeadlines ||
    (topHeadlines.results.length === 0 && !topHeadlines.nextPage);



  const renderItem = useCallback(
  ({ item, index } : { item : any , index :number}) => (
    <View style={styles.renderItem}>
      <ContentCardList item={item} index={index} />
    </View>
  ),
  []
);

  if (useNewHeader) {
    return (
      <View style={[styles.popularSection, { flex: 1  , paddingVertical :useNewHeader ? 0 :  22 , paddingHorizontal : useNewHeader ? 0 : 12   , paddingBottom : useNewHeader ?  12 : 0  }]}>
        <HeaderSection
          title="Popular Section"
          showBackAction
          onBackPress={goBack}
        />

        {isLoading ? (
          <View style={styles.shimmerPadding}>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <ContentCardListShimmer key={i} />
              ))}
          </View>
        ) : (
          <FlashList
            data={articles}
            renderItem={renderItem}
            keyExtractor={item => item.article_id}
            onEndReached={loadMoreTopNews}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              nextPageToken ? (
                <View style={styles.shimmerPadding}>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <ContentCardListShimmer key={i} />
                    ))}
                </View>
              ) : null
            }
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.popularSection}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Popular Now</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <PopularNewSectionShimmer />
      ) : (
        <FlatList
          horizontal
          data={articles}
          keyExtractor={item => item.article_id}
          renderItem={({ item, index }) => (
            <PopularNewSectionItem item={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          onEndReached={loadMoreTopNews}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            nextPageToken ? <PopularNewsSectionItemShimmer /> : null
          }
        />
      )}
    </View>
  );
};

export default PopularNewSection;

export const styles = StyleSheet.create({
  popularSection: {
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  renderItem: { paddingHorizontal: 16 },
  loaderDesign: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmerView: { flex: 1, padding: 12, justifyContent: 'space-between' },
  shimmerSpace: { marginLeft: 12, marginBottom: 5 },
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
    
 shimmerPadding : { paddingTop : 10 , paddingHorizontal: 16    },

  seeAll: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },

  scrollContent: {
    paddingRight: 10,
  },

  card: {
    backgroundColor: '#999',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 200,
    marginBottom: 100,
  },

  overlay: {
    backgroundColor: colors.cardUpperLayer,
    position: 'absolute',
    bottom: 0,
    borderRadius: 16,
    paddingTop: 15,
    zIndex: 5,
  },

  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 0,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  timeText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 8,
    fontWeight: '700',
    color: colors.secondary,
  },

  categoryText: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
    paddingHorizontal: 12,
    marginBottom: 12,
    textAlign: 'justify',
  },

  descriptionText: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
    paddingHorizontal: 12,
    marginBottom: 15,
    textAlign: 'justify',
  },
});
