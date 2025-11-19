/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HeaderSection from './components/HeaderSection/HeaderSection';
import SearchSection from './components/SearchSection/SearchSection';
import PopularNewSection from './components/PopularNewsSection/PopularNewSection';
import CategoryNewsSection from './components/CategoryNewsSection/CategoryNewsSection';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getTopHeadLines } from '../../api/newsApi';
import { setTopHeadlines } from '../../store/slices/newsSlice';
import { NewsCache } from '../../types/newsTypes';
import colors from '../../constants/color';
import CommonErrorDialog from '../../util/CommonErrorDialog';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const topHeadlines = useSelector((state: RootState) => state.topHeadlines);
  const allState = useSelector((state:RootState)=>state);
   const [error, setError] = useState<string | null>(null);
  // const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  // const outerScrollRef = useRef(null);

  const loadTopNews = async () => {
    try {
      const response = await getTopHeadLines({ page : null });
      console.log('>>> Api Called First Time', response);
      const data = response.data;
      const formatted: NewsCache = {
        status: data.status,
        totalResults: data.totalResults,
        results: data.results,
        nextPage: data.nextPage,
        cachedAt: Date.now(),
      };
      dispatch(setTopHeadlines(formatted));
    } catch (err: any) {
      console.log('Error:', err);
      setError(err.message || 'Something went wrong while fetching top news.');
    }
  };

  const onRefersh = async () => {
    setRefreshing(true);
    await loadTopNews();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log("State is : Statrting >>>>" , allState);
    if (!topHeadlines?.results.length) loadTopNews();
     console.log("State is : After Top Headlines >>>>" , allState);
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.homeScreen}>
        <HeaderSection />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefersh} />
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <SearchSection />
          <PopularNewSection useNewHeader={false}/>
          <CategoryNewsSection useNewHeader={false}/>
         
        </ScrollView>
         <CommonErrorDialog
          visible={!!error}
          message={error || ''}
          onClose={() => setError(null)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  homeScreen : 
    { backgroundColor: colors.backgroundColor  , flex : 1 }
  
})