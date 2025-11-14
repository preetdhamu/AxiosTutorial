import React, { useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HeaderSection from './components/HeaderSection';
import SearchSection from './components/SearchSection';
import PopularNewSection from './components/PopularNewSection';
import CategoryNewsSection from './components/CategoryNewsSection';
import { ScrollView } from 'react-native';

const HomeScreen = () => {
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const outerScrollRef = useRef(null);

  const handleOuterScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (yOffset + layoutHeight >= contentHeight - 10) {
      setOuterScrollEnabled(false);
    }
  };

  const handleInnerScrollReset = () => {
    setOuterScrollEnabled(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <HeaderSection />

        <ScrollView
          ref={outerScrollRef}
          scrollEnabled={outerScrollEnabled}
          onScroll={handleOuterScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <SearchSection />
          <PopularNewSection />

          <CategoryNewsSection
            scrollEnabled={!outerScrollEnabled} // child can scroll only if parent CANNOT scroll
            onInnerScrollTop={handleInnerScrollReset}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
