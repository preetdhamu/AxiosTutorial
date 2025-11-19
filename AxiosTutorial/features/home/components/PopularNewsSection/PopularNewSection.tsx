import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { PopularNewSectionItem } from './components/PopularNewSectionItem';
import PopularNewSectionShimmer from './components/PopularNewSectionShimmer';
import { setTopHeadlines } from '../../../../store/slices/newsSlice';
import { getTopHeadLines } from '../../../../api/newsApi';
import { useNavigation } from '@react-navigation/native';
import HeaderSection from '../HeaderSection/HeaderSection';
import ContentCardList from '../CategoryNewsSection/components/ContentCardList';
import { FlashList } from '@shopify/flash-list';
import ContentCardListShimmer from '../CategoryNewsSection/components/ContentCardListShimmer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import CommonErrorDialog from '../../../../util/CommonErrorDialog';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.6);

const PopularNewSection = ({
  useNewHeader = false,
}: {
  useNewHeader: boolean;
}) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loadingMore, setLoadingMore] = useState(false);

  const topHeadlines = useSelector((state: RootState) => state.topHeadlines);
  const nextPageToken = topHeadlines?.nextPage ?? null;
  const [error, setError] = useState<string | null>(null);

  const articles = useMemo(() => {
    if (!topHeadlines || !topHeadlines.results) return [];
    return topHeadlines.results;
  }, [topHeadlines]);

  const isLoading = !articles.length;

  const loadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    try {
      setLoadingMore(true);
      const response = await getTopHeadLines({ page: nextPageToken });
      const data = response.data;

      dispatch(
        setTopHeadlines({
          status: data.status,
          totalResults: data.totalResults,
          results: data.results,
          nextPage: data.nextPage,
          cachedAt: Date.now(),
        }),
      );
    } catch (err : any) {
      console.log('Error loading more news:', err);
      setError(err.message || 'Something went wrong while fetching top news.');
    } finally {
      setLoadingMore(false);
    }
  };

  if (useNewHeader) {
    return (
      <View style={styles.popularSection}>
        <HeaderSection
          title="Popular Section"
          showBackAction
          onBackPress={() => navigation.goBack()}
        />

        {isLoading ? (
          <View style={{ paddingVertical: 16 }}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <ContentCardListShimmer key={i} />
              ))}
          </View>
        ) : (
          <FlashList
            data={articles}
            renderItem={({ item, index }) => (
              <ContentCardList item={item} index={index} />
            )}
            keyExtractor={item => item.article_id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              nextPageToken ? (
                <View style={{ paddingVertical: 16 }}>
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
        <CommonErrorDialog
  visible={!!error}
  message={error || ''}
  onClose={() => setError(null)}
/>
      </View>
    );
  }

  return (
    <View style={styles.popularSection}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Popular Now</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PopularNews')}>
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
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + 12,
            offset: (CARD_WIDTH + 12) * index,
            index,
          })}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            nextPageToken ? (
              <View style={styles.loaderDesign}>
                <ActivityIndicator size="small" color={colors.primary} />
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

export default PopularNewSection;

export const styles = StyleSheet.create({
  popularSection: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
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
